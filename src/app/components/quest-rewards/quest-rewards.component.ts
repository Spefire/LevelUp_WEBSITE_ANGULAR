import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { DecorativePalette, Palette } from '@lucca-front/ng/core';
import { TagComponent } from '@lucca-front/ng/tag';

import { Caracteristics, CaractKey } from '@src/models/character.model';
import { Quest } from '@src/models/quests.model';

@Component({
  selector: 'quest-rewards',
  imports: [CommonModule, TagComponent],
  templateUrl: './quest-rewards.component.html',
  styles: ':host { display: contents }',
})
export class QuestRewardsComponent {
  public readonly quest = input.required<Quest>();
  public readonly forced = input<Palette | DecorativePalette | null>();

  public Caracteristics = Caracteristics;

  public getCaractKey(key: string): CaractKey {
    return key as CaractKey;
  }
}
