import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';
import { TagComponent } from '@lucca-front/ng/tag';

import { PageTitles } from '@src/models/pages.model';
import { DailysListComponent } from '@src/pages/dashboard/components/dailys-list/dailys-list.component';
import { HistoricTableComponent } from '@src/pages/dashboard/components/historic-table/historic-table.component';

@Component({
  selector: 'dashboard-page',
  imports: [
    CommonModule,
    PageHeaderComponent,
    TagComponent,
    HorizontalNavigationComponent,
    HorizontalNavigationLinkDirective,
    DailysListComponent,
    HistoricTableComponent,
  ],
  templateUrl: './dashboard.page.html',
})
export class DashboardPage implements OnInit {
  public pages = PageTitles;

  public currentNav = 'j-0';
  public today: Date;
  public yesterday: Date;
  public lastYesterday: Date;

  public ngOnInit() {
    this.today = new Date();
    this.yesterday = new Date();
    this.yesterday.setDate(this.today.getDate() - 1);
    this.lastYesterday = new Date();
    this.lastYesterday.setDate(this.today.getDate() - 2);
  }

  public setNav(newNav: string) {
    this.currentNav = newNav;
  }
}
