import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PageHeaderComponent } from '@lucca-front/ng/page-header';

@Component({
  selector: 'legacy-page',
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './legacy.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegacyPage {}
