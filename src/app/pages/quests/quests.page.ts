import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonComponent } from '@lucca-front/ng/button';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { IconComponent } from '@lucca-front/ng/icon';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';
import { TagComponent } from '@lucca-front/ng/tag';

import { PageTitles } from '@src/models/pages.model';
import { Quest } from '@src/models/quests.model';
import { QuestsFiltersComponent } from '@src/pages/quests/components/quests-filters/quests-filters.component';
import { QuestsListComponent } from '@src/pages/quests/components/quests-list/quests-list.component';
import { QuestsService } from '@src/services/quests.service';

@Component({
  selector: 'quests-page',
  imports: [
    CommonModule,
    PageHeaderComponent,
    TagComponent,
    HorizontalNavigationComponent,
    HorizontalNavigationLinkDirective,
    QuestsFiltersComponent,
    QuestsListComponent,
    ButtonComponent,
    IconComponent,
  ],
  templateUrl: './quests.page.html',
})
export class QuestsPage implements OnInit {
  public pages = PageTitles;

  public currentNav = 'obligatoires';
  public quests: Quest[];
  public optionnalQuests: Quest[];

  private readonly _destroyRef = inject(DestroyRef);

  constructor(private _questsService: QuestsService) {}

  public ngOnInit(): void {
    this._questsService.quests$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(quests => {
      this.quests = quests.filter(quest => !quest.isOptional);
      this.optionnalQuests = quests.filter(quest => quest.isOptional);
    });
  }

  public setNav(newNav: string) {
    this.currentNav = newNav;
  }
}
