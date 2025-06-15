import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { TagComponent } from '@lucca-front/ng/tag';

import { Daily } from '@src/models/dailys.model';
import { DailyCardComponent } from '@src/pages/dashboard/components/daily-card/daily-card.component';
import { DayOfWeekPipe } from '@src/pipes/day-of-week.pipe';
import { DailysService } from '@src/services/dailys.service';

@Component({
  selector: 'dailys-list',
  imports: [RouterModule, CommonModule, EmptyStateSectionComponent, DailyCardComponent, ButtonComponent, TagComponent, DayOfWeekPipe],
  templateUrl: './dailys-list.component.html',
  styles: ':host { display: contents }',
})
export class DailysListComponent implements OnInit {
  public readonly currentDate = input.required<Date>();
  public readonly isOld = input.required<boolean>();
  public dailys: Daily[];
  public optionnalDailys: Daily[];

  private readonly _destroyRef = inject(DestroyRef);

  constructor(private _dailysService: DailysService) {}

  public ngOnInit() {
    this._dailysService.dailys$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(dailys => {
      if (dailys) {
        this.dailys = dailys.filter(daily => daily.daysOfWeek.includes(this.currentDate().getDay()) && daily.isMandatory);
        this.optionnalDailys = dailys.filter(daily => daily.daysOfWeek.includes(this.currentDate().getDay()) && !daily.isMandatory);
      }
    });
  }
}
