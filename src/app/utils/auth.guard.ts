import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { SupabaseService } from '@src/services/supabase.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _supabaseService: SupabaseService
  ) {}

  public async canActivate(): Promise<boolean | UrlTree> {
    const session = await this._supabaseService.getSession();
    if (session) return true;
    return this._router.createUrlTree(['/connexion']);
  }
}
