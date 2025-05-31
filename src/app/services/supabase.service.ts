import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';

import { Character } from '@src/models/character.model';

import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public session = new BehaviorSubject<Session | null>(null);
  private _supabase: SupabaseClient | null = null;

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

    // Écouter les changements de session
    this._supabase.auth.onAuthStateChange((_event, session) => {
      this.session.next(session || null);
      if (session) this._router.navigate(['/']);
      else this._router.navigate(['/connexion']);
    });
  }

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
      localStorage.removeItem('character');
      return null;
    }
  }

  public async getCharacter() {
    if (!this.user_id) return null;

    let result = await this._supabase.from('characters').select().eq('user_id', this.user_id).single();
    if (!result.data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const character: any = {
        user_id: this.user_id,
        isAdmin: false,
        avatar: 'https://www.arlenor.com/assets/images_filled/characters/ace.png',
        lastName: 'Super',
        firstName: 'Cookie',
      };
      result = await this._supabase.from('characters').insert(character);
    }

    if (!result.data) return null;
    else {
      const character: Character = {
        age: 22,
        avatar: result.data.avatar,
        gender: 'N',
        name: result.data.lastName + ' ' + result.data.firstName,
      };
      return character;
    }
  }
}
