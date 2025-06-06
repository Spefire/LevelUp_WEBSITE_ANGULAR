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
    if (session) return true;
    else return this._router.createUrlTree(['/connexion']);
  }
}
