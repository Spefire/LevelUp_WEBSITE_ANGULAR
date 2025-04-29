import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { IconComponent } from '@lucca-front/ng/icon';

import { Quest } from '@src/models/quests.model';
import { DailyCardComponent } from '@src/pages/dashboard/components/daily-card/daily-card.component';
import { QuestsService } from '@src/services/quests.service';

@Component({
  selector: 'daily-list',
  imports: [CommonModule, EmptyStateSectionComponent, DailyCardComponent, ButtonComponent, IconComponent],
  templateUrl: './daily-list.component.html',
  styles: ':host { display: contents }',
})
export class DailyListComponent implements OnInit {
  dailyQuests: Quest[];
  nowQuests: Quest[];
  lateQuests: Quest[];

  private readonly _destroyRef = inject(DestroyRef);

  constructor(private _questsService: QuestsService) {}

  ngOnInit(): void {
    this._questsService.dailyQuests$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(dailyQuests => {
      this.dailyQuests = dailyQuests;
      const now = new Date();
      this.nowQuests = dailyQuests.filter(quest => quest.daysOfWeek.includes(now.getDay()));
      this.lateQuests = dailyQuests.filter(quest => !quest.daysOfWeek.includes(now.getDay()));
    });
  }
}
