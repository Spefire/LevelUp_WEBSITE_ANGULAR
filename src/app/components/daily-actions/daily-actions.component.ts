import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { Action, listActions } from '@src/components/daily-actions/actions';

@Component({
  selector: 'app-daily-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-actions.component.html',
  styleUrls: ['./daily-actions.component.scss']
})
export class DailyActionsComponent {
  listActions = listActions;

  constructor(private characterService: CharacterService) {}

  completeAction(action: Action): void {
    this.characterService.addXP(action.xpRewards);
  }
} 