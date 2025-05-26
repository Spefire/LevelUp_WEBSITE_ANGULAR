import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { LuDialogService } from '@lucca-front/ng/dialog';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';

import { ConfirmDialogComponent } from '@src/components/confirm-dialog/confirm-dialog.component';
import { QuestRewardsComponent } from '@src/components/quest-rewards/quest-rewards.component';
import { Quest } from '@src/models/quests.model';
import { QuestsService } from '@src/services/quests.service';

@Component({
  selector: 'quests-card',
  imports: [CommonModule, FormsModule, CheckboxInputComponent, QuestRewardsComponent],
  templateUrl: './quests-card.component.html',
  styles: ':host { display: contents }',
  providers: [LuDialogService],
})
export class QuestsCardComponent implements OnInit {
  public readonly quest = input.required<Quest>();

  public isChecked: boolean;

  private readonly _destroyRef = inject(DestroyRef);

  #dialog = inject(LuDialogService);

  constructor(private _questsService: QuestsService) {}

  public ngOnInit() {
    this._questsService.dailyQuests$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(dailyQuests => {
      this.isChecked = !!dailyQuests.find(dailyQuest => dailyQuest.id === this.quest().id);
    });
  }

  public toggleQuest() {
    if (this.isChecked) {
      const dialogRef = this.#dialog.open({
        content: ConfirmDialogComponent,
        data: {},
        size: 'S',
      });

      dialogRef.result$.subscribe(res => {
        if (res) {
          this.isChecked = !this.isChecked;
          this._questsService.toggleQuest(this.quest());
        }
      });
    } else {
      this.isChecked = !this.isChecked;
      this._questsService.toggleQuest(this.quest());
    }
  }
}
