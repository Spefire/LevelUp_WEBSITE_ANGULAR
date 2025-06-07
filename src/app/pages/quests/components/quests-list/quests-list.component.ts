import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { IconComponent } from '@lucca-front/ng/icon';
import { StatusBadgeComponent } from '@lucca-front/ng/statusBadge';

import { DailyQuest } from '@src/models/daily-quests.model';
import { Quest, QuestCategory, QuestDifficulty, QuestsFilters } from '@src/models/quests.model';
import { QuestsCardComponent } from '@src/pages/quests/components/quests-card/quests-card.component';
import { DailyQuestsService } from '@src/services/daily-quests.service';
import { QuestsService } from '@src/services/quests.service';

@Component({
  selector: 'quests-list',
  imports: [CommonModule, EmptyStateSectionComponent, QuestsCardComponent, StatusBadgeComponent, ButtonComponent, IconComponent],
  templateUrl: './quests-list.component.html',
})
export class QuestsListComponent implements OnInit {
  public readonly quests = input.required<Quest[]>();

  public QuestDifficulty = QuestDifficulty;
  public categories = [null, ...Object.values(QuestCategory)];
  public dailyQuests: DailyQuest[];
  public filters: QuestsFilters;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(
    private _dailyQuestsService: DailyQuestsService,
    private _questsService: QuestsService
  ) {}

  public ngOnInit(): void {
    this._dailyQuestsService.dailyQuests$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(dailyQuests => {
      if (dailyQuests) this.dailyQuests = dailyQuests;
    });

    this._questsService.filters$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(filters => {
      if (filters) this.filters = filters;
    });
  }

  public getQuestsByFilters() {
    if (!this.quests()) return [];
    if (!this.filters) return this.quests();
    let quests = this.quests();
    quests = quests.filter(quest => !this.filters.category || (this.filters.category && quest.category === this.filters.category));
    quests = quests.filter(quest => !this.filters.search || normalize(quest.name).includes(normalize(this.filters.search)));
    quests = quests.filter(
      quest => !this.filters.onlySelected || (this.filters.onlySelected && this.dailyQuests.find(dailyQuest => dailyQuest.id === quest.id))
    );
    return quests;
  }

  public getQuestsByDifficulty(quests: Quest[], difficulty: string) {
    const result = quests.filter(quest => quest.difficulty === difficulty);
    return result.length ? result : null;
  }
}

const normalize = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
