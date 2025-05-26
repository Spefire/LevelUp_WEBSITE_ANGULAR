import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';

import { Quest, QuestCategory, QuestsFilters } from '@src/models/quests.model';
import { QuestsService } from '@src/services/quests.service';

@Component({
  selector: 'quests-filters',
  imports: [
    CommonModule,
    FormsModule,
    FormFieldComponent,
    CheckboxInputComponent,
    TextInputComponent,
    FilterBarComponent,
    FilterPillAddonAfterDirective,
    FilterPillAddonBeforeDirective,
    FilterPillComponent,
  ],
  templateUrl: './quests-filters.component.html',
})
export class QuestsFiltersComponent implements OnInit {
  public categories = [null, ...Object.values(QuestCategory)];
  public quests: Quest[];
  public filters: QuestsFilters;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(private _questsService: QuestsService) {}

  public ngOnInit(): void {
    this._questsService.quests$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(quests => {
      this.quests = quests;
    });

    this._questsService.filters$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(filters => {
      this.filters = filters;
    });
  }

  public changeCategory(category: string) {
    const newFilters = { ...this.filters, category };
    this._questsService.setFilters(newFilters);
  }

  public changeOnlySelected(onlySelected: boolean) {
    const newFilters = { ...this.filters, onlySelected };
    this._questsService.setFilters(newFilters);
  }

  public changeSearch(search: string) {
    const newFilters = { ...this.filters, search };
    this._questsService.setFilters(newFilters);
  }

  public getQuestsByCategory(category: string) {
    if (!category) return this.quests;
    return this.quests.filter(quest => quest.category === category);
  }
}
