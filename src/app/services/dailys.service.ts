import { Injectable } from '@angular/core';

import { Daily } from '@src/models/dailys.model';
import { Quest } from '@src/models/quests.model';
import { QuestsService } from '@src/services/quests.service';
import { SupabaseService } from '@src/services/supabase.service';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DailysService {
  private _dailysSubject = new BehaviorSubject<Daily[]>(null);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public dailys$ = this._dailysSubject.asObservable();
  public get dailys() {
    return this._dailysSubject.value;
  }

  constructor(
    protected _questsService: QuestsService,
    private _supabaseService: SupabaseService
  ) {}

  public async loadDailys() {
    if (!this._dailysSubject.value) {
      const quests = this._questsService.quests;
      const dailys = await this._supabaseService.getDailys(quests);
      if (dailys) this._dailysSubject.next(dailys);
    }
  }

  public async addDaily(newDaily: Daily, quest: Quest) {
    const daily = await this._supabaseService.postDaily(newDaily, quest);
    if (daily) {
      const dailys = this._dailysSubject.value;
      dailys.push(daily);
      this._dailysSubject.next(dailys);
      return true;
    } else return false;
  }

  public async modifyDaily(newDaily: Daily, quest: Quest) {
    const daily = await this._supabaseService.putDaily(newDaily, quest);
    if (daily) {
      const dailys = this._dailysSubject.value.filter(daily => !(newDaily.id === daily.id));
      dailys.push(daily);
      this._dailysSubject.next(dailys);
      return true;
    } else return false;
  }

  public async removeDaily(deletedDaily: Daily) {
    const daily = await this._supabaseService.deleteDaily(deletedDaily);
    if (daily) {
      const dailys = this._dailysSubject.value.filter(daily => daily.id !== deletedDaily.id);
      this._dailysSubject.next(dailys);
      return true;
    } else return false;
  }
}
