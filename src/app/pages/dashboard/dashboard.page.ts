import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { PageHeaderComponent } from '@lucca-front/ng/page-header';

import { PageTitles } from '@src/models/pages.model';

@Component({
  selector: 'dashboard-page',
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './dashboard.page.html',
})
export class DashboardPage {
  pages = PageTitles;
}
