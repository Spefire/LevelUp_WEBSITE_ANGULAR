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
    this._load();
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
    this._save(dailyQuests);
  }

  private _load() {
    const storage = localStorage.getItem('dailyQuests');
    if (storage) {
      const result: Quest[] = [];
      const jsonObjs: string[] = JSON.parse(storage);
      jsonObjs.forEach(jsonObj => {
        const itemToFind = listQuests.find(quest => quest.id === jsonObj);
        if (itemToFind) {
          result.push(itemToFind);
        }
      });
      this._dailyQuestsSubject.next(result);
    }
  }

  private _save(dailyQuests: Quest[]) {
    this._dailyQuestsSubject.next(dailyQuests);
    const result = dailyQuests.map(dailyQuest => dailyQuest.id);
    localStorage.setItem('dailyQuests', JSON.stringify(result));
  }
}
