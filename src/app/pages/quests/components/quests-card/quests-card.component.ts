import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { LuDialogService } from '@lucca-front/ng/dialog';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { TagComponent } from '@lucca-front/ng/tag';

import { ConfirmDialogComponent } from '@src/components/confirm-dialog/confirm-dialog.component';
import { Quest } from '@src/models/quests.model';
import { QuestsService } from '@src/pages/quests/quests.service';

@Component({
  selector: 'quests-card',
  imports: [CommonModule, FormsModule, CheckboxInputComponent, TagComponent],
  templateUrl: './quests-card.component.html',
  styles: ':host { display: contents }',
  providers: [LuDialogService],
})
export class QuestsCardComponent {
  readonly quest = input.required<Quest>();

  public isChecked: boolean;

  #dialog = inject(LuDialogService);

  private readonly _destroyRef = inject(DestroyRef);

  constructor(private _questsService: QuestsService) {}

  ngOnInit(): void {
    this._questsService.dailyQuestsSubject$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(dailyQuests => {
      this.isChecked = !!dailyQuests.find(dailyQuest => dailyQuest.id === this.quest().id);
    });
  }

  toggleQuest() {
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
