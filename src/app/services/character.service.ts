import { Injectable } from '@angular/core';

import { Character, Stats } from '@src/models/character.model';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private _characterSubject = new BehaviorSubject<Character>({
    avatar: 'https://www.arlenor.com/assets/images_filled/characters/alehar.png',
    name: 'Spefire',
    gender: 'Homme',
    age: 30,
  });
  private _statsSubject = new BehaviorSubject<Stats>({
    currentXP: 0,
    level: 1,
    xpToNextLevel: 100,
    caracts: {
      force: { currentXP: 0, level: 1, xpToNextLevel: 20 },
      habilete: { currentXP: 0, level: 1, xpToNextLevel: 20 },
      tenacite: { currentXP: 0, level: 1, xpToNextLevel: 20 },
      charisme: { currentXP: 0, level: 1, xpToNextLevel: 20 },
      intelligence: { currentXP: 0, level: 1, xpToNextLevel: 20 },
    },
  });

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public character$ = this._characterSubject.asObservable();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public stats$ = this._statsSubject.asObservable();

  constructor() {
    // Charger les données depuis le localStorage au démarrage
    const character = localStorage.getItem('character');
    if (character) this._characterSubject.next(JSON.parse(character));
  }

  /* private _addXP(stats: Partial<Stats>): void {
    const currentCharacter = this.characterSubject.value;
    const newStats = { ...currentCharacter.stats };
    let totalXP = 0;

    // Mettre à jour les stats et leur progression
    Object.entries(stats).forEach(([stat, value]) => {
      if (value > 0) {
        // Mettre à jour la progression de la stat
        const statProgress = { ...currentCharacter.stats[stat as keyof Stats] };
        statProgress.currentXP += value;
        totalXP += value;

        // Vérifier le level up de la stat
        while (statProgress.currentXP >= statProgress.xpToNextLevel) {
          statProgress.level += 1;
          statProgress.currentXP -= statProgress.xpToNextLevel;
          statProgress.xpToNextLevel = Math.floor(statProgress.xpToNextLevel * 1.5);
        }

        newStats[stat as keyof Stats] = statProgress;
      }
    });

    // Mettre à jour la progression globale
    const newCharacter = { ...currentCharacter };
    newCharacter.currentXP += totalXP;

    // Vérifier le level up global
    while (newCharacter.currentXP >= newCharacter.xpToNextLevel) {
      newCharacter.level += 1;
      newCharacter.currentXP -= newCharacter.xpToNextLevel;
      newCharacter.xpToNextLevel = Math.floor(newCharacter.xpToNextLevel * 1.5);
    }

    // Mettre à jour le personnage
    newCharacter.stats = newStats;

    this.characterSubject.next(newCharacter);
    localStorage.setItem('character', JSON.stringify(newCharacter));
  }*/
}
