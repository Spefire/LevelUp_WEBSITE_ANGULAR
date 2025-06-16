/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';

import { Adjectives, Character, ICharacter, Nouns } from '@src/models/character.model';
import { Daily, IDaily } from '@src/models/dailys.model';
import { ILog, Log } from '@src/models/logs.model';
import { IQuest, Quest } from '@src/models/quests.model';

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
        if (this._degubMode) console.log('Connexion');
        this.session.next(session);
        const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/tableau-de-bord';
        this._router.navigate([redirectUrl]);
      }
      // Déconnexion
      else if (this.session.value && !session) {
        if (this._degubMode) console.log('Déconnexion');
        this.session.next(null);
        this._router.navigate(['/connexion']);
      }
    });
  }

  // --------------------------------------------------------------------------------------------------

  public async login(email: string, password: string) {
    const result = await this._supabase.auth.signInWithPassword({ email, password });
    if (result.error) return { success: '', error: result.error.message };
    else return { success: 'Tu es bien connecté !', error: '' };
  }

  public async signUp(email: string, password: string) {
    const result = await this._supabase.auth.signUp({ email, password });
    if (result.error) return { success: '', error: result.error.message };
    else return { success: 'Tu as reçu un mail sur ' + email + ' pour confirmer ton inscription.', error: '' };
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
    let resultCharacter: ICharacter = await this._requestGet('characters', true);
    if (!resultCharacter) {
      const item: ICharacter = {
        id: null,
        user_id: this.user_id,
        lastName: Adjectives[Math.floor(Math.random() * Adjectives.length)],
        firstName: Nouns[Math.floor(Math.random() * Nouns.length)],
        isAdmin: false,
        eyebrows: 1,
        eyes: 1,
        hasGlasses: false,
        glasses: 1,
        mouth: 1,
      };
      resultCharacter = await this._requestPost('characters', item);
    }
    if (!resultCharacter) return null;
    else return Character.getCharacter(resultCharacter);
  }

  public async putCharacter(character: Character) {
    const resultCharacter: ICharacter = await this._requestPut('characters', Character.getICharacter(this.user_id, character));
    if (!resultCharacter) return null;
    else return Character.getCharacter(resultCharacter);
  }

  // --------------------------------------------------------------------------------------------------

  public async getLogs(quests: Quest[]) {
    const results: ILog[] = await this._requestGetAll('logs', true);
    if (!results) return null;
    else {
      const logs: Log[] = [];
      results.forEach(result => {
        const quest = quests.find(quest => quest.id === result.id_quest);
        logs.push(Log.getLog(result, quest));
      });
      return logs;
    }
  }

  public async postLog(log: Log, quest: Quest) {
    const result: ILog = await this._requestPost('logs', Log.getILog(this.user_id, log));
    if (!result) return null;
    else return Log.getLog(result, quest);
  }

  public async deleteLog(log: Log) {
    const result: boolean = await this._requestDelete('logs', log.id);
    if (!result) return null;
    else return result;
  }

  // --------------------------------------------------------------------------------------------------

  public async getDailys(quests: Quest[]) {
    const results: IDaily[] = await this._requestGetAll('dailys', true);
    if (!results) return null;
    else {
      const dailys: Daily[] = [];
      results.forEach(result => {
        const quest = quests.find(quest => quest.id === result.id_quest);
        dailys.push(Daily.getDaily(result, quest));
      });
      return dailys;
    }
  }

  public async postDaily(daily: Daily, quest: Quest) {
    const result: IDaily = await this._requestPost('dailys', Daily.getIDaily(this.user_id, daily));
    if (!result) return null;
    else return Daily.getDaily(result, quest);
  }

  public async putDaily(daily: Daily, quest: Quest) {
    const result: IDaily = await this._requestPut('dailys', Daily.getIDaily(this.user_id, daily));
    if (!result) return null;
    else return Daily.getDaily(result, quest);
  }

  public async deleteDaily(daily: Daily) {
    const result: boolean = await this._requestDelete('dailys', daily.id);
    if (!result) return null;
    else return result;
  }

  // --------------------------------------------------------------------------------------------------

  public async getQuests() {
    const results: IQuest[] = await this._requestGetAll('quests', false);
    if (!results) return null;
    else {
      const quests: Quest[] = [];
      results.forEach(result => {
        quests.push(Quest.getQuest(result));
      });
      return quests;
    }
  }

  public async postQuest(quest: Quest) {
    const result: IQuest = await this._requestPost('quests', Quest.getIQuest(quest));
    if (!result) return null;
    else return Quest.getQuest(result);
  }

  public async putQuest(quest: Quest) {
    const result: IQuest = await this._requestPut('quests', Quest.getIQuest(quest));
    if (!result) return null;
    else return Quest.getQuest(result);
  }

  public async deleteQuest(quest: Quest) {
    const result: boolean = await this._requestDelete('quests', quest.id);
    if (!result) return null;
    else return true;
  }

  // --------------------------------------------------------------------------------------------------

  private async _requestGet(target: string, withUserId: boolean): Promise<any> {
    const result = withUserId
      ? await this._supabase.from(target).select().eq('user_id', this.user_id).maybeSingle()
      : await this._supabase.from(target).select().maybeSingle();
    if (this._degubMode) console.log('requestGet : ' + target, result);
    if (result.error) console.error('requestGet : ' + target, result.error.message);
    return result.data;
  }

  private async _requestGetAll(target: string, withUserId: boolean): Promise<any[]> {
    const result = withUserId ? await this._supabase.from(target).select().eq('user_id', this.user_id) : await this._supabase.from(target).select();
    if (this._degubMode) console.log('requestGetAll : ' + target, result);
    if (result.error) console.error('requestGetAll : ' + target, result.error.message);
    return result.data;
  }

  private async _requestPost(target: string, item: any): Promise<any> {
    const newItem: any = Object.assign({}, item);
    delete newItem['id'];
    const result = await this._supabase.from(target).insert(newItem).select().single();
    if (this._degubMode) console.log('requestPost : ' + target, result);
    if (result.error) console.error('requestPost : ' + target, result.error.message);
    return result.data;
  }

  private async _requestPut(target: string, item: any): Promise<any> {
    const result = await this._supabase.from(target).update(item).eq('id', item.id).select().single();
    if (this._degubMode) console.log('requestPut : ' + target, result);
    if (result.error) console.error('requestPut : ' + target, result.error.message);
    return result.data;
  }

  private async _requestDelete(target: string, id: number | null): Promise<boolean> {
    const result = await this._supabase.from(target).delete().eq('id', id).select();
    if (this._degubMode) console.log('requestDelete : ' + target, result);
    if (result.error) console.error('requestDelete : ' + target, result.error.message);
    return true;
  }
}
