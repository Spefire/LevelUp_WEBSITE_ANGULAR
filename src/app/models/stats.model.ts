export interface Stats {
  force: number;
  habilete: number;
  tenacite: number;
  charisme: number;
  intelligence: number;
}

export interface StatProgress {
  currentXP: number;
  level: number;
  xpToNextLevel: number;
}

export interface Character {
  currentXP: number;
  level: number;
  xpToNextLevel: number;
  stats: {
    [key in keyof Stats]: StatProgress;
  };
}
