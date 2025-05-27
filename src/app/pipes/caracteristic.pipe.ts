import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'caracteristic',
  standalone: true,
})
export class CaracteristicPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly _caracts: any = {
    force: 'Force',
    habilete: 'Habileté',
    tenacite: 'Ténacité',
    charisme: 'Charisme',
    intelligence: 'Intelligence',
  };

  public transform(key: string): string {
    return this._caracts[key];
  }
}
