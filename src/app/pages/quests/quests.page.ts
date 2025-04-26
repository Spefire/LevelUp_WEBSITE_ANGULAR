import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';

import { Action, listActions } from '@src/models/actions.model';
import { CharacterService } from '@src/services/character.service';

@Component({
  selector: 'quests-page',
  imports: [CommonModule, PageHeaderComponent, ButtonComponent, IconComponent],
  templateUrl: './quests.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestsPage {
  listActions = listActions;

  constructor(private characterService: CharacterService) {}

  completeAction(action: Action): void {
    this.characterService.addXP(action.xpRewards);
  }
}
