import { CaractKey } from '@src/models/character.model';

export enum QuestDifficulty {
  SIMPLE = 'Simple',
  STANDARD = 'Standard',
  COMPLEXE = 'Complexe',
}

export enum QuestCategory {
  EXERCICE = 'Sport',
  HEALTH = 'Hygiène',
  FOOD = 'Alimentaire',
  SOCIAL = 'Social',
  OTHER = 'Autre',
}

export interface Quest {
  id: number;
  name: string;
  description: string;
  difficulty: QuestDifficulty;
  category: QuestCategory;
  daysOfWeek: number[]; // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
  isOptional: boolean;
  xpRewards: Record<CaractKey, number>;
}

export interface QuestsFilters {
  category: string;
  onlySelected: boolean;
  search: string;
}

export const listQuests: Quest[] = [
  {
    id: 1,
    name: 'Musculation',
    description: 'Faire une séance de musculation',
    difficulty: QuestDifficulty.COMPLEXE,
    category: QuestCategory.EXERCICE,
    daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
    isOptional: true,
    xpRewards: {
      force: 2,
      habilete: null,
      tenacite: null,
      intelligence: null,
      charisme: null,
      magie: null,
    },
  },
  {
    id: 2,
    name: 'Cardio',
    description: 'Faire une séance de cardio 30min',
    difficulty: QuestDifficulty.STANDARD,
    category: QuestCategory.EXERCICE,
    daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
    isOptional: true,
    xpRewards: {
      force: null,
      habilete: null,
      tenacite: 2,
      intelligence: null,
      charisme: null,
      magie: null,
    },
  },
  {
    id: 3,
    name: 'Marche',
    description: 'Faire une séance de marche 1h',
    difficulty: QuestDifficulty.STANDARD,
    category: QuestCategory.EXERCICE,
    daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
    isOptional: true,
    xpRewards: {
      force: null,
      habilete: null,
      tenacite: 2,
      intelligence: null,
      charisme: null,
      magie: null,
    },
  },
  {
    id: 4,
    name: 'Sommeil I',
    description: 'Dormir avant 0h',
    difficulty: QuestDifficulty.SIMPLE,
    category: QuestCategory.HEALTH,
    daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
    isOptional: false,
    xpRewards: {
      force: null,
      habilete: null,
      tenacite: null,
      intelligence: 2,
      charisme: null,
      magie: null,
    },
  },
  {
    id: 5,
    name: 'Sommeil II',
    description: 'Dormir avant 23h',
    difficulty: QuestDifficulty.STANDARD,
    category: QuestCategory.HEALTH,
    daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
    isOptional: true,
    xpRewards: {
      force: null,
      habilete: null,
      tenacite: null,
      intelligence: 2,
      charisme: null,
      magie: null,
    },
  },
  {
    id: 6,
    name: 'Sommeil III',
    description: 'Dormir avant 22h',
    difficulty: QuestDifficulty.COMPLEXE,
    category: QuestCategory.HEALTH,
    daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
    isOptional: true,
    xpRewards: {
      force: null,
      habilete: null,
      tenacite: null,
      intelligence: 2,
      charisme: null,
      magie: null,
    },
  },
  {
    id: 7,
    name: 'Objectif Yazio',
    description: 'Remplir son objectif calorique',
    difficulty: QuestDifficulty.STANDARD,
    category: QuestCategory.FOOD,
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    isOptional: false,
    xpRewards: {
      force: null,
      habilete: null,
      tenacite: 1,
      intelligence: null,
      charisme: 1,
      magie: null,
    },
  },
  {
    id: 8,
    name: 'Cuisine',
    description: 'Faire la cuisine',
    difficulty: QuestDifficulty.STANDARD,
    category: QuestCategory.FOOD,
    daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
    isOptional: true,
    xpRewards: {
      force: null,
      habilete: 1,
      tenacite: null,
      intelligence: 1,
      charisme: null,
      magie: null,
    },
  },
  {
    id: 9,
    name: 'Boisson',
    description: `Boire une bouteille d'eau`,
    difficulty: QuestDifficulty.STANDARD,
    category: QuestCategory.FOOD,
    daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
    isOptional: false,
    xpRewards: {
      force: null,
      habilete: null,
      intelligence: null,
      tenacite: 1,
      charisme: 1,
      magie: null,
    },
  },
];
