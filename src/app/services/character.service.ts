import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Character, Stats } from '../models/stats.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private characterSubject = new BehaviorSubject<Character>({
      currentXP: 0,
      level: 1,
      xpToNextLevel: 100,
      stats: {
        force: { currentXP: 0, level: 1, xpToNextLevel: 20 },
        habilete: { currentXP: 0, level: 1, xpToNextLevel: 20 },
        tenacite: { currentXP: 0, level: 1, xpToNextLevel: 20 },
        charisme: { currentXP: 0, level: 1, xpToNextLevel: 20 },
        intelligence: { currentXP: 0, level: 1, xpToNextLevel: 20 }
      }
  });

  constructor() {
    // Charger les données depuis le localStorage au démarrage
    const savedCharacter = localStorage.getItem('character');
    if (savedCharacter) {
      this.characterSubject.next(JSON.parse(savedCharacter));
    }
  }

  getCharacter(): Observable<Character> {
    return this.characterSubject.asObservable();
  }

  addXP(stats: Partial<Stats>): void {
    const currentCharacter = this.characterSubject.value;
    const newStats = { ...currentCharacter.stats };
    let totalXP = 0;

    // Mettre à jour les stats et leur progression
    Object.entries(stats).forEach(([stat, value]) => {
      if (value > 0) {
        newStats[stat as keyof Stats].currentXP += value;
        totalXP += value;

        // Mettre à jour la progression de la stat
        const statProgress = { ...currentCharacter.stats[stat as keyof Stats] };
        statProgress.currentXP += value;

        // Vérifier le level up de la stat
        if (statProgress.currentXP >= statProgress.xpToNextLevel) {
          statProgress.level += 1;
          statProgress.currentXP -= statProgress.xpToNextLevel;
          statProgress.xpToNextLevel = Math.floor(statProgress.xpToNextLevel * 1.5);
        }

        currentCharacter.stats[stat as keyof Stats] = statProgress;
      }
    });

    // Mettre à jour la progression globale
    currentCharacter.currentXP += totalXP;

    // Vérifier le level up global
    if (currentCharacter.currentXP >= currentCharacter.xpToNextLevel) {
      currentCharacter.level += 1;
      currentCharacter.currentXP -= currentCharacter.xpToNextLevel;
      currentCharacter.xpToNextLevel = Math.floor(currentCharacter.xpToNextLevel * 1.5);
    }

    const updatedCharacter: Character = {
      ...currentCharacter,
      stats: newStats,
    };


    this.characterSubject.next(updatedCharacter);
    localStorage.setItem('character', JSON.stringify(updatedCharacter));
  }
} 