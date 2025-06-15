import { DecorativePalette, Palette } from '@lucca-front/ng/core';

export type TCaractKey = 'force' | 'habilete' | 'tenacite' | 'intelligence' | 'charisme' | 'magie';
export const CaractKeys: TCaractKey[] = ['force', 'habilete', 'tenacite', 'intelligence', 'charisme', 'magie'];

export interface ICaractValue {
  libelle: string;
  code: string;
  description: string;
  color: Palette | DecorativePalette;
}

export const Caracteristics: Record<TCaractKey, ICaractValue> = {
  force: { libelle: 'Force', code: 'FOR', description: 'Physique, puissance musculaire', color: 'watermelon' },
  habilete: { libelle: 'Habileté', code: 'HAB', description: 'Mobilité, souplesse, agilité', color: 'pineapple' },
  tenacite: { libelle: 'Ténacité', code: 'TEN', description: 'Endurance, discipline, santé', color: 'cucumber' },
  intelligence: { libelle: 'Intelligence', code: 'INT', description: 'Mental, réflexion, équilibre psychique', color: 'glacier' },
  charisme: { libelle: 'Charisme', code: 'CHA', description: 'Présentation, hygiène, aura sociale', color: 'blueberry' },
  magie: { libelle: 'Magie', code: 'MAG', description: 'Créativité, expression, imagination', color: 'grape' },
};
