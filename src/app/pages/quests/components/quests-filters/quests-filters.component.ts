import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Quest, QuestCategory } from '@src/models/quests.model';
import { QuestsService } from '@src/pages/quests/quests.service';

@Component({
  selector: 'quests-filters',
  imports: [CommonModule],
  templateUrl: './quests-filters.component.html',
})
export class QuestsFiltersComponent {
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

  changeFilter(newFilter: string) {
    this._questsService.setFilter(newFilter);
  }

  getQuestsByFilter(newFilter: string) {
    if (!newFilter) return this.quests;
    return this.quests.filter(quest => quest.category === newFilter);
  }
}
