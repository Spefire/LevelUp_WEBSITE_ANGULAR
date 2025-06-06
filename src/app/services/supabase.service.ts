/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';

import { Avatar, Character } from '@src/models/character.model';
import { adjectives, nouns } from '@src/models/character.options';

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
    this._supabase = createClient(url, key);
    this._supabase.auth.onAuthStateChange((_event, session) => {
      // Connexion
      if (!this.session.value && session) {
        this.session.next(session);
        this._router.navigate(['/']);
      }
      // Déconnexion
      else if (this.session.value && !session) {
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
      const item: any = {
        user_id: this.user_id,
        isAdmin: false,
        avatar: [1, 1, 0, 1, 1],
        lastName: adjectives[Math.floor(Math.random() * adjectives.length)],
        firstName: nouns[Math.floor(Math.random() * nouns.length)],
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
        avatar: avatar,
        lastName: resultCharacter.lastName,
        firstName: resultCharacter.firstName,
        isAdmin: resultCharacter.isAdmin,
      };
      return character;
    }
  }

  public async putCharacter(character: Character) {
    const item: any = {
      id: character.id,
      user_id: this.user_id,
      isAdmin: character.isAdmin,
      avatar: [character.avatar.eyebrows, character.avatar.eyes, character.avatar.hasGlasses ? 1 : 0, character.avatar.glasses, character.avatar.mouth],
      lastName: character.lastName,
      firstName: character.firstName,
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
        avatar: avatar,
        lastName: resultCharacter.lastName,
        firstName: resultCharacter.firstName,
        isAdmin: resultCharacter.isAdmin,
      };
      return character;
    }
  }

  // --------------------------------------------------------------------------------------------------

  private async _requestGet(target: string): Promise<any> {
    const result = await this._supabase.from(target).select().eq('user_id', this.user_id).maybeSingle();
    if (this._degubMode) console.log('requestGet', result);
    if (result.error) console.error('requestGet', result.error.message);
    return result.data;
  }

  /* private async _requestGetAll(target: string): Promise<any[]> {
    const result = await this._supabase.from(target).select().eq('user_id', this.user_id);
    if (this._degubMode) console.log('requestGetAll', result);
    if (result.error) console.error('requestGetAll', result.error.message);
    return result.data;
  }*/

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

  /* private async _requestDelete(target: string, id: number | null): Promise<boolean> {
    const result = await this._supabase.from(target).delete().eq('id', id).select();
    if (this._degubMode) console.log('requestDelete', result);
    if (result.error) console.error('requestDelete', result.error.message);
    return true;
  }*/
}
