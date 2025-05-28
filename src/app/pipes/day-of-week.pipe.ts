import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayOfWeek',
  standalone: true,
})
export class DayOfWeekPipe implements PipeTransform {
  private static readonly _days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  public static transformDay(day: number): string {
    return this._days[day];
  }

  public transform(date: Date): string {
    return DayOfWeekPipe._days[date.getDay()];
  }
}
