import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutComponent } from '@lucca-front/ng/callout';
import { LuDialogService } from '@lucca-front/ng/dialog';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';

import { ConfirmDialogComponent } from '@src/components/confirm-dialog/confirm-dialog.component';
import { Character, getAvatarURL } from '@src/models/character.model';
import { Daily } from '@src/models/dailys.model';
import { Log } from '@src/models/logs.model';
import { PageTitles } from '@src/models/pages.model';
import { Quest } from '@src/models/quests.model';
import { ParamsCharacterDialogComponent } from '@src/pages/params/params-character-dialog/params-character-dialog.component';
import { CharacterService } from '@src/services/character.service';
import { DailysService } from '@src/services/dailys.service';
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
  public dailys: Daily[];
  public quests: Quest[];

  private readonly _destroyRef = inject(DestroyRef);

  #dialog = inject(LuDialogService);

  constructor(
    private _characterService: CharacterService,
    private _logsService: LogsService,
    private _dailysService: DailysService,
    private _questsService: QuestsService
  ) {}

  public ngOnInit(): void {
    this._characterService.character$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(character => {
      if (character) {
        this.character = character;
        this.avatarURL = getAvatarURL(this.character.avatar);
      }
    });

    this._logsService.logs$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(logs => {
      if (logs) this.logs = logs;
    });

    this._dailysService.dailys$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(dailys => {
      if (dailys) this.dailys = dailys;
    });

    this._questsService.quests$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(quests => {
      if (quests) this.quests = quests;
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

  public resetDailys() {
    const dialogRef = this.#dialog.open({
      content: ConfirmDialogComponent,
      data: {},
      size: 'S',
    });

    dialogRef.result$.subscribe(res => {
      if (res) localStorage.removeItem('dailys');
    });
  }

  public resetQuests() {
    const dialogRef = this.#dialog.open({
      content: ConfirmDialogComponent,
      data: {},
      size: 'S',
    });

    dialogRef.result$.subscribe(res => {
      if (res) localStorage.removeItem('quests');
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
