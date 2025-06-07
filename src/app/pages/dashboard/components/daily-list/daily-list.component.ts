import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { TagComponent } from '@lucca-front/ng/tag';

import { DailyQuest } from '@src/models/daily-quests.model';
import { DailyCardComponent } from '@src/pages/dashboard/components/daily-card/daily-card.component';
import { DayOfWeekPipe } from '@src/pipes/day-of-week.pipe';
import { DailyQuestsService } from '@src/services/daily-quests.service';

@Component({
  selector: 'daily-list',
  imports: [CommonModule, EmptyStateSectionComponent, DailyCardComponent, ButtonComponent, TagComponent, DayOfWeekPipe],
  templateUrl: './daily-list.component.html',
  styles: ':host { display: contents }',
})
export class DailyListComponent implements OnInit {
  public readonly currentDate = input.required<Date>();
  public readonly isOld = input.required<boolean>();
  public dailyQuests: DailyQuest[];
  public optionnalDailyQuests: DailyQuest[];

  private readonly _destroyRef = inject(DestroyRef);

  constructor(private _dailyQuestsService: DailyQuestsService) {}

  public ngOnInit() {
    this._dailyQuestsService.dailyQuests$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(dailyQuests => {
      if (dailyQuests) {
        this.dailyQuests = dailyQuests.filter(dailyQuest => dailyQuest.quest.daysOfWeek.includes(this.currentDate().getDay()) && !dailyQuest.quest.isOptional);
        this.optionnalDailyQuests = dailyQuests.filter(
          dailyQuest => dailyQuest.quest.daysOfWeek.includes(this.currentDate().getDay()) && dailyQuest.quest.isOptional
        );
      }
    });
  }
}
