import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { ButtonComponent } from '@lucca-front/ng/button';
import { TagComponent } from '@lucca-front/ng/tag';

import { Quest } from '@src/models/quests.model';
import { CharacterService } from '@src/pages/character/character.service';
import { DaysOfWeekPipe } from '@src/pipes/days-of-week.pipe';

@Component({
  selector: 'daily-card',
  imports: [CommonModule, ButtonComponent, TagComponent, DaysOfWeekPipe],
  templateUrl: './daily-card.component.html',
  styles: ':host { display: contents }',
})
export class DailyCardComponent {
  readonly quest = input.required<Quest>();
  readonly readonly = input.required<boolean>();

  public isCompleted = false;

  constructor(private _characterService: CharacterService) {}

  completeQuest() {
    this.isCompleted = true;
    this._characterService.addXP(this.quest().xpRewards);
  }
}
