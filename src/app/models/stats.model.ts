export interface Stats {
  force: number;
  habilete: number;
  tenacite: number;
  charisme: number;
  intelligence: number;
}

export interface StatsProgress {
  currentXP: number;
  level: number;
  xpToNextLevel: number;
}

export interface Character {
  stats: Stats;
  progress: StatsProgress;
  weeklyProgress: {
    [key: string]: number; // XP gagnée par jour
  };
  monthlyBosses: {
    id: string;
    name: string;
    requiredStats: Stats;
    completed: boolean;
  }[];
} 