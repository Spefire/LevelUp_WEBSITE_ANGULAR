import { Injectable } from '@angular/core';

import { listQuests, Quest, QuestsFilters } from '@src/models/quests.model';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestsService {
  private _dailyQuestsSubject = new BehaviorSubject<Quest[]>([]);
  private _questsSubject = new BehaviorSubject<Quest[]>(listQuests);
  private _filtersSubject = new BehaviorSubject<QuestsFilters>({
    category: null,
    onlySelected: false,
    search: null,
  });

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public dailyQuests$ = this._dailyQuestsSubject.asObservable();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public quests$ = this._questsSubject.asObservable();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public filters$ = this._filtersSubject.asObservable();

  constructor() {
    // Charger les données depuis le localStorage au démarrage
    const dailyQuests = localStorage.getItem('dailyQuests');
    if (dailyQuests) this._dailyQuestsSubject.next(JSON.parse(dailyQuests));
  }

  public setFilters(newFilters: QuestsFilters) {
    this._filtersSubject.next(newFilters);
  }

  public toggleQuest(quest: Quest): void {
    let dailyQuests = this._dailyQuestsSubject.value;

    if (dailyQuests.find(dailyQuest => dailyQuest.id === quest.id)) {
      dailyQuests = dailyQuests.filter(dailyQuest => dailyQuest.id !== quest.id);
    } else {
      dailyQuests.push(quest);
    }

    this._dailyQuestsSubject.next(dailyQuests);
    localStorage.setItem('dailyQuests', JSON.stringify(dailyQuests));
  }
}
