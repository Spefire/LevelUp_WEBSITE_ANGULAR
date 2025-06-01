import { DecorativePalette, Palette } from '@lucca-front/ng/core';

export type CaractKey = 'force' | 'habilete' | 'tenacite' | 'intelligence' | 'charisme' | 'magie';
export const CaractKeys: CaractKey[] = ['force', 'habilete', 'tenacite', 'intelligence', 'charisme', 'magie'];

export interface Avatar {
  eyebrows: number;
  eyes: number;
  hasGlasses: boolean;
  glasses: number;
  mouth: number;
}

export interface Character {
  avatar: Avatar;
  lastName: string;
  firstName: string;
  isAdmin: false;
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

export const getAvatarURL = (avatar: Avatar) => {
  let result = 'https://api.dicebear.com/9.x/adventurer-neutral/svg?backgroundColor[]&';
  const attributes = [];
  attributes.push('eyebrows=variant' + (avatar.eyebrows > 9 ? avatar.eyebrows : '0' + avatar.eyebrows));
  attributes.push('eyes=variant' + (avatar.eyes > 9 ? avatar.eyes : '0' + avatar.eyes));
  attributes.push('glassesProbability=' + (avatar.hasGlasses ? 100 : 0));
  attributes.push('glasses=variant' + (avatar.glasses > 9 ? avatar.glasses : '0' + avatar.glasses));
  attributes.push('mouth=variant' + (avatar.mouth > 9 ? avatar.mouth : '0' + avatar.mouth));
  attributes.forEach((attribute, index) => {
    if (index > 0) result += '&';
    result += attribute;
  });
  return result;
};
