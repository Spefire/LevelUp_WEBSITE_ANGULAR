import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';

import { NotchComponent } from '@src/components/notch/notch.component';
import { Caracteristics, CaractKeys, Character } from '@src/models/character.model';
import { Log } from '@src/models/logs.model';
import { PageTitles } from '@src/models/pages.model';
import { QuestDifficulty } from '@src/models/quests.model';
import { Stats } from '@src/models/stats.model';
import { CharacterService } from '@src/services/character.service';
import { LogsService } from '@src/services/logs.service';

@Component({
  selector: 'character-page',
  imports: [CommonModule, PageHeaderComponent, FancyBoxComponent, NotchComponent],
  templateUrl: './character.page.html',
})
export class CharacterPage implements OnInit {
  public pages = PageTitles;

  public CaractKeys = CaractKeys;
  public Caracteristics = Caracteristics;
  public QuestDifficulty = QuestDifficulty;
  public character: Character;
  public stats: Stats;
  public logs: Log[];

  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private _characterService: CharacterService,
    private _logsService: LogsService
  ) {}

  public ngOnInit() {
    this._characterService.character$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(character => {
      if (character) {
        this.character = character;
        this._updateStats();
      }
    });

    this._characterService.stats$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(stats => {
      if (stats) {
        this.stats = stats;
        this._updateStats();
      }
    });

    this._logsService.logs$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(logs => {
      if (logs) {
        this.logs = logs;
        this._updateStats();
      }
    });
  }

  private _updateStats() {
    if (!this.logs) return;
    this.logs.forEach(log => {
      const xp = log.quest.xpRewards;
      let difficulty = 0;
      if (this.QuestDifficulty.SIMPLE === log.quest.difficulty) difficulty = 1;
      if (this.QuestDifficulty.STANDARD === log.quest.difficulty) difficulty = 2;
      if (this.QuestDifficulty.COMPLEXE === log.quest.difficulty) difficulty = 3;
      this.stats.caracts.force.currentXP += xp.force ? xp.force * difficulty : 0;
      this.stats.caracts.habilete.currentXP += xp.habilete ? xp.habilete * difficulty : 0;
      this.stats.caracts.tenacite.currentXP += xp.tenacite ? xp.tenacite * difficulty : 0;
      this.stats.caracts.intelligence.currentXP += xp.intelligence ? xp.intelligence * difficulty : 0;
      this.stats.caracts.charisme.currentXP += xp.charisme ? xp.charisme * difficulty : 0;
      this.stats.caracts.magie.currentXP += xp.magie ? xp.magie * difficulty : 0;
    });
  }
}
