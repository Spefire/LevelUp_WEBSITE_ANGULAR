import { Injectable } from '@angular/core';

import { Log } from '@src/models/logs.model';
import { isSameDay } from '@src/utils/time';

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
    if (logs) {
      const newLogs: Log[] = [];
      const jsonObjs = JSON.parse(logs);
      jsonObjs.forEach((jsonObj: Log) => {
        newLogs.push({
          date: new Date(jsonObj.date),
          quest: jsonObj.quest,
        });
      });
      this._logsSubject.next(newLogs);
    }
  }

  public addLog(addedLog: Log): void {
    const logs = this._logsSubject.value;
    logs.push(addedLog);
    this._logsSubject.next(logs);
    localStorage.setItem('logs', JSON.stringify(logs));
  }

  public removeLog(removedLog: Log): void {
    const logs = this._logsSubject.value.filter(log => !(removedLog.quest.id === log.quest.id && isSameDay(removedLog.date, new Date(log.date))));
    this._logsSubject.next(logs);
    localStorage.setItem('logs', JSON.stringify(logs));
  }
}
