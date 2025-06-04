import { CaractKey } from '@src/models/character.model';

export interface StatProgress {
  currentXP: number;
  level: number;
  xpToNextLevel: number;
}

export interface Stats {
  currentXP: number;
  level: number;
  xpToNextLevel: number;
  caracts: Record<CaractKey, StatProgress>;
}
