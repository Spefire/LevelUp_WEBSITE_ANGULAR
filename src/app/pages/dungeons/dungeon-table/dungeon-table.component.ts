import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, OnChanges, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { HighlightDataComponent } from '@lucca-front/ng/highlight-data';
import { IconComponent } from '@lucca-front/ng/icon';

import { Log } from '@src/models/logs.model';
import { Quest, QuestDifficulty } from '@src/models/quests.model';
import { LogsService } from '@src/services/logs.service';
import { QuestsService } from '@src/services/quests.service';
import { isSameDay } from '@src/utils/time';

@Component({
  selector: 'dungeon-table',
  imports: [CommonModule, HighlightDataComponent, IconComponent],
  templateUrl: './dungeon-table.component.html',
  styleUrl: './dungeon-table.component.scss',
})
export class DungeonTableComponent implements OnInit, OnChanges {
  public readonly currentDate = input.required<Date>();
  public readonly isBefore = input.required<boolean>();
  public readonly isAfter = input.required<boolean>();

  public QuestDifficulty = QuestDifficulty;
  public daysOfWeek: number[] = [1, 2, 3, 4, 5, 6, 0]; // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
  public dailyQuests: Quest[];
  public logs: Log[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public headData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public bodyTable: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public footTable: any;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private _logsService: LogsService,
    private _questsService: QuestsService
  ) {}

  public ngOnInit() {
    this._questsService.dailyQuests$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(dailyQuests => {
      this.dailyQuests = dailyQuests.sort((a, b) => a.name.localeCompare(b.name));
      this._createTable();
    });

    this._logsService.logs$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(logs => {
      this.logs = logs;
      this._createTable();
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

  private _checkLog(dailyQuest: Quest, dayOfWeek: number) {
    const currentDay = this.currentDate().getDay();
    const diff = dayOfWeek - currentDay;

    const targetDate = new Date(this.currentDate());
    targetDate.setDate(this.currentDate().getDate() + diff);
    targetDate.setHours(0, 0, 0, 0);

    const log = this.logs.find(log => dailyQuest.id === log.quest.id && isSameDay(targetDate, new Date(log.date)));
    if (!log) {
      if (dailyQuest.isOptional) return 0;
      if (dailyQuest.difficulty === this.QuestDifficulty.COMPLEXE) return -3;
      else if (dailyQuest.difficulty === this.QuestDifficulty.STANDARD) return -2;
      else return -1;
    } else {
      if (dailyQuest.difficulty === this.QuestDifficulty.COMPLEXE) return 3;
      else if (dailyQuest.difficulty === this.QuestDifficulty.STANDARD) return 2;
      else return 1;
    }
  }

  private _createTable() {
    this.bodyTable = [];
    this.footTable = [];
    let totalLundi = 0;
    let totalMardi = 0;
    let totalMercredi = 0;
    let totalJeudi = 0;
    let totalVendredi = 0;
    let totalSamedi = 0;
    let totalDimanche = 0;
    this.dailyQuests.forEach(dailyQuest => {
      const lundi = this._checkDayOfWeek(1) ? this._checkLog(dailyQuest, 1) : null;
      totalLundi += lundi ? lundi : 0;
      const mardi = this._checkDayOfWeek(2) ? this._checkLog(dailyQuest, 2) : null;
      totalMardi += mardi ? mardi : 0;
      const mercredi = this._checkDayOfWeek(3) ? this._checkLog(dailyQuest, 3) : null;
      totalMercredi += mercredi ? mercredi : 0;
      const jeudi = this._checkDayOfWeek(4) ? this._checkLog(dailyQuest, 4) : null;
      totalJeudi += jeudi ? jeudi : 0;
      const vendredi = this._checkDayOfWeek(5) ? this._checkLog(dailyQuest, 5) : null;
      totalVendredi += vendredi ? vendredi : 0;
      const samedi = this._checkDayOfWeek(6) ? this._checkLog(dailyQuest, 6) : null;
      totalSamedi += samedi ? samedi : 0;
      const dimanche = this._checkDayOfWeek(0) ? this._checkLog(dailyQuest, 0) : null;
      totalDimanche += dimanche ? dimanche : 0;
      this.bodyTable.push({
        name: dailyQuest.name,
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
  }
}
