import { Injectable } from '@angular/core';

import { listQuests, Quest } from '@src/models/quests.model';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestsService {
  private questsSubject = new BehaviorSubject<Quest[]>(listQuests);
  private filterSubject = new BehaviorSubject<string>(null);

  // Observables publics
  public quests$ = this.questsSubject.asObservable();
  public filter$ = this.filterSubject.asObservable();

  constructor() {
    // Charger les données depuis le localStorage au démarrage
    const savedQuests = localStorage.getItem('quests');
    if (savedQuests) this.questsSubject.next(JSON.parse(savedQuests));
  }

  setFilter(newFilter: string) {
    this.filterSubject.next(newFilter);
  }
}
