import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { TagComponent } from '@lucca-front/ng/tag';

import { Quest, QuestDifficulty } from '@src/models/quests.model';

@Component({
  selector: 'quests-card',
  imports: [CommonModule, FormsModule, CheckboxInputComponent, TagComponent],
  templateUrl: './quests-card.component.html',
  styles: ':host { display: contents }',
})
export class QuestsCardComponent {
  readonly quest = input.required<Quest>();

  public QuestDifficulty = QuestDifficulty;
  public isChecked: boolean;

  toggleQuest() {
    this.isChecked = !this.isChecked;
  }
}
