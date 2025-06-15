import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '@lucca-front/ng/button';
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

import { IQuest, Quest, QuestCategory, QuestDifficulty } from '@src/models/quests.model';
import { QuestsService } from '@src/services/quests.service';

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
    FormFieldComponent,
    CheckboxInputComponent,
    NumberInputComponent,
    ButtonComponent,
  ],
  templateUrl: './daily-dialog.component.html',
})
export class DailyDialogComponent implements OnInit {
  public data = injectDialogData<{ quest: Quest } | null>();
  public ref = injectDialogRef<boolean>();

  public difficulty = Object.values(QuestDifficulty);
  public categories = Object.values(QuestCategory);

  public isCreation: boolean;
  public iQuest: IQuest;

  public get isInvalidForm() {
    if (!this.iQuest) return true;
    return false;
  }

  constructor(private _questsService: QuestsService) {}

  public ngOnInit() {
    if (this.data) this.iQuest = Quest.getIQuest(this.data.quest);
    else {
      this.isCreation = true;
      this.iQuest = Quest.getIQuest(new Quest());
    }
  }

  public async confirm() {
    const quest = Quest.getQuest(this.iQuest);
    const result = this.isCreation ? await this._questsService.addQuest(quest) : await this._questsService.modifyQuest(quest);
    if (result) this.ref.close(true);
  }
}
