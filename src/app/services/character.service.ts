import { Injectable } from '@angular/core';

import { Character } from '@src/models/character.model';
import { IStats } from '@src/models/stats.model';
import { SupabaseService } from '@src/services/supabase.service';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private _characterSubject = new BehaviorSubject<Character>(null);
  private _statsSubject = new BehaviorSubject<IStats>({
    currentXP: 0,
    level: 1,
    xpToNextLevel: 100,
    caracts: {
      force: { currentXP: 0, level: 1, xpToNextLevel: 20 },
      habilete: { currentXP: 0, level: 1, xpToNextLevel: 20 },
      tenacite: { currentXP: 0, level: 1, xpToNextLevel: 20 },
      intelligence: { currentXP: 0, level: 1, xpToNextLevel: 20 },
      charisme: { currentXP: 0, level: 1, xpToNextLevel: 20 },
      magie: { currentXP: 0, level: 1, xpToNextLevel: 20 },
    },
  });

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public character$ = this._characterSubject.asObservable();
  public get character() {
    return this._characterSubject.value;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public stats$ = this._statsSubject.asObservable();
  public get stats() {
    return this._statsSubject.value;
  }

  constructor(private _supabaseService: SupabaseService) {}

  public async loadCharacter() {
    if (!this._characterSubject.value) {
      const character = await this._supabaseService.getCharacter();
      if (character) this._characterSubject.next(character);
    }
  }

  public async saveCharacter(newCharacter: Character) {
    const character = await this._supabaseService.putCharacter(newCharacter);
    if (character) {
      this._characterSubject.next(character);
      return true;
    } else return false;
  }
}
