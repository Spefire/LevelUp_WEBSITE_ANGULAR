import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Action, listActions } from '@src/components/daily-actions/actions';

import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-daily-actions',
  imports: [CommonModule],
  templateUrl: './daily-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyActionsComponent {
  listActions = listActions;

  constructor(private characterService: CharacterService) {}

  completeAction(action: Action): void {
    this.characterService.addXP(action.xpRewards);
  }
}
