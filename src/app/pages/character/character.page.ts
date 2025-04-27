import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { PageHeaderComponent } from '@lucca-front/ng/page-header';

import { Character } from '@src/models/character.model';
import { PageTitles } from '@src/models/pages.model';
import { CharacterService } from '@src/services/character.service';

@Component({
  selector: 'character-page',
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './character.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterPage implements OnInit {
  character: Character;
  pages = PageTitles;

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.characterService.getCharacter().subscribe(character => {
      this.character = character;
    });
  }
}
