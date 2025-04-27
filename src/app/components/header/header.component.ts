import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from '@lucca-front/ng/button';
import { LuDropdownItemDirective, LuDropdownPanelComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';

import { Character } from '@src/models/character.model';
import { PageTitles } from '@src/models/pages.model';
import { CharacterService } from '@src/services/character.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, LuDropdownTriggerDirective, LuDropdownPanelComponent, LuDropdownItemDirective, ButtonComponent, IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  character: Character;
  pages = PageTitles;

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.characterService.getCharacter().subscribe(character => {
      this.character = character;
    });
  }
}
