import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { SupabaseService } from '@src/services/supabase.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _supabaseService: SupabaseService
  ) {}

  public canActivate(): boolean | UrlTree {
    const session = this._supabaseService.session.value;
    console.log('AuthGuard', session ? true : false, this._router.url);
    if (session) return true;
    else return false;
  }
}
