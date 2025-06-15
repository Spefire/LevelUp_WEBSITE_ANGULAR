import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { IconComponent } from '@lucca-front/ng/icon';
import { StatusBadgeComponent } from '@lucca-front/ng/statusBadge';

import { Daily } from '@src/models/dailys.model';
import { IQuestsFilters, Quest, QuestCategory, QuestDifficulty } from '@src/models/quests.model';
import { QuestCardComponent } from '@src/pages/quests/components/quest-card/quest-card.component';
import { QuestsService } from '@src/services/quests.service';

@Component({
  selector: 'quests-list',
  imports: [CommonModule, EmptyStateSectionComponent, QuestCardComponent, StatusBadgeComponent, ButtonComponent, IconComponent],
  templateUrl: './quests-list.component.html',
})
export class QuestsListComponent implements OnInit {
  public readonly isDaily = input.required<boolean>();
  public readonly dailys = input<Daily[]>();
  public readonly quests = input<Quest[]>();

  public QuestDifficulty = QuestDifficulty;
  public categories = [null, ...Object.values(QuestCategory)];
  public filters: IQuestsFilters;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(private _questsService: QuestsService) {}

  public ngOnInit(): void {
    this._questsService.filters$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(filters => {
      if (filters) this.filters = filters;
    });
  }

  public getByFilters(): Quest[] {
    if (this.isDaily()) {
      if (!this.dailys()) return [];
      if (!this.filters) return this.dailys().map(daily => daily.quest);
      let dailys = this.dailys();
      dailys = dailys.filter(daily => !this.filters.category || (this.filters.category && daily.quest.category === this.filters.category));
      dailys = dailys.filter(daily => !this.filters.search || normalize(daily.quest.name).includes(normalize(this.filters.search)));
      dailys = dailys.filter(daily => !this.filters.isMandatory || (this.filters.isMandatory && daily.isMandatory));
      return dailys.map(daily => daily.quest);
    } else {
      if (!this.quests()) return [];
      if (!this.filters) return this.quests();
      let quests = this.quests();
      quests = quests.filter(quest => !this.filters.category || (this.filters.category && quest.category === this.filters.category));
      quests = quests.filter(quest => !this.filters.search || normalize(quest.name).includes(normalize(this.filters.search)));
      return quests;
    }
  }

  public getByDifficulty(quests: Quest[], difficulty: string) {
    const result = quests.filter(quest => quest.difficulty === difficulty);
    return result.length ? result : null;
  }
}

const normalize = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
