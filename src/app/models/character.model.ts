import { DecorativePalette, Palette } from '@lucca-front/ng/core';

export type CaractKey = 'force' | 'habilete' | 'tenacite' | 'intelligence' | 'charisme' | 'magie';
export const CaractKeys: CaractKey[] = ['force', 'habilete', 'tenacite', 'intelligence', 'charisme', 'magie'];

export interface Character {
  avatar: string;
  name: string;
  gender: string;
  age: number;
}

export interface Caract {
  libelle: string;
  code: string;
  description: string;
  color: Palette | DecorativePalette;
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
  caracts: Record<CaractKey, StatProgress>;
}

export const Caracteristics: Record<CaractKey, Caract> = {
  force: { libelle: 'Force', code: 'FOR', description: 'Physique, puissance musculaire', color: 'watermelon' },
  habilete: { libelle: 'Habileté', code: 'HAB', description: 'Mobilité, souplesse, agilité', color: 'pineapple' },
  tenacite: { libelle: 'Ténacité', code: 'TEN', description: 'Endurance, discipline, santé', color: 'cucumber' },
  intelligence: { libelle: 'Intelligence', code: 'INT', description: 'Mental, réflexion, équilibre psychique', color: 'glacier' },
  charisme: { libelle: 'Charisme', code: 'CHA', description: 'Présentation, hygiène, aura sociale', color: 'blueberry' },
  magie: { libelle: 'Magie', code: 'MAG', description: 'Créativité, expression, imagination', color: 'grape' },
};
