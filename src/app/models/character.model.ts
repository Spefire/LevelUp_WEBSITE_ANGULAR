import { StatProgress, Stats } from '@src/models/stats.model';

export interface Character {
  avatar: string;
  name: string;
  gender: string;
  age: number;
  currentXP: number;
  level: number;
  xpToNextLevel: number;
  stats: {
    [key in keyof Stats]: StatProgress;
  };
}
