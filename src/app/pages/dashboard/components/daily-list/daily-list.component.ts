import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { TagComponent } from '@lucca-front/ng/tag';

import { Quest } from '@src/models/quests.model';
import { DailyCardComponent } from '@src/pages/dashboard/components/daily-card/daily-card.component';
import { DayOfWeekPipe } from '@src/pipes/day-of-week.pipe';
import { QuestsService } from '@src/services/quests.service';

@Component({
  selector: 'daily-list',
  imports: [CommonModule, EmptyStateSectionComponent, DailyCardComponent, ButtonComponent, TagComponent, DayOfWeekPipe],
  templateUrl: './daily-list.component.html',
  styles: ':host { display: contents }',
})
export class DailyListComponent implements OnInit {
  public readonly currentDate = input.required<Date>();
  public readonly isOld = input.required<boolean>();
  public quests: Quest[];
  public optionnalQuests: Quest[];

  private readonly _destroyRef = inject(DestroyRef);

  constructor(private _questsService: QuestsService) {}

  public ngOnInit() {
    this._questsService.dailyQuests$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(dailyQuests => {
      this.quests = dailyQuests.filter(quest => quest.daysOfWeek.includes(this.currentDate().getDay()) && !quest.isOptional);
      this.optionnalQuests = dailyQuests.filter(quest => quest.daysOfWeek.includes(this.currentDate().getDay()) && quest.isOptional);
    });
  }
}
