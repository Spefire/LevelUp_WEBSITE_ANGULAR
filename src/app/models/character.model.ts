import { StatProgress, Stats } from '@src/models/stats.model';

export interface Character {
  currentXP: number;
  level: number;
  xpToNextLevel: number;
  stats: {
    [key in keyof Stats]: StatProgress;
  };
}
