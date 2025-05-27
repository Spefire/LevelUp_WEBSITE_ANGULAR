import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysOfWeek',
  standalone: true,
})
export class DaysOfWeekPipe implements PipeTransform {
  private readonly _days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  public transform(days: number[]): string {
    if (!days || days.length === 0) {
      return 'Aucun jour';
    }
    if (days.length === 7) {
      return 'Tous les jours';
    }
    return days.map(day => this._days[day]).join(', ');
  }
}
