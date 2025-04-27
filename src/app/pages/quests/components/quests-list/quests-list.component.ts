import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { IconComponent } from '@lucca-front/ng/icon';
import { StatusBadgeComponent } from '@lucca-front/ng/statusBadge';

import { Quest, QuestCategory, QuestDifficulty } from '@src/models/quests.model';
import { QuestsCardComponent } from '@src/pages/quests/components/quests-card/quests-card.component';
import { QuestsService } from '@src/pages/quests/quests.service';

@Component({
  selector: 'quests-list',
  imports: [CommonModule, EmptyStateSectionComponent, QuestsCardComponent, StatusBadgeComponent, ButtonComponent, IconComponent],
  templateUrl: './quests-list.component.html',
})
export class QuestsListComponent {
  public QuestDifficulty = QuestDifficulty;
  public categories = [null, ...Object.values(QuestCategory)];
  public quests: Quest[];
  public filter: string;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(private _questsService: QuestsService) {}

  ngOnInit(): void {
    this._questsService.quests$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(quests => {
      this.quests = quests;
    });

    this._questsService.filter$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(filter => {
      this.filter = filter;
    });
  }

  getQuestsByFilter() {
    if (!this.filter) return this.quests;
    return this.quests.filter(quest => quest.category === this.filter);
  }

  getQuestsByDifficulty(quests: Quest[], difficulty: string) {
    const result = quests.filter(quest => quest.difficulty === difficulty);
    return result.length ? result : null;
  }
}
