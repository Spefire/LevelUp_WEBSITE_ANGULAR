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
  id: string;
  name: string;
  description: string;
  difficulty: QuestDifficulty;
  category: QuestCategory;
  daysOfWeek: number[]; // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
  isOptional: boolean;
  xpRewards: {
    force?: number;
    habilete?: number;
    tenacite?: number;
    charisme?: number;
    intelligence?: number;
  };
}

export interface QuestsFilters {
  category: string;
  onlySelected: boolean;
  search: string;
}

export const listQuests: Quest[] = [
  {
    id: 'quest-001',
    name: 'Musculation',
    description: 'Faire une séance de musculation',
    difficulty: QuestDifficulty.COMPLEXE,
    category: QuestCategory.EXERCICE,
    daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
    isOptional: true,
    xpRewards: {},
  },
  {
    id: 'quest-002',
    name: 'Cardio',
    description: 'Faire une séance de cardio 30min',
    difficulty: QuestDifficulty.STANDARD,
    category: QuestCategory.EXERCICE,
    daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
    isOptional: true,
    xpRewards: {},
  },
  {
    id: 'quest-003',
    name: 'Marche',
    description: 'Faire une séance de marche 1h',
    difficulty: QuestDifficulty.STANDARD,
    category: QuestCategory.EXERCICE,
    daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
    isOptional: true,
    xpRewards: {},
  },
  {
    id: 'quest-010',
    name: 'Sommeil I',
    description: 'Dormir avant 0h',
    difficulty: QuestDifficulty.SIMPLE,
    category: QuestCategory.HEALTH,
    daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
    isOptional: false,
    xpRewards: {},
  },
  {
    id: 'quest-011',
    name: 'Sommeil II',
    description: 'Dormir avant 23h',
    difficulty: QuestDifficulty.STANDARD,
    category: QuestCategory.HEALTH,
    daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
    isOptional: true,
    xpRewards: {},
  },
  {
    id: 'quest-012',
    name: 'Sommeil III',
    description: 'Dormir avant 22h',
    difficulty: QuestDifficulty.COMPLEXE,
    category: QuestCategory.HEALTH,
    daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
    isOptional: true,
    xpRewards: {},
  },
  {
    id: 'quest-020',
    name: 'Objectif Yazio',
    description: 'Remplir son objectif calorique',
    difficulty: QuestDifficulty.STANDARD,
    category: QuestCategory.FOOD,
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    isOptional: false,
    xpRewards: {},
  },
  {
    id: 'quest-021',
    name: 'Cuisine',
    description: 'Faire la cuisine',
    difficulty: QuestDifficulty.STANDARD,
    category: QuestCategory.FOOD,
    daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
    isOptional: true,
    xpRewards: {},
  },
  {
    id: 'quest-022',
    name: 'Boisson',
    description: `Boire une bouteille d'eau`,
    difficulty: QuestDifficulty.STANDARD,
    category: QuestCategory.FOOD,
    daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
    isOptional: false,
    xpRewards: {},
  },
];
