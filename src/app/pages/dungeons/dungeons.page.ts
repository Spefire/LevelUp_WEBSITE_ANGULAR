import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { PageHeaderComponent } from '@lucca-front/ng/page-header';

import { PageTitles } from '@src/models/pages.model';

@Component({
  selector: 'dungeons-page',
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './dungeons.page.html',
})
export class DungeonsPage {
  pages = PageTitles;
}
