import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonComponent } from '@lucca-front/ng/button';
import { LuDialogService } from '@lucca-front/ng/dialog';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { IconComponent } from '@lucca-front/ng/icon';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';

import { Character } from '@src/models/character.model';
import { Daily } from '@src/models/dailys.model';
import { PageTitles } from '@src/models/pages.model';
import { Quest } from '@src/models/quests.model';
import { QuestDialogComponent } from '@src/pages/quests/components/quest-dialog/quest-dialog.component';
import { QuestsFiltersComponent } from '@src/pages/quests/components/quests-filters/quests-filters.component';
import { QuestsListComponent } from '@src/pages/quests/components/quests-list/quests-list.component';
import { CharacterService } from '@src/services/character.service';
import { DailysService } from '@src/services/dailys.service';
import { QuestsService } from '@src/services/quests.service';

@Component({
  selector: 'quests-page',
  imports: [
    CommonModule,
    PageHeaderComponent,
    HorizontalNavigationComponent,
    HorizontalNavigationLinkDirective,
    QuestsFiltersComponent,
    QuestsListComponent,
    ButtonComponent,
    NumericBadgeComponent,
    IconComponent,
  ],
  templateUrl: './quests.page.html',
  providers: [LuDialogService],
})
export class QuestsPage implements OnInit {
  public pages = PageTitles;

  public currentNav = 'toselect';
  public character: Character;
  public quests: Quest[];
  public dailys: Daily[];
  public toSelectQuests: Quest[];
  public selectedQuests: Quest[];

  private readonly _destroyRef = inject(DestroyRef);

  #dialog = inject(LuDialogService);

  constructor(
    private _characterService: CharacterService,
    private _dailysService: DailysService,
    private _questsService: QuestsService
  ) {}

  public ngOnInit(): void {
    this._dailysService.loadDailys(true);
    this._questsService.loadQuests(true);

    this._characterService.character$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(character => {
      if (character) this.character = character;
    });

    this._dailysService.dailys$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(dailys => {
      if (dailys) {
        this.dailys = dailys;
        this._updateQuests();
      }
    });

    this._questsService.quests$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(quests => {
      if (quests) {
        this.quests = quests;
        this._updateQuests();
      }
    });
  }

  public setNav(newNav: string) {
    this.currentNav = newNav;
  }

  public addQuest() {
    this.#dialog.open({
      content: QuestDialogComponent,
      data: null,
      panelClasses: ['mod-neutralBackground'],
      size: 'L',
    });
  }

  private _updateQuests() {
    if (!this.quests || !this.dailys) return;
    const idsSelected = this.dailys.map(daily => daily.quest.id);
    this.toSelectQuests = this.quests.filter(quest => !idsSelected.includes(quest.id));
    this.selectedQuests = this.quests.filter(quest => idsSelected.includes(quest.id));
  }
}
