import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutComponent } from '@lucca-front/ng/callout';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';

import { PageTitles } from '@src/models/pages.model';
import { SupabaseService } from '@src/services/supabase.service';

@Component({
  selector: 'signup-page',
  imports: [CommonModule, FormsModule, PageHeaderComponent, FormFieldComponent, TextInputComponent, ButtonComponent, CalloutComponent],
  templateUrl: './signup.page.html',
})
export class SignUpPage {
  public pages = PageTitles;

  public email = '';
  public password = '';
  public success: string | null = null;
  public error: string | null = null;

  constructor(private _supabaseService: SupabaseService) {}

  public async signUp() {
    const result = await this._supabaseService.signUp(this.email, this.password);
    this.success = result.success;
    this.error = result.error;
  }
}
