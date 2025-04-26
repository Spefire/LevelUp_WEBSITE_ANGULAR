import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Character } from '../../models/stats.model';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-stats',
  imports: [CommonModule],
  templateUrl: './character-stats.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterStatsComponent implements OnInit {
  character: Character;

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.characterService.getCharacter().subscribe(character => {
      this.character = character;
    });
  }
}
