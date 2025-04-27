import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PageHeaderComponent } from '@lucca-front/ng/page-header';

import { PageTitles } from '@src/models/pages.model';

@Component({
  selector: 'legacy-page',
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './legacy.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegacyPage {
  pages = PageTitles;
}
