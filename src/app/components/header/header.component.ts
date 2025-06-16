import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from '@lucca-front/ng/button';
import { LuDropdownItemDirective, LuDropdownPanelComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';

import { AvatarComponent } from '@src/components/avatar/avatar.component';
import { Character } from '@src/models/character.model';
import { PageTitles } from '@src/models/pages.model';
import { AppService } from '@src/services/app.service';
import { CharacterService } from '@src/services/character.service';
import { SupabaseService } from '@src/services/supabase.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    LuDropdownTriggerDirective,
    LuDropdownPanelComponent,
    LuDropdownItemDirective,
    AvatarComponent,
    ButtonComponent,
    IconComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public pages = PageTitles;

  public avatarURL: string;
  public character: Character;
  public isConnected: boolean;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private _appService: AppService,
    private _characterService: CharacterService,
    private _supabaseService: SupabaseService
  ) {}

  public ngOnInit() {
    this._characterService.character$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(character => {
      if (character) this.character = character;
    });
    this._supabaseService.session$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(session => {
      this.isConnected = session ? true : false;
      if (this.isConnected) this._appService.loadAll();
    });
  }

  public logout() {
    this._supabaseService.logout();
  }
}
