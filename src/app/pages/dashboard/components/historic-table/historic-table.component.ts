import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { IconComponent } from '@lucca-front/ng/icon';
import { StatusBadgeComponent } from '@lucca-front/ng/statusBadge';

import { PaginationComponent } from '@src/components/pagination/pagination.component';
import { QuestRewardsComponent } from '@src/components/quest-rewards/quest-rewards.component';
import { Character } from '@src/models/character.model';
import { Log } from '@src/models/logs.model';
import { QuestDifficulty } from '@src/models/quests.model';
import { CharacterService } from '@src/services/character.service';
import { LogsService } from '@src/services/logs.service';

@Component({
  selector: 'historic-table',
  imports: [
    CommonModule,
    EmptyStateSectionComponent,
    ButtonComponent,
    IconComponent,
    StatusBadgeComponent,
    TitleCasePipe,
    DatePipe,
    PaginationComponent,
    QuestRewardsComponent,
  ],
  templateUrl: './historic-table.component.html',
  styles: ':host { display: contents }',
})
export class HistoricTableComponent implements OnInit {
  public QuestDifficulty = QuestDifficulty;

  public character: Character;
  public filteredLogs: Log[];
  public logs: Log[];
  public nbByPage = 10;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private _characterService: CharacterService,
    private _logsService: LogsService
  ) {}

  public ngOnInit() {
    this._characterService.character$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(character => {
      if (character) this.character = character;
    });

    this._logsService.logs$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(logs => {
      if (logs) {
        this.logs = logs;
        this.filteredLogs = this.logs.slice(0, Math.min(logs.length, this.nbByPage));
      }
    });
  }

  public changePagination(value: { min: number; max: number }) {
    this.filteredLogs = this.logs.slice(value.min, value.max);
  }
}
