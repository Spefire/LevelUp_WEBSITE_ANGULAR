import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonComponent } from '@lucca-front/ng/button';
import { LuDialogService } from '@lucca-front/ng/dialog';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { IconComponent } from '@lucca-front/ng/icon';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';

import { Character } from '@src/models/character.model';
import { PageTitles } from '@src/models/pages.model';
import { Quest } from '@src/models/quests.model';
import { QuestDialogComponent } from '@src/pages/quests/components/quest-dialog/quest-dialog.component';
import { QuestsFiltersComponent } from '@src/pages/quests/components/quests-filters/quests-filters.component';
import { QuestsListComponent } from '@src/pages/quests/components/quests-list/quests-list.component';
import { CharacterService } from '@src/services/character.service';
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
    IconComponent,
  ],
  templateUrl: './quests.page.html',
  providers: [LuDialogService],
})
export class QuestsPage implements OnInit {
  public pages = PageTitles;

  public currentNav = 'obligatoires';
  public character: Character;
  public quests: Quest[];
  public optionnalQuests: Quest[];

  private readonly _destroyRef = inject(DestroyRef);

  #dialog = inject(LuDialogService);

  constructor(
    private _characterService: CharacterService,
    private _questsService: QuestsService
  ) {}

  public ngOnInit(): void {
    this._questsService.loadQuests(true);

    this._characterService.character$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(character => {
      if (character) this.character = character;
    });

    this._questsService.quests$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(quests => {
      if (quests) {
        this.quests = quests.filter(quest => !quest.isOptional);
        this.optionnalQuests = quests.filter(quest => quest.isOptional);
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
}
