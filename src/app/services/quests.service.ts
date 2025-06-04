import { Injectable } from '@angular/core';

import { Quest, QuestsFilters } from '@src/models/quests.model';
import { SupabaseService } from '@src/services/supabase.service';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestsService {
  private _questsSubject = new BehaviorSubject<Quest[]>(null);
  private _filtersSubject = new BehaviorSubject<QuestsFilters>({
    category: null,
    onlySelected: false,
    search: null,
  });

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public quests$ = this._questsSubject.asObservable();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public filters$ = this._filtersSubject.asObservable();

  constructor(private _supabaseService: SupabaseService) {
    this._load();
  }

  public async loadQuests() {
    if (!this._questsSubject.value) {
      const quests = await this._supabaseService.getQuests();
      if (quests) this._save(quests);
    }
  }

  public setFilters(newFilters: QuestsFilters) {
    this._filtersSubject.next(newFilters);
  }

  private _load() {
    const storage = localStorage.getItem('quests');
    if (storage) {
      const quests: Quest[] = JSON.parse(storage);
      this._questsSubject.next(quests);
    }
  }

  private _save(quests: Quest[]) {
    this._questsSubject.next(quests);
    localStorage.setItem('quests', JSON.stringify(quests));
  }
}
