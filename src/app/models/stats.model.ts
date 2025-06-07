import { TCaractKey } from '@src/models/caracts.model';

export interface IStatProgress {
  currentXP: number;
  level: number;
  xpToNextLevel: number;
}

export interface IStats {
  currentXP: number;
  level: number;
  xpToNextLevel: number;
  caracts: Record<TCaractKey, IStatProgress>;
}
