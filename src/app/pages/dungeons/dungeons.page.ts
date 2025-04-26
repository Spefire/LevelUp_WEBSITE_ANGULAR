import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PageHeaderComponent } from '@lucca-front/ng/page-header';

@Component({
  selector: 'dungeons-page',
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './dungeons.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DungeonsPage {}
