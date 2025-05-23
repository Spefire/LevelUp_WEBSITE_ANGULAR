import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { StatusBadgeComponent } from '@lucca-front/ng/statusBadge';

import { PaginationComponent } from '@src/components/pagination/pagination.component';
import { QuestRewardsComponent } from '@src/components/quest-rewards/quest-rewards.component';
import { Log } from '@src/models/logs.model';
import { QuestDifficulty } from '@src/models/quests.model';
import { LogsService } from '@src/services/historic.service';

@Component({
  selector: 'historic-table',
  imports: [CommonModule, ButtonComponent, IconComponent, StatusBadgeComponent, TitleCasePipe, DatePipe, PaginationComponent, QuestRewardsComponent],
  templateUrl: './historic-table.component.html',
  styles: ':host { display: contents }',
})
export class HistoricTableComponent implements OnInit {
  public QuestDifficulty = QuestDifficulty;
  public filteredLogs: Log[];
  public logs: Log[];
  public nbByPage = 10;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(private _logsService: LogsService) {}

  ngOnInit(): void {
    this._logsService.logs$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(logs => {
      this.logs = logs;
      this.filteredLogs = this.logs.slice(0, Math.min(logs.length, this.nbByPage));
    });
  }

  changePagination(value: { min: number; max: number }) {
    this.filteredLogs = this.logs.slice(value.min, value.max);
  }
}
