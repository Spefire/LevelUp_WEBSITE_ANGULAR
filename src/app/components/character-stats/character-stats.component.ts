import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../models/stats.model';

@Component({
  selector: 'app-character-stats',
  imports: [CommonModule],
  templateUrl: './character-stats.component.html',
  styleUrls: ['./character-stats.component.scss'],
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