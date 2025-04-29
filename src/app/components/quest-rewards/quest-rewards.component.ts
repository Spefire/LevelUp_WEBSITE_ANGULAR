import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { DecorativePalette, Palette } from '@lucca-front/ng/core';
import { TagComponent } from '@lucca-front/ng/tag';

import { Quest } from '@src/models/quests.model';

@Component({
  selector: 'quest-rewards',
  imports: [CommonModule, TagComponent],
  templateUrl: './quest-rewards.component.html',
  styles: ':host { display: contents }',
})
export class QuestRewardsComponent {
  readonly quest = input.required<Quest>();
  readonly forced = input<Palette | DecorativePalette | null>();
}
