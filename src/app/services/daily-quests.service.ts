import { Injectable } from '@angular/core';

import { DailyQuest } from '@src/models/daily-quests.model';
import { SupabaseService } from '@src/services/supabase.service';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DailyQuestsService {
  private _dailyQuestsSubject = new BehaviorSubject<DailyQuest[]>(null);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public dailyQuests$ = this._dailyQuestsSubject.asObservable();

  constructor(private _supabaseService: SupabaseService) {
    this._load();
  }

  public async loadDailyQuests() {
    if (!this._dailyQuestsSubject.value) {
      const dailyQuests = await this._supabaseService.getDailyQuests();
      if (dailyQuests) this._save(dailyQuests);
    }
  }

  public async addDailyQuest(newDailyQuest: DailyQuest) {
    const dailyQuest = await this._supabaseService.postDailyQuest(newDailyQuest);
    if (dailyQuest) {
      const dailyQuests = this._dailyQuestsSubject.value;
      dailyQuests.push(dailyQuest);
      this._save(dailyQuests);
      return true;
    } else return false;
  }

  public async removeDailyQuest(deletedDailyQuest: DailyQuest) {
    const dailyQuest = await this._supabaseService.deleteDailyQuest(deletedDailyQuest);
    if (dailyQuest) {
      const dailyQuests = this._dailyQuestsSubject.value.filter(dailyQuest => dailyQuest.id !== deletedDailyQuest.id);
      this._save(dailyQuests);
      return true;
    } else return false;
  }

  private _load() {
    const storage = localStorage.getItem('dailyQuests');
    if (storage) {
      const dailyQuests: DailyQuest[] = JSON.parse(storage);
      this._dailyQuestsSubject.next(dailyQuests);
    }
  }

  private _save(dailyQuests: DailyQuest[]) {
    this._dailyQuestsSubject.next(dailyQuests);
    localStorage.setItem('dailyQuests', JSON.stringify(dailyQuests));
  }
}
