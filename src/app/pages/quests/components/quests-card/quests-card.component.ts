import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '@lucca-front/ng/button';
import { LuDialogService } from '@lucca-front/ng/dialog';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';

import { ConfirmDialogComponent } from '@src/components/confirm-dialog/confirm-dialog.component';
import { QuestRewardsComponent } from '@src/components/quest-rewards/quest-rewards.component';
import { Character } from '@src/models/character.model';
import { Quest } from '@src/models/quests.model';
import { QuestDialogComponent } from '@src/pages/quests/components/quest-dialog/quest-dialog.component';
import { DaysOfWeekPipe } from '@src/pipes/days-of-week.pipe';
import { CharacterService } from '@src/services/character.service';
import { DailyQuestsService } from '@src/services/daily-quests.service';
import { QuestsService } from '@src/services/quests.service';

@Component({
  selector: 'quests-card',
  imports: [CommonModule, FormsModule, CheckboxInputComponent, IconComponent, ButtonComponent, QuestRewardsComponent, DaysOfWeekPipe],
  templateUrl: './quests-card.component.html',
  styles: ':host { display: contents }',
  providers: [LuDialogService],
})
export class QuestsCardComponent implements OnInit {
  public readonly quest = input.required<Quest>();

  public character: Character;
  public isChecked: boolean;

  private readonly _destroyRef = inject(DestroyRef);

  #dialog = inject(LuDialogService);

  constructor(
    private _characterService: CharacterService,
    private _questsService: QuestsService,
    private _dailyQuestsService: DailyQuestsService
  ) {}

  public ngOnInit() {
    this._characterService.character$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(character => {
      if (character) this.character = character;
    });

    this._dailyQuestsService.dailyQuests$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(dailyQuests => {
      if (dailyQuests) this.isChecked = !!dailyQuests.find(dailyQuest => dailyQuest.id === this.quest().id);
      else this.isChecked = false;
    });
  }

  public modifyQuest() {
    const dialogRef = this.#dialog.open({
      content: QuestDialogComponent,
      data: { quest: this.quest() },
      panelClasses: ['mod-neutralBackground'],
      size: 'L',
    });

    dialogRef.result$.subscribe(res => {
      if (res) this._questsService.modifyQuest(this.quest());
    });
  }

  public deleteQuest() {
    const dialogRef = this.#dialog.open({
      content: ConfirmDialogComponent,
      data: {},
      size: 'S',
    });

    dialogRef.result$.subscribe(res => {
      if (res) this._questsService.removeQuest(this.quest());
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
          // this._dailyQuestsService.removeDailyQuest(this.quest());
        }
      });
    } else {
      this.isChecked = !this.isChecked;
      // this._dailyQuestsService.addDailyQuest(this.quest());
    }
  }
}
