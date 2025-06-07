import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, OnChanges, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { HighlightDataComponent } from '@lucca-front/ng/highlight-data';
import { IconComponent } from '@lucca-front/ng/icon';

import { DailyQuest } from '@src/models/daily-quests.model';
import { Log } from '@src/models/logs.model';
import { Quest, QuestDifficulty } from '@src/models/quests.model';
import { DayOfWeekPipe } from '@src/pipes/day-of-week.pipe';
import { DailyQuestsService } from '@src/services/daily-quests.service';
import { LogsService } from '@src/services/logs.service';
import { isSameDay } from '@src/utils/time';

@Component({
  selector: 'dungeon-table',
  imports: [CommonModule, EmptyStateSectionComponent, HighlightDataComponent, IconComponent],
  templateUrl: './dungeon-table.component.html',
  styleUrl: './dungeon-table.component.scss',
})
export class DungeonTableComponent implements OnInit, OnChanges {
  public readonly currentDate = input.required<Date>();
  public readonly isBefore = input.required<boolean>();
  public readonly isAfter = input.required<boolean>();

  public QuestDifficulty = QuestDifficulty;
  public daysOfWeek: number[] = [1, 2, 3, 4, 5, 6, 0]; // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
  public logs: Log[];
  public dailyQuests: DailyQuest[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public headData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public bodyTable: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public footTable: any;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private _logsService: LogsService,
    private _dailyQuestsService: DailyQuestsService
  ) {}

  public ngOnInit() {
    this._dailyQuestsService.dailyQuests$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(dailyQuests => {
      if (dailyQuests) {
        this.dailyQuests = dailyQuests.sort((a, b) => a.quest.name.localeCompare(b.quest.name));
        this._createTable();
      }
    });

    this._logsService.logs$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(logs => {
      if (logs) {
        this.logs = logs;
        this._createTable();
      }
    });
  }

  public ngOnChanges() {
    this._createTable();
  }

  public getColor(value: number) {
    if (value > 0) return 'u-textSuccess';
    else if (value < 0) return 'u-textError';
    else return '';
  }

  private _checkDayOfWeek(dayOfWeek: number) {
    if (this.isBefore()) return true;
    if (this.isAfter()) return false;
    const day01 = dayOfWeek === 0 ? 7 : dayOfWeek;
    const day02 = this.currentDate().getDay() === 0 ? 7 : this.currentDate().getDay();
    return day02 >= day01;
  }

  private _checkLog(quest: Quest, dayOfWeek: number) {
    const currentDay = this.currentDate().getDay();
    const diff = dayOfWeek - currentDay;

    const targetDate = new Date(this.currentDate());
    targetDate.setDate(this.currentDate().getDate() + diff);
    targetDate.setHours(0, 0, 0, 0);

    const log = this.logs.find(log => quest.id === log.quest.id && isSameDay(targetDate, new Date(log.date)));
    if (!log) {
      if (quest.isOptional) return 0;
      if (quest.difficulty === this.QuestDifficulty.COMPLEXE) return -3;
      else if (quest.difficulty === this.QuestDifficulty.STANDARD) return -2;
      else return -1;
    } else {
      if (quest.difficulty === this.QuestDifficulty.COMPLEXE) return 3;
      else if (quest.difficulty === this.QuestDifficulty.STANDARD) return 2;
      else return 1;
    }
  }

  private _getBestDay() {
    let bestDay = 0;
    let bestValue = -1000;
    this.daysOfWeek.forEach(dayOfWeek => {
      if (this.footTable[dayOfWeek] > bestValue) {
        bestDay = dayOfWeek;
        bestValue = this.footTable[dayOfWeek];
      }
    });
    return DayOfWeekPipe.transformDay(bestDay);
  }

  private _createTable() {
    if (!this.dailyQuests || !this.logs) return;
    this.bodyTable = [];
    this.footTable = {};
    let totalLundi = 0;
    let totalMardi = 0;
    let totalMercredi = 0;
    let totalJeudi = 0;
    let totalVendredi = 0;
    let totalSamedi = 0;
    let totalDimanche = 0;
    let nbQuests = 0;
    this.dailyQuests.forEach(dailyQuest => {
      const quest = dailyQuest.quest;
      const lundi = this._checkDayOfWeek(1) ? this._checkLog(quest, 1) : null;
      if (lundi) {
        totalLundi += lundi;
        if (lundi > 0) nbQuests++;
      }
      const mardi = this._checkDayOfWeek(2) ? this._checkLog(quest, 2) : null;
      if (mardi) {
        totalMardi += mardi;
        if (mardi > 0) nbQuests++;
      }
      const mercredi = this._checkDayOfWeek(3) ? this._checkLog(quest, 3) : null;
      if (mercredi) {
        totalMercredi += mercredi;
        if (mercredi > 0) nbQuests++;
      }
      const jeudi = this._checkDayOfWeek(4) ? this._checkLog(quest, 4) : null;
      if (jeudi) {
        totalJeudi += jeudi;
        if (jeudi > 0) nbQuests++;
      }
      const vendredi = this._checkDayOfWeek(5) ? this._checkLog(quest, 5) : null;
      if (vendredi) {
        totalVendredi += vendredi;
        if (vendredi > 0) nbQuests++;
      }
      const samedi = this._checkDayOfWeek(6) ? this._checkLog(quest, 6) : null;
      if (samedi) {
        totalSamedi += samedi;
        if (samedi > 0) nbQuests++;
      }
      const dimanche = this._checkDayOfWeek(0) ? this._checkLog(quest, 0) : null;
      if (dimanche) {
        totalDimanche += dimanche;
        if (dimanche > 0) nbQuests++;
      }
      this.bodyTable.push({
        name: quest.name,
        1: lundi,
        2: mardi,
        3: mercredi,
        4: jeudi,
        5: vendredi,
        6: samedi,
        0: dimanche,
        total: lundi + mardi + mercredi + jeudi + vendredi + samedi + dimanche,
      });
    });
    this.footTable = {
      1: totalLundi,
      2: totalMardi,
      3: totalMercredi,
      4: totalJeudi,
      5: totalVendredi,
      6: totalSamedi,
      0: totalDimanche,
      total: totalLundi + totalMardi + totalMercredi + totalJeudi + totalVendredi + totalSamedi + totalDimanche,
    };
    this.headData = {
      best: this._getBestDay(),
      nb: nbQuests,
      score: this.footTable.total,
    };
  }
}
