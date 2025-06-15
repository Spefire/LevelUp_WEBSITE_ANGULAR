import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonComponent } from '@lucca-front/ng/button';
import { LuDialogService } from '@lucca-front/ng/dialog';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';

import { ConfirmDialogComponent } from '@src/components/confirm-dialog/confirm-dialog.component';
import { QuestRewardsComponent } from '@src/components/quest-rewards/quest-rewards.component';
import { Character } from '@src/models/character.model';
import { Daily } from '@src/models/dailys.model';
import { Quest } from '@src/models/quests.model';
import { DailyDialogComponent } from '@src/pages/quests/components/daily-dialog/daily-dialog.component';
import { QuestDialogComponent } from '@src/pages/quests/components/quest-dialog/quest-dialog.component';
import { DaysOfWeekPipe } from '@src/pipes/days-of-week.pipe';
import { CharacterService } from '@src/services/character.service';
import { DailysService } from '@src/services/dailys.service';
import { QuestsService } from '@src/services/quests.service';

@Component({
  selector: 'quest-card',
  imports: [CommonModule, LuTooltipModule, IconComponent, ButtonComponent, QuestRewardsComponent, DaysOfWeekPipe],
  templateUrl: './quest-card.component.html',
  styles: ':host { display: contents }',
  providers: [LuDialogService],
})
export class QuestCardComponent implements OnInit {
  public readonly isDaily = input.required<boolean>();
  public readonly quest = input.required<Quest>();

  public character: Character;
  public dailys: Daily[];

  private readonly _destroyRef = inject(DestroyRef);

  #dialog = inject(LuDialogService);

  public get daily(): Daily {
    if (!this.isDaily() || !this.dailys) return null;
    else return this.dailys.find(daily => daily.quest.id === this.quest().id);
  }

  constructor(
    private _characterService: CharacterService,
    private _dailysService: DailysService,
    private _questsService: QuestsService
  ) {}

  public ngOnInit() {
    this._characterService.character$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(character => {
      if (character) this.character = character;
    });

    this._dailysService.dailys$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(dailys => {
      if (dailys) this.dailys = dailys;
    });
  }

  public addDaily() {
    this.#dialog.open({
      content: DailyDialogComponent,
      data: { daily: null, quest: this.quest() },
      size: 'S',
    });
  }

  public removeDaily() {
    const dialogRef = this.#dialog.open({
      content: ConfirmDialogComponent,
      data: {},
      size: 'S',
    });

    dialogRef.result$.subscribe(res => {
      if (res) this._dailysService.removeDaily(this.daily);
    });
  }

  public modifyQuest() {
    this.#dialog.open({
      content: QuestDialogComponent,
      data: { quest: this.quest() },
      panelClasses: ['mod-neutralBackground'],
      size: 'L',
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
}
