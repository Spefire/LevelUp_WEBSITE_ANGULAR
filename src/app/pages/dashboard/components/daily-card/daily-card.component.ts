import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { StatusBadgeComponent } from '@lucca-front/ng/statusBadge';

import { QuestRewardsComponent } from '@src/components/quest-rewards/quest-rewards.component';
import { Log } from '@src/models/logs.model';
import { Quest } from '@src/models/quests.model';
import { LogsService } from '@src/services/logs.service';
import { isSameDay } from '@src/utils/time';

@Component({
  selector: 'daily-card',
  imports: [CommonModule, ButtonComponent, IconComponent, StatusBadgeComponent, QuestRewardsComponent],
  templateUrl: './daily-card.component.html',
  styles: ':host { display: contents }',
})
export class DailyCardComponent {
  public readonly currentDate = input.required<Date>();
  public readonly quest = input.required<Quest>();
  public readonly isOld = input.required<boolean>();
  public readonly isOptionnal = input.required<boolean>();

  public logLinked: Log | null = null;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(private _logsService: LogsService) {
    this._logsService.logs$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(logs => {
      if (logs) this.logLinked = logs.find(log => this.quest().id === log.quest.id && isSameDay(this.currentDate(), new Date(log.date))) ?? null;
    });
  }

  public completeQuest() {
    this.logLinked = { id: null, date: this.currentDate(), quest: this.quest() };
    this._logsService.addLog(this.logLinked);
  }

  public cancelQuest() {
    this._logsService.removeLog(this.logLinked);
    this.logLinked = null;
  }
}
