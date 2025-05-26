import { Injectable } from '@angular/core';

import { listQuests, Quest, QuestsFilters } from '@src/models/quests.model';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestsService {
  private questsSubject = new BehaviorSubject<Quest[]>(listQuests);
  private dailyQuestsSubject = new BehaviorSubject<Quest[]>([]);
  private filtersSubject = new BehaviorSubject<QuestsFilters>({
    category: null,
    onlySelected: false,
    search: null,
  });

  // Observables publics
  public quests$ = this.questsSubject.asObservable();
  public dailyQuests$ = this.dailyQuestsSubject.asObservable();
  public filters$ = this.filtersSubject.asObservable();

  constructor() {
    // Charger les données depuis le localStorage au démarrage
    const dailyQuests = localStorage.getItem('dailyQuests');
    if (dailyQuests) this.dailyQuestsSubject.next(JSON.parse(dailyQuests));
  }

  setFilters(newFilters: QuestsFilters) {
    this.filtersSubject.next(newFilters);
  }

  toggleQuest(quest: Quest): void {
    let dailyQuests = this.dailyQuestsSubject.value;

    if (dailyQuests.find(dailyQuest => dailyQuest.id === quest.id)) {
      dailyQuests = dailyQuests.filter(dailyQuest => dailyQuest.id !== quest.id);
    } else {
      dailyQuests.push(quest);
    }

    this.dailyQuestsSubject.next(dailyQuests);
    localStorage.setItem('dailyQuests', JSON.stringify(dailyQuests));
  }
}
