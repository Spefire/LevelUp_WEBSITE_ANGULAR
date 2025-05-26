import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IconComponent } from '@lucca-front/ng/icon';

import { Log } from '@src/models/logs.model';
import { Quest, QuestDifficulty } from '@src/models/quests.model';
import { LogsService } from '@src/services/logs.service';
import { QuestsService } from '@src/services/quests.service';

@Component({
  selector: 'dungeon-table',
  imports: [CommonModule, IconComponent],
  templateUrl: './dungeon-table.component.html',
  styles: ':host { display: contents }',
})
export class DungeonTableComponent implements OnInit {
  public readonly currentDate = input.required<Date>();

  public QuestDifficulty = QuestDifficulty;
  public dailyQuests: Quest[];
  public logs: Log[];

  public daysOfWeek: number[] = [1, 2, 3, 4, 5, 6, 0]; // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi

  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private _logsService: LogsService,
    private _questsService: QuestsService
  ) {}

  public ngOnInit() {
    this._questsService.dailyQuests$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(dailyQuests => {
      this.dailyQuests = dailyQuests;
    });

    this._logsService.logs$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(logs => {
      this.logs = logs;
    });
  }

  public checkDayOfWeek(dayOfWeek: number) {
    const day01 = dayOfWeek === 0 ? 7 : dayOfWeek;
    const day02 = this.currentDate().getDay() === 0 ? 7 : this.currentDate().getDay();
    console.log(day01, day02);
    return day02 >= day01;
  }

  public checkLog(dailyQuest: Quest, dayOfWeek: number) {
    const currentDay = this.currentDate().getDay();
    const diff = dayOfWeek - currentDay;

    const targetDate = new Date(this.currentDate());
    targetDate.setDate(this.currentDate().getDate() + diff);
    targetDate.setHours(0, 0, 0, 0);

    const log = this.logs.find(log => dailyQuest.id === log.quest.id && this._isSameDay(targetDate, new Date(log.date)));
    return log;
  }

  private _isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  }
}
