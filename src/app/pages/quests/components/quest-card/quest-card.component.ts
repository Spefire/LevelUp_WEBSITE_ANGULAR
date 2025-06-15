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
import { CharacterService } from '@src/services/character.service';
import { QuestsService } from '@src/services/quests.service';

@Component({
  selector: 'quest-card',
  imports: [CommonModule, FormsModule, CheckboxInputComponent, IconComponent, ButtonComponent, QuestRewardsComponent],
  templateUrl: './quest-card.component.html',
  styles: ':host { display: contents }',
  providers: [LuDialogService],
})
export class QuestCardComponent implements OnInit {
  public readonly isDaily = input.required<boolean>();
  public readonly quest = input.required<Quest>();

  public character: Character;

  private readonly _destroyRef = inject(DestroyRef);

  #dialog = inject(LuDialogService);

  constructor(
    private _characterService: CharacterService,
    private _questsService: QuestsService
  ) {}

  public ngOnInit() {
    this._characterService.character$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(character => {
      if (character) this.character = character;
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
    if (this.isDaily()) {
      const dialogRef = this.#dialog.open({
        content: ConfirmDialogComponent,
        data: {},
        size: 'S',
      });

      dialogRef.result$.subscribe(res => {
        if (res) {
          // this._dailysService.removeDaily(this.quest());
        }
      });
    } else {
      // this._dailysService.addDaily(this.quest());
    }
  }
}
