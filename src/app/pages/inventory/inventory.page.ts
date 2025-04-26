import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PageHeaderComponent } from '@lucca-front/ng/page-header';

@Component({
  selector: 'inventory-page',
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './inventory.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryPage {}
