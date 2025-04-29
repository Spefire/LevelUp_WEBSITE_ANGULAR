import { Injectable } from '@angular/core';

import { Log } from '@src/models/logs.model';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  private logsSubject = new BehaviorSubject<Log[]>([]);

  // Observables publics
  public logs$ = this.logsSubject.asObservable();

  constructor() {
    // Charger les données depuis le localStorage au démarrage
    const logs = localStorage.getItem('logs');
    if (logs) this.logsSubject.next(JSON.parse(logs));
  }

  addLog(log: Log): void {
    let logs = this.logsSubject.value;
    logs.push(log);

    this.logsSubject.next(logs);
    localStorage.setItem('logs', JSON.stringify(logs));
  }
}
