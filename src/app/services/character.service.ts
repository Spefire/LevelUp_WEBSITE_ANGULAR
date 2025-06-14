import { Injectable } from '@angular/core';

import { Character, ICharacter } from '@src/models/character.model';
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
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public stats$ = this._statsSubject.asObservable();

  constructor(private _supabaseService: SupabaseService) {
    this._load();
  }

  public async loadCharacter(forced = false) {
    if (!this._characterSubject.value || forced) {
      const character = await this._supabaseService.getCharacter();
      if (character) this._save(character);
    }
  }

  public async saveCharacter(newCharacter: Character) {
    const character = await this._supabaseService.putCharacter(newCharacter);
    if (character) {
      this._save(character);
      return true;
    } else return false;
  }

  private _load() {
    const storage = localStorage.getItem('character');
    if (storage) {
      const result: ICharacter = JSON.parse(storage);
      const character = Character.getCharacter(result);
      this._characterSubject.next(character);
    }
  }

  private _save(character: Character) {
    this._characterSubject.next(character);
    const storage = Character.getICharacter(null, character);
    localStorage.setItem('character', JSON.stringify(storage));
  }
}
