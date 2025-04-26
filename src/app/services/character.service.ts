import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Character, Stats } from '../models/stats.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private characterSubject = new BehaviorSubject<Character>({
    stats: {
      force: 1,
      habilete: 1,
      tenacite: 1,
      charisme: 1,
      intelligence: 1
    },
    progress: {
      currentXP: 0,
      level: 1,
      xpToNextLevel: 100
    },
    weeklyProgress: {},
    monthlyBosses: []
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

    // Mettre à jour les stats
    Object.entries(stats).forEach(([stat, value]) => {
      if (value > 0) {
        newStats[stat as keyof Stats] += value;
        totalXP += value;
      }
    });

    // Mettre à jour la progression
    const newProgress = { ...currentCharacter.progress };
    newProgress.currentXP += totalXP;

    // Vérifier le level up
    if (newProgress.currentXP >= newProgress.xpToNextLevel) {
      newProgress.level += 1;
      newProgress.currentXP -= newProgress.xpToNextLevel;
      newProgress.xpToNextLevel = Math.floor(newProgress.xpToNextLevel * 1.5);
    }

    // Mettre à jour la progression hebdomadaire
    const today = new Date().toISOString().split('T')[0];
    const newWeeklyProgress = { ...currentCharacter.weeklyProgress };
    newWeeklyProgress[today] = (newWeeklyProgress[today] || 0) + totalXP;

    const updatedCharacter: Character = {
      ...currentCharacter,
      stats: newStats,
      progress: newProgress,
      weeklyProgress: newWeeklyProgress
    };

    this.characterSubject.next(updatedCharacter);
    localStorage.setItem('character', JSON.stringify(updatedCharacter));
  }

  completeMonthlyBoss(bossId: string): void {
    const currentCharacter = this.characterSubject.value;
    const updatedBosses = currentCharacter.monthlyBosses.map(boss => 
      boss.id === bossId ? { ...boss, completed: true } : boss
    );

    const updatedCharacter: Character = {
      ...currentCharacter,
      monthlyBosses: updatedBosses
    };

    this.characterSubject.next(updatedCharacter);
    localStorage.setItem('character', JSON.stringify(updatedCharacter));
  }
} 