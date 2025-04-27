import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';

import { PageTitles } from '@src/models/pages.model';
import { QuestsFiltersComponent } from '@src/pages/quests/components/quests-filters/quests-filters.component';
import { QuestsListComponent } from '@src/pages/quests/components/quests-list/quests-list.component';

@Component({
  selector: 'quests-page',
  imports: [CommonModule, PageHeaderComponent, QuestsFiltersComponent, QuestsListComponent, ButtonComponent, IconComponent],
  templateUrl: './quests.page.html',
})
export class QuestsPage {
  pages = PageTitles;
}
