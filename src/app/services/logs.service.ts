import { Injectable } from '@angular/core';

import { Log } from '@src/models/logs.model';
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

  constructor(private _supabaseService: SupabaseService) {
    this._load();
  }

  public async loadLogs() {
    if (!this._logsSubject.value) {
      const logs = await this._supabaseService.getLogs();
      if (logs) this._save(logs);
    }
  }

  public async addLog(newLog: Log) {
    const log = await this._supabaseService.postLog(newLog);
    if (log) {
      const logs = this._logsSubject.value;
      logs.push(log);
      this._save(logs);
      return true;
    } else return false;
  }

  public async removeLog(deletedLog: Log) {
    const log = await this._supabaseService.deleteLog(deletedLog);
    if (log) {
      const logs = this._logsSubject.value.filter(log => !(deletedLog.quest.id === log.quest.id && isSameDay(deletedLog.date, new Date(log.date))));
      this._save(logs);
      return true;
    } else return false;
  }

  private _load() {
    const storage = localStorage.getItem('logs');
    if (storage) {
      const logs: Log[] = JSON.parse(storage);
      this._logsSubject.next(logs);
    }
  }

  private _save(logs: Log[]) {
    this._logsSubject.next(logs);
    localStorage.setItem('logs', JSON.stringify(logs));
  }
}
