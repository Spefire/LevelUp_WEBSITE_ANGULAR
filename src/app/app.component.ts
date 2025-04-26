import { Component } from '@angular/core';
import { CharacterStatsComponent } from './components/character-stats/character-stats.component';
import { DailyActionsComponent } from './components/daily-actions/daily-actions.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CharacterStatsComponent, DailyActionsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Next Level Up';
}
