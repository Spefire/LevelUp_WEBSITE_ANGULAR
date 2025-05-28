import { Injectable } from '@angular/core';

import { Log } from '@src/models/logs.model';
import { listQuests } from '@src/models/quests.model';
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
    this._load();
  }

  public addLog(addedLog: Log): void {
    const logs = this._logsSubject.value;
    logs.push(addedLog);
    this._save(logs);
  }

  public removeLog(removedLog: Log): void {
    const logs = this._logsSubject.value.filter(log => !(removedLog.quest.id === log.quest.id && isSameDay(removedLog.date, new Date(log.date))));
    this._save(logs);
  }

  private _load() {
    const storage = localStorage.getItem('logs');
    if (storage) {
      const result: Log[] = [];
      const jsonObjs: { date: string; idQuest: string }[] = JSON.parse(storage);
      jsonObjs.forEach(jsonObj => {
        const itemToFind = listQuests.find(quest => quest.id === jsonObj.idQuest);
        if (itemToFind) {
          result.push({
            date: new Date(jsonObj.date),
            quest: itemToFind,
          });
        }
      });
      this._logsSubject.next(result);
    }
  }

  private _save(logs: Log[]) {
    this._logsSubject.next(logs);
    const result = logs.map(log => {
      return { date: log.date, idQuest: log.quest.id };
    });
    localStorage.setItem('logs', JSON.stringify(result));
  }
}
