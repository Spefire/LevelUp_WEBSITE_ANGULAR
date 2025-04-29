import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { StatusBadgeComponent } from '@lucca-front/ng/statusBadge';

import { QuestRewardsComponent } from '@src/components/quest-rewards/quest-rewards.component';
import { Log } from '@src/models/logs.model';
import { QuestDifficulty } from '@src/models/quests.model';
import { LogsService } from '@src/services/historic.service';

@Component({
  selector: 'historic-table',
  imports: [CommonModule, ButtonComponent, IconComponent, StatusBadgeComponent, TitleCasePipe, DatePipe, QuestRewardsComponent],
  templateUrl: './historic-table.component.html',
  styles: ':host { display: contents }',
})
export class HistoricTableComponent implements OnInit {
  public QuestDifficulty = QuestDifficulty;
  public logs: Log[];

  private readonly _destroyRef = inject(DestroyRef);

  constructor(private _logsService: LogsService) {}

  ngOnInit(): void {
    this._logsService.logs$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(logs => {
      this.logs = logs;
    });
  }
}
