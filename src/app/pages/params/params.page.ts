import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutComponent } from '@lucca-front/ng/callout';
import { LuDialogService } from '@lucca-front/ng/dialog';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';

import { ConfirmDialogComponent } from '@src/components/confirm-dialog/confirm-dialog.component';
import { Character, getAvatarURL } from '@src/models/character.model';
import { Log } from '@src/models/logs.model';
import { PageTitles } from '@src/models/pages.model';
import { Quest } from '@src/models/quests.model';
import { ParamsCharacterDialogComponent } from '@src/pages/params/params-character-dialog/params-character-dialog.component';
import { CharacterService } from '@src/services/character.service';
import { LogsService } from '@src/services/logs.service';
import { QuestsService } from '@src/services/quests.service';

@Component({
  selector: 'params-page',
  imports: [CommonModule, PageHeaderComponent, CalloutComponent, ButtonComponent],
  templateUrl: './params.page.html',
  providers: [LuDialogService],
})
export class ParamsPage implements OnInit {
  public pages = PageTitles;

  public avatarURL: string;
  public character: Character;
  public logs: Log[];
  public dailyQuests: Quest[];

  private readonly _destroyRef = inject(DestroyRef);

  #dialog = inject(LuDialogService);

  constructor(
    private _characterService: CharacterService,
    private _logsService: LogsService,
    private _questsService: QuestsService
  ) {}

  public ngOnInit(): void {
    this._characterService.character$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(character => {
      this.character = character;
      if (character) this.avatarURL = getAvatarURL(this.character.avatar);
    });

    this._logsService.logs$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(logs => {
      this.logs = logs;
    });

    this._questsService.dailyQuests$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(dailyQuests => {
      this.dailyQuests = dailyQuests;
    });
  }

  public modifyCharacter() {
    this.#dialog.open({
      content: ParamsCharacterDialogComponent,
      data: { character: this.character },
      panelClasses: ['mod-neutralBackground'],
      size: 'L',
    });
  }

  public resetDailyQuests() {
    const dialogRef = this.#dialog.open({
      content: ConfirmDialogComponent,
      data: {},
      size: 'S',
    });

    dialogRef.result$.subscribe(res => {
      if (res) localStorage.removeItem('dailyQuests');
    });
  }

  public resetLogs() {
    const dialogRef = this.#dialog.open({
      content: ConfirmDialogComponent,
      data: {},
      size: 'S',
    });

    dialogRef.result$.subscribe(res => {
      if (res) localStorage.removeItem('logs');
    });
  }

  public cleanAll() {
    const dialogRef = this.#dialog.open({
      content: ConfirmDialogComponent,
      data: {},
      size: 'S',
    });

    dialogRef.result$.subscribe(res => {
      if (res) {
        localStorage.clear();
        window.location.reload();
      }
    });
  }
}
