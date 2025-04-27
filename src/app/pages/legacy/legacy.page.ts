import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { PageHeaderComponent } from '@lucca-front/ng/page-header';

import { PageTitles } from '@src/models/pages.model';

@Component({
  selector: 'legacy-page',
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './legacy.page.html',
})
export class LegacyPage {
  pages = PageTitles;
}
