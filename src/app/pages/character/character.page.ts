import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';

import { Character, Stats } from '@src/models/character.model';
import { PageTitles } from '@src/models/pages.model';
import { CharacterService } from '@src/services/character.service';

@Component({
  selector: 'character-page',
  imports: [CommonModule, PageHeaderComponent, FancyBoxComponent],
  templateUrl: './character.page.html',
})
export class CharacterPage implements OnInit {
  public pages = PageTitles;
  public character: Character;
  public stats: Stats;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(private _characterService: CharacterService) {}

  public ngOnInit() {
    this._characterService.character$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(character => {
      this.character = character;
    });

    this._characterService.stats$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(stats => {
      this.stats = stats;
    });
  }
}
