import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { HighlightDataComponent } from '@lucca-front/ng/highlight-data';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';

import { PageTitles } from '@src/models/pages.model';
import { DailyListComponent } from '@src/pages/dashboard/components/daily-list/daily-list.component';
import { HistoricTableComponent } from '@src/pages/dashboard/components/historic-table/historic-table.component';

@Component({
  selector: 'dashboard-page',
  imports: [
    CommonModule,
    PageHeaderComponent,
    HorizontalNavigationComponent,
    HorizontalNavigationLinkDirective,
    HighlightDataComponent,
    DailyListComponent,
    HistoricTableComponent,
  ],
  templateUrl: './dashboard.page.html',
})
export class DashboardPage {
  public pages = PageTitles;

  public currentNav = 'daily-list';

  public setNav(newNav: string) {
    this.currentNav = newNav;
  }
}
