import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { IconComponent } from '@lucca-front/ng/icon';
import { TagComponent } from '@lucca-front/ng/tag';

import { Quest } from '@src/models/quests.model';
import { DailyCardComponent } from '@src/pages/dashboard/components/daily-card/daily-card.component';
import { DayOfWeekPipe } from '@src/pipes/day-of-week.pipe';
import { QuestsService } from '@src/services/quests.service';

@Component({
  selector: 'daily-list',
  imports: [CommonModule, EmptyStateSectionComponent, DailyCardComponent, ButtonComponent, IconComponent, TagComponent, DayOfWeekPipe],
  templateUrl: './daily-list.component.html',
  styles: ':host { display: contents }',
})
export class DailyListComponent implements OnInit {
  public dailyQuests: Quest[];
  public todayQuests: Quest[];
  public yesterdayQuests: Quest[];
  public tomorrowQuests: Quest[];

  public today: Date;
  public yesterday: Date;
  public tomorrow: Date;

  public index: number;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(private _questsService: QuestsService) {}

  public ngOnInit() {
    this.index = 1;
    this._questsService.dailyQuests$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(dailyQuests => {
      this.dailyQuests = dailyQuests;
      this._update();
    });
  }

  public previousDate() {
    this.index = 2;
    this._update();
  }

  public nextDate() {
    this.index = 1;
    this._update();
  }

  private _update() {
    this.today = new Date();
    this.yesterday = new Date();
    this.yesterday.setDate(this.today.getDate() - this.index);
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.today.getDate() + 1);
    this.todayQuests = this.dailyQuests.filter(quest => quest.daysOfWeek.includes(this.today.getDay()));
    this.yesterdayQuests = this.dailyQuests.filter(quest => quest.daysOfWeek.includes(this.yesterday.getDay()));
    this.tomorrowQuests = this.dailyQuests.filter(quest => quest.daysOfWeek.includes(this.tomorrow.getDay()));
  }
}
