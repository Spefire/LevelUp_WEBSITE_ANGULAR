import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutComponent } from '@lucca-front/ng/callout';
import {
  DialogComponent,
  DialogContentComponent,
  DialogDismissDirective,
  DialogFooterComponent,
  DialogHeaderComponent,
  injectDialogData,
  injectDialogRef,
} from '@lucca-front/ng/dialog';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { NumberInputComponent } from '@lucca-front/ng/forms';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { SwitchInputComponent } from '@lucca-front/ng/forms';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';

import { Daily } from '@src/models/dailys.model';
import { IDaily } from '@src/models/dailys.model';
import { Quest } from '@src/models/quests.model';
import { DailysService } from '@src/services/dailys.service';
import { SupabaseService } from '@src/services/supabase.service';

@Component({
  selector: 'daily-dialog',
  imports: [
    CommonModule,
    FormsModule,
    DialogComponent,
    DialogHeaderComponent,
    DialogContentComponent,
    DialogFooterComponent,
    DialogDismissDirective,
    HorizontalNavigationComponent,
    HorizontalNavigationLinkDirective,
    FormFieldComponent,
    CheckboxInputComponent,
    SwitchInputComponent,
    CalloutComponent,
    NumberInputComponent,
    ButtonComponent,
  ],
  templateUrl: './daily-dialog.component.html',
})
export class DailyDialogComponent implements OnInit {
  public data = injectDialogData<{ daily: Daily | null; quest: Quest }>();
  public ref = injectDialogRef<boolean>();

  public isCreation: boolean;
  public iDaily: IDaily;
  public currentMode = 'day';

  public get isInvalidForm() {
    if (!this.iDaily) return true;
    if (
      this.currentMode === 'day' &&
      !this.iDaily.lundi &&
      !this.iDaily.mardi &&
      !this.iDaily.mercredi &&
      !this.iDaily.jeudi &&
      !this.iDaily.vendredi &&
      !this.iDaily.samedi &&
      !this.iDaily.dimanche
    )
      return true;
    if (this.currentMode === 'week' && !this.iDaily.semaine) return true;
    return false;
  }

  constructor(
    private _supabaseService: SupabaseService,
    private _dailysService: DailysService
  ) {}

  public ngOnInit() {
    if (this.data.daily) {
      this.iDaily = Daily.getIDaily(this._supabaseService.user_id, this.data.daily);
    } else {
      this.isCreation = true;
      this.iDaily = Daily.getIDaily(this._supabaseService.user_id, new Daily(this.data.quest));
    }
  }

  public setMode(mode: string) {
    this.currentMode = mode;
  }

  public async confirm() {
    if (this.currentMode === 'week') {
      this.iDaily.lundi = false;
      this.iDaily.mardi = false;
      this.iDaily.mercredi = false;
      this.iDaily.jeudi = false;
      this.iDaily.vendredi = false;
      this.iDaily.samedi = false;
      this.iDaily.dimanche = false;
    }
    if (this.currentMode === 'day') {
      this.iDaily.semaine = 0;
    }
    const daily = Daily.getDaily(this.iDaily, this.data.quest);
    const result = this.isCreation ? await this._dailysService.addDaily(daily, this.data.quest) : await this._dailysService.modifyDaily(daily, this.data.quest);
    if (result) this.ref.close(true);
  }
}
