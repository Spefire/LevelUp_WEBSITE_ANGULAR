import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { ButtonComponent } from '@lucca-front/ng/button';
import { StatusBadgeComponent } from '@lucca-front/ng/statusBadge';

import { QuestRewardsComponent } from '@src/components/quest-rewards/quest-rewards.component';
import { Log } from '@src/models/logs.model';
import { Quest } from '@src/models/quests.model';
import { DaysOfWeekPipe } from '@src/pipes/days-of-week.pipe';
import { LogsService } from '@src/services/historic.service';

@Component({
  selector: 'daily-card',
  imports: [CommonModule, ButtonComponent, StatusBadgeComponent, DaysOfWeekPipe, QuestRewardsComponent],
  templateUrl: './daily-card.component.html',
  styles: ':host { display: contents }',
})
export class DailyCardComponent {
  readonly quest = input.required<Quest>();
  readonly readonly = input.required<boolean>();

  public isCompleted = false;

  constructor(private _logsService: LogsService) {}

  completeQuest() {
    this.isCompleted = true;
    const log: Log = { date: new Date(), quest: this.quest() };
    this._logsService.addLog(log);
  }
}
