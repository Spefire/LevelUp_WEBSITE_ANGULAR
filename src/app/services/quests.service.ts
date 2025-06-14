import { Injectable } from '@angular/core';

import { IQuest, IQuestsFilters, Quest } from '@src/models/quests.model';
import { SupabaseService } from '@src/services/supabase.service';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestsService {
  private _questsSubject = new BehaviorSubject<Quest[]>([]);
  private _filtersSubject = new BehaviorSubject<IQuestsFilters>({
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

  public async loadQuests(forced = false) {
    if (!this._questsSubject.value || forced) {
      const quests = await this._supabaseService.getQuests();
      if (quests) this._save(quests);
    }
  }

  public async addQuest(newQuest: Quest) {
    const quest = await this._supabaseService.postQuest(newQuest);
    if (quest) {
      const quests = this._questsSubject.value;
      quests.push(quest);
      this._save(quests);
      return true;
    } else return false;
  }

  public async modifyQuest(newQuest: Quest) {
    const quest = await this._supabaseService.putQuest(newQuest);
    if (quest) {
      const quests = this._questsSubject.value.filter(quest => !(newQuest.id === quest.id));
      quests.push(quest);
      this._save(quests);
      return true;
    } else return false;
  }

  public async removeQuest(deletedQuest: Quest) {
    const quest = await this._supabaseService.deleteQuest(deletedQuest);
    if (quest) {
      const quests = this._questsSubject.value.filter(quest => !(deletedQuest.id === quest.id));
      this._save(quests);
      return true;
    } else return false;
  }

  public setFilters(newFilters: IQuestsFilters) {
    this._filtersSubject.next(newFilters);
  }

  private _load() {
    const storage = localStorage.getItem('quests');
    if (storage) {
      const results: IQuest[] = JSON.parse(storage);
      const quests = results.map(result => Quest.getQuest(result));
      this._questsSubject.next(quests);
    }
  }

  private _save(quests: Quest[]) {
    this._questsSubject.next(quests);
    const storage = quests.map(quest => Quest.getIQuest(quest));
    localStorage.setItem('quests', JSON.stringify(storage));
  }
}
