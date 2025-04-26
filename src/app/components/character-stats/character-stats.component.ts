import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { Character, Stats } from '../../models/stats.model';

@Component({
  selector: 'app-character-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-stats.component.html',
  styleUrls: ['./character-stats.component.scss']
})
export class CharacterStatsComponent implements OnInit {
  character: Character;
  stats: Stats;

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.characterService.getCharacter().subscribe(character => {
      this.character = character;
      this.stats = character.stats;
    });
  }
} 