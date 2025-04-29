import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
})
export class HeaderComponent implements OnInit {
  character: Character;
  pages = PageTitles;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(private _characterService: CharacterService) {}

  ngOnInit() {
    this._characterService.character$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(character => {
      this.character = character;
    });
  }
}
