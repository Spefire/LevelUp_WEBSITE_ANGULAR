/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';

import { Adjectives, Avatar, Character, ICharacter, Nouns } from '@src/models/character.model';
import { DailyQuest } from '@src/models/daily-quests.model';
import { Log } from '@src/models/logs.model';

import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public session = new BehaviorSubject<Session | null>(null);
  private _supabase: SupabaseClient | null = null;
  private _degubMode = true;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public session$ = this.session.asObservable();

  public get user_id() {
    const session = this.session.value;
    return session ? session.user.id : null;
  }

  constructor(private _router: Router) {
    const url = environment.NG_APP_SUPABASE_URL || '';
    const key = environment.NG_APP_SUPABASE_ANON_KEY || '';
    if (this._router.url.length > 1) localStorage.setItem('redirectAfterLogin', this._router.url);
    this._supabase = createClient(url, key);

    // Gérer les événements de la session au fil du temps
    this._supabase.auth.onAuthStateChange((_event, session) => {
      // Connexion
      if (!this.session.value && session) {
        console.warn('Connexion');
        this.session.next(session);
        const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/tableau-de-bord';
        this._router.navigate([redirectUrl]);
      }
      // Déconnexion
      else if (this.session.value && !session) {
        console.warn('Déconnexion');
        this.session.next(null);
        this._router.navigate(['/connexion']);
      }
    });
  }

  // --------------------------------------------------------------------------------------------------

  public async login(email: string, password: string) {
    const result = await this._supabase.auth.signInWithPassword({ email, password });
    if (result.error) return { success: '', error: result.error.message };
    else return { success: 'Vous êtes bien connecté !', error: '' };
  }

  public async signUp(email: string, password: string) {
    const result = await this._supabase.auth.signUp({ email, password });
    if (result.error) return { success: '', error: result.error.message };
    else return { success: 'Vous avez reçu un mail sur ' + email + ' pour confirmer votre inscription.', error: '' };
  }

  public async logout() {
    const result = await this._supabase.auth.signOut();
    if (result.error) return result.error.message;
    else {
      localStorage.clear();
      return null;
    }
  }

  // --------------------------------------------------------------------------------------------------

  public async getCharacter() {
    let resultCharacter = await this._requestGet('characters');
    if (!resultCharacter) {
      const item: ICharacter = {
        id: null,
        user_id: this.user_id,
        lastName: Adjectives[Math.floor(Math.random() * Adjectives.length)],
        firstName: Nouns[Math.floor(Math.random() * Nouns.length)],
        isAdmin: false,
        avatar: [1, 1, 0, 1, 1],
      };
      resultCharacter = await this._requestPost('characters', item);
    }

    if (!resultCharacter) return null;
    else {
      const avatar: Avatar = {
        eyebrows: resultCharacter.avatar ? resultCharacter.avatar[0] : 1,
        eyes: resultCharacter.avatar ? resultCharacter.avatar[1] : 1,
        hasGlasses: resultCharacter.avatar ? (resultCharacter.avatar[2] ? true : false) : false,
        glasses: resultCharacter.avatar ? resultCharacter.avatar[3] : 1,
        mouth: resultCharacter.avatar ? resultCharacter.avatar[4] : 1,
      };
      const character: Character = {
        id: resultCharacter.id,
        lastName: resultCharacter.lastName,
        firstName: resultCharacter.firstName,
        isAdmin: resultCharacter.isAdmin,
        avatar: avatar,
      };
      return character;
    }
  }

  public async putCharacter(character: Character) {
    const item: ICharacter = {
      id: character.id,
      user_id: this.user_id,
      lastName: character.lastName,
      firstName: character.firstName,
      isAdmin: character.isAdmin,
      avatar: [character.avatar.eyebrows, character.avatar.eyes, character.avatar.hasGlasses ? 1 : 0, character.avatar.glasses, character.avatar.mouth],
    };
    const resultCharacter = await this._requestPut('characters', item);
    if (!resultCharacter) return null;
    else {
      const avatar: Avatar = {
        eyebrows: resultCharacter.avatar ? resultCharacter.avatar[0] : 1,
        eyes: resultCharacter.avatar ? resultCharacter.avatar[1] : 1,
        hasGlasses: resultCharacter.avatar ? (resultCharacter.avatar[2] ? true : false) : false,
        glasses: resultCharacter.avatar ? resultCharacter.avatar[3] : 1,
        mouth: resultCharacter.avatar ? resultCharacter.avatar[4] : 1,
      };
      const character: Character = {
        id: resultCharacter.id,
        lastName: resultCharacter.lastName,
        firstName: resultCharacter.firstName,
        isAdmin: resultCharacter.isAdmin,
        avatar: avatar,
      };
      return character;
    }
  }

  // --------------------------------------------------------------------------------------------------

  public async getLogs() {
    const resultLogs = await this._requestGetAll('logs');
    if (!resultLogs) return null;
    else return resultLogs;
  }

  public async postLog(log: Log) {
    const resultLog = await this._requestPost('logs', log);
    if (!resultLog) return null;
    else return resultLog;
  }

  public async deleteLog(log: Log) {
    const resultLog = await this._requestDelete('logs', log.id);
    if (!resultLog) return null;
    else return resultLog;
  }

  // --------------------------------------------------------------------------------------------------

  public async getDailyQuests() {
    const resultLogs = await this._requestGetAll('dailyQuests');
    if (!resultLogs) return null;
    else return resultLogs;
  }

  public async postDailyQuest(dailyQuest: DailyQuest) {
    const resultLog = await this._requestPost('dailyQuests', dailyQuest);
    if (!resultLog) return null;
    else return resultLog;
  }

  public async deleteDailyQuest(dailyQuest: DailyQuest) {
    const resultLog = await this._requestDelete('dailyQuests', dailyQuest.id);
    if (!resultLog) return null;
    else return resultLog;
  }

  // --------------------------------------------------------------------------------------------------

  public async getQuests() {
    const resultLogs = await this._requestGetAll('quests');
    if (!resultLogs) return null;
    else return resultLogs;
  }

  // --------------------------------------------------------------------------------------------------

  private async _requestGet(target: string): Promise<any> {
    const result = await this._supabase.from(target).select().eq('user_id', this.user_id).maybeSingle();
    if (this._degubMode) console.log('requestGet', result);
    if (result.error) console.error('requestGet', result.error.message);
    return result.data;
  }

  private async _requestGetAll(target: string): Promise<any[]> {
    const result = await this._supabase.from(target).select().eq('user_id', this.user_id);
    if (this._degubMode) console.log('requestGetAll', result);
    if (result.error) console.error('requestGetAll', result.error.message);
    return result.data;
  }

  private async _requestPost(target: string, item: any): Promise<any> {
    const result = await this._supabase.from(target).insert(item).select().single();
    if (this._degubMode) console.log('requestPost', result);
    if (result.error) console.error('requestPost', result.error.message);
    return result.data;
  }

  /* private async _requestPostAll(target: string, items: any[]): Promise<any[]> {
    const result = await this._supabase.from(target).insert(items).select();
    if (this._degubMode) console.log('requestPostAll', result);
    if (result.error) console.error('requestPostAll', result.error.message);
    return result.data;
  }*/

  private async _requestPut(target: string, item: any): Promise<any> {
    const result = await this._supabase.from(target).update(item).eq('id', item.id).select().single();
    if (this._degubMode) console.log('requestPut', result);
    if (result.error) console.error('requestPut', result.error.message);
    return result.data;
  }

  private async _requestDelete(target: string, id: number | null): Promise<boolean> {
    const result = await this._supabase.from(target).delete().eq('id', id).select();
    if (this._degubMode) console.log('requestDelete', result);
    if (result.error) console.error('requestDelete', result.error.message);
    return true;
  }
}
