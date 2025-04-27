import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { TagComponent } from '@lucca-front/ng/tag';

import { Quest, QuestDifficulty } from '@src/models/quests.model';
import { CharacterService } from '@src/services/character.service';

@Component({
  selector: 'quests-card',
  imports: [CommonModule, TagComponent],
  templateUrl: './quests-card.component.html',
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class QuestsCardComponent {
  readonly quest = input.required<Quest>();

  public QuestDifficulty = QuestDifficulty;

  constructor(private _characterService: CharacterService) {}

  completeQuest() {
    this._characterService.addXP(this.quest().xpRewards);
  }
}
