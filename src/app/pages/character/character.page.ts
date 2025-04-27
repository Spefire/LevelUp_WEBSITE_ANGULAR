import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { PageHeaderComponent } from '@lucca-front/ng/page-header';

import { Character } from '@src/models/character.model';
import { PageTitles } from '@src/models/pages.model';
import { CharacterService } from '@src/pages/character/character.service';

@Component({
  selector: 'character-page',
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './character.page.html',
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
