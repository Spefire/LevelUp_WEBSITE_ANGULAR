import { Injectable } from '@angular/core';

import { Log } from '@src/models/logs.model';
import { Quest } from '@src/models/quests.model';
import { QuestsService } from '@src/services/quests.service';
import { SupabaseService } from '@src/services/supabase.service';
import { isSameDay } from '@src/utils/time';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  private _logsSubject = new BehaviorSubject<Log[]>(null);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public logs$ = this._logsSubject.asObservable();
  public get logs() {
    return this._logsSubject.value;
  }

  constructor(
    protected _questsService: QuestsService,
    private _supabaseService: SupabaseService
  ) {}

  public async loadLogs() {
    if (!this._logsSubject.value) {
      const quests = this._questsService.quests;
      const logs = await this._supabaseService.getLogs(quests);
      if (logs) this._logsSubject.next(logs);
    }
  }

  public async addLog(newLog: Log, quest: Quest) {
    const log = await this._supabaseService.postLog(newLog, quest);
    if (log) {
      const logs = this._logsSubject.value;
      logs.push(log);
      this._logsSubject.next(logs);
      return true;
    } else return false;
  }

  public async removeLog(deletedLog: Log) {
    const log = await this._supabaseService.deleteLog(deletedLog);
    if (log) {
      const logs = this._logsSubject.value.filter(log => !(deletedLog.quest.id === log.quest.id && isSameDay(deletedLog.date, new Date(log.date))));
      this._logsSubject.next(logs);
      return true;
    } else return false;
  }
}
