import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutComponent } from '@lucca-front/ng/callout';
import { EmptyStatePageComponent } from '@lucca-front/ng/empty-state';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';

import { PageTitles } from '@src/models/pages.model';
import { SupabaseService } from '@src/services/supabase.service';

@Component({
  selector: 'login-page',
  imports: [CommonModule, FormsModule, EmptyStatePageComponent, FormFieldComponent, TextInputComponent, ButtonComponent, CalloutComponent],
  templateUrl: './login.page.html',
  styles: ':host { display: contents }',
})
export class LoginPage {
  public pages = PageTitles;

  public email = 'nicholasb@hotmail.fr';
  public password = 'ilovecookies<3';
  public success: string | null = null;
  public error: string | null = null;

  constructor(private _supabaseService: SupabaseService) {}

  public async login() {
    if (!this.email || !this.password) {
      this.error = 'Champs manquants';
      return;
    }
    const result = await this._supabaseService.login(this.email, this.password);
    this.success = result.success;
    this.error = result.error;
    this.password = '';
  }
}
