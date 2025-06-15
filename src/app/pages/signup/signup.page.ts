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
  selector: 'signup-page',
  imports: [CommonModule, FormsModule, EmptyStatePageComponent, FormFieldComponent, TextInputComponent, ButtonComponent, CalloutComponent],
  templateUrl: './signup.page.html',
  styles: ':host { display: contents }',
})
export class SignUpPage {
  public pages = PageTitles;

  public email = '';
  public emailConfirmed = '';
  public password = '';
  public passwordConfirmed = '';
  public success: string | null = null;
  public error: string | null = null;

  constructor(private _supabaseService: SupabaseService) {}

  public async signUp() {
    if (
      !this.email ||
      !this.emailConfirmed ||
      this.email !== this.emailConfirmed ||
      !this.password ||
      !this.passwordConfirmed ||
      this.password !== this.passwordConfirmed
    ) {
      this.error = 'Champs invalides';
      return;
    }
    const result = await this._supabaseService.signUp(this.email, this.password);
    this.success = result.success;
    this.error = result.error;
    this.password = '';
    this.passwordConfirmed = '';
  }
}
