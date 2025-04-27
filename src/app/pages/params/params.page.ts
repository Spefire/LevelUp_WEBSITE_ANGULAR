import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { PageHeaderComponent } from '@lucca-front/ng/page-header';

import { PageTitles } from '@src/models/pages.model';

@Component({
  selector: 'params-page',
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './params.page.html',
})
export class ParamsPage {
  pages = PageTitles;
}
