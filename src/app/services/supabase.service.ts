import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';

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

  public async getSession() {
    const result = await this._supabase.auth.getSession();
    return result.data.session;
  }

  public async login(email: string, password: string) {
    const result = await this._supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (result.error) {
      return { success: '', error: result.error.message };
    } else {
      return { success: 'Vous êtes bien connecté !', error: '' };
    }
  }

  public async signUp(email: string, password: string) {
    const result = await this._supabase.auth.signUp({
      email,
      password,
    });

    if (result.error) {
      return { success: '', error: result.error.message };
    } else {
      return { success: 'Vous avez reçu un mail sur ' + email + ' pour confirmer votre inscription.', error: '' };
    }
  }

  public async logout() {
    const result = await this._supabase.auth.signOut();

    if (result.error) {
      return result.error.message;
    } else {
      return null;
    }
  }

  /*
  private async _requestGet(target: string): Promise<any[]> {
    if (!this._supabase) return [];
    const { data } = await this._supabase.from(target).select();
    // console.log('requestGet', data);
    return data || [];
  }

  private async _requestPostAll(target: string, items: ModelAPI[]): Promise<any[]> {
    if (!this._supabase) return [];
    const newItems: any[] = [];
    items.forEach(item => {
      const newItem: any = Object.assign({}, item);
      delete newItem['id'];
      newItems.push(newItem);
    });
    const { data } = await this._supabase.from(target).insert(newItems).select();
    // console.log('requestPostAll', data);
    return data || [];
  }

  private async _requestPost(target: string, item: ModelAPI): Promise<number> {
    if (!this._supabase) return 0;
    const newItem: any = Object.assign({}, item);
    delete newItem['id'];
    const { data } = await this._supabase.from(target).insert([newItem]).select();
    const id = data && data[0].id ? data[0].id : 0;
    // console.log('requestPost', id);
    return id;
  }

  private async _requestPut(target: string, item: ModelAPI): Promise<boolean> {
    if (!this._supabase) return false;
    await this._supabase.from(target).update(item).eq('id', item.id).select();
    // console.log('requestPut');
    return true;
  }

  private async _requestDelete(target: string, id: number | null): Promise<boolean> {
    if (!this._supabase) return false;
    await this._supabase.from(target).delete().eq('id', id).select();
    // console.log('requestDelete');
    return true;
  }
  */
}
