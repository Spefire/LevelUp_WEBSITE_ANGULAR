import { Injectable } from '@angular/core';

import { IQuestsFilters, Quest } from '@src/models/quests.model';
import { SupabaseService } from '@src/services/supabase.service';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestsService {
  private _questsSubject = new BehaviorSubject<Quest[]>(null);
  private _filtersSubject = new BehaviorSubject<IQuestsFilters>({
    category: null,
    isMandatory: false,
    search: null,
  });

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public quests$ = this._questsSubject.asObservable();
  public get quests() {
    return this._questsSubject.value;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public filters$ = this._filtersSubject.asObservable();
  public get filters() {
    return this._filtersSubject.value;
  }

  constructor(private _supabaseService: SupabaseService) {}

  public async loadQuests(forced = false) {
    if (!this._questsSubject.value || forced) {
      const quests = await this._supabaseService.getQuests();
      if (quests) this._questsSubject.next(quests);
    }
  }

  public async addQuest(newQuest: Quest) {
    const quest = await this._supabaseService.postQuest(newQuest);
    if (quest) {
      const quests = this._questsSubject.value;
      quests.push(quest);
      this._questsSubject.next(quests);
      return true;
    } else return false;
  }

  public async modifyQuest(newQuest: Quest) {
    const quest = await this._supabaseService.putQuest(newQuest);
    if (quest) {
      const quests = this._questsSubject.value.filter(quest => !(newQuest.id === quest.id));
      quests.push(quest);
      this._questsSubject.next(quests);
      return true;
    } else return false;
  }

  public async removeQuest(deletedQuest: Quest) {
    const quest = await this._supabaseService.deleteQuest(deletedQuest);
    if (quest) {
      const quests = this._questsSubject.value.filter(quest => !(deletedQuest.id === quest.id));
      this._questsSubject.next(quests);
      return true;
    } else return false;
  }

  public setFilters(newFilters: IQuestsFilters) {
    this._filtersSubject.next(newFilters);
  }
}
