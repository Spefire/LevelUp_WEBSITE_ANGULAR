import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { TagComponent } from '@lucca-front/ng/tag';

import { Quest, QuestDifficulty } from '@src/models/quests.model';
import { QuestsService } from '@src/pages/quests/quests.service';

@Component({
  selector: 'quests-card',
  imports: [CommonModule, FormsModule, CheckboxInputComponent, TagComponent],
  templateUrl: './quests-card.component.html',
  styles: ':host { display: contents }',
})
export class QuestsCardComponent {
  readonly quest = input.required<Quest>();

  public QuestDifficulty = QuestDifficulty;
  public isChecked: boolean;

  private readonly _destroyRef = inject(DestroyRef);

  constructor(private _questsService: QuestsService) {}

  ngOnInit(): void {
    this._questsService.dailyQuestsSubject$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(dailyQuests => {
      this.isChecked = !!dailyQuests.find(dailyQuest => dailyQuest.id === this.quest().id);
    });
  }

  toggleQuest() {
    this.isChecked = !this.isChecked;
    this._questsService.toggleQuest(this.quest());
  }
}
