export interface Character {
  avatar: string;
  name: string;
  gender: string;
  age: number;
}

export interface Caracts {
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

export interface Stats {
  currentXP: number;
  level: number;
  xpToNextLevel: number;
  caracts: {
    [key in keyof Caracts]: StatProgress;
  };
}
