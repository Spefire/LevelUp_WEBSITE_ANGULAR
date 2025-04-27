import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { IconComponent } from '@lucca-front/ng/icon';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';

import { PageTitles } from '@src/models/pages.model';
import { Quest } from '@src/models/quests.model';
import { DailyCardComponent } from '@src/pages/dashboard/components/daily-card/daily-card.component';
import { QuestsService } from '@src/pages/quests/quests.service';

@Component({
  selector: 'dashboard-page',
  imports: [CommonModule, PageHeaderComponent, EmptyStateSectionComponent, DailyCardComponent, ButtonComponent, IconComponent],
  templateUrl: './dashboard.page.html',
})
export class DashboardPage {
  pages = PageTitles;
  dailyQuests: Quest[];
  nowQuests: Quest[];
  lateQuests: Quest[];

  private readonly _destroyRef = inject(DestroyRef);

  constructor(private _questsService: QuestsService) {}

  ngOnInit(): void {
    this._questsService.dailyQuestsSubject$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(dailyQuests => {
      this.dailyQuests = dailyQuests;
      const now = new Date();
      this.nowQuests = dailyQuests.filter(quest => quest.daysOfWeek.includes(now.getDay()));
      this.lateQuests = dailyQuests.filter(quest => !quest.daysOfWeek.includes(now.getDay()));
    });
  }
}
