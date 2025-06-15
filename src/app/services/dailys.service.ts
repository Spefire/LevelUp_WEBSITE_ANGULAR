import { Injectable } from '@angular/core';

import { Daily } from '@src/models/dailys.model';
import { SupabaseService } from '@src/services/supabase.service';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DailysService {
  private _dailysSubject = new BehaviorSubject<Daily[]>(null);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public dailys$ = this._dailysSubject.asObservable();

  constructor(private _supabaseService: SupabaseService) {
    this._load();
  }

  public async loadDailys(forced = false) {
    if (!this._dailysSubject.value || forced) {
      const dailys = await this._supabaseService.getDailys();
      if (dailys) this._save(dailys);
    }
  }

  public async addDaily(newDaily: Daily) {
    const daily = await this._supabaseService.postDaily(newDaily);
    if (daily) {
      const dailys = this._dailysSubject.value;
      dailys.push(daily);
      this._save(dailys);
      return true;
    } else return false;
  }

  public async removeDaily(deletedDaily: Daily) {
    const daily = await this._supabaseService.deleteDaily(deletedDaily);
    if (daily) {
      const dailys = this._dailysSubject.value.filter(daily => daily.id !== deletedDaily.id);
      this._save(dailys);
      return true;
    } else return false;
  }

  private _load() {
    const storage = localStorage.getItem('dailys');
    if (storage) {
      const dailys: Daily[] = JSON.parse(storage);
      this._dailysSubject.next(dailys);
    }
  }

  private _save(dailys: Daily[]) {
    this._dailysSubject.next(dailys);
    localStorage.setItem('dailys', JSON.stringify(dailys));
  }
}
