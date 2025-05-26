import { Injectable } from '@angular/core';

import { Log } from '@src/models/logs.model';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  private _logsSubject = new BehaviorSubject<Log[]>([]);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public logs$ = this._logsSubject.asObservable();

  constructor() {
    // Charger les données depuis le localStorage au démarrage
    const logs = localStorage.getItem('logs');
    if (logs) this._logsSubject.next(JSON.parse(logs));
  }

  public addLog(log: Log): void {
    const logs = this._logsSubject.value;
    logs.push(log);

    this._logsSubject.next(logs);
    localStorage.setItem('logs', JSON.stringify(logs));
  }
}
