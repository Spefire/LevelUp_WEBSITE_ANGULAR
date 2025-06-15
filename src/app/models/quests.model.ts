import { TCaractKey } from '@src/models/caracts.model';

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

export interface IQuestsFilters {
  category: string;
  isMandatory: boolean;
  search: string;
}

export interface IQuest {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  category: string;
  force: number;
  habilete: number;
  tenacite: number;
  intelligence: number;
  charisme: number;
  magie: number;
}

export class Quest {
  public id: number;
  public name: string;
  public description: string;
  public difficulty: QuestDifficulty;
  public category: QuestCategory;
  public xpRewards: Record<TCaractKey, number>;

  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.difficulty = QuestDifficulty.SIMPLE;
    this.category = QuestCategory.OTHER;
    this.xpRewards = {
      force: 0,
      habilete: 0,
      tenacite: 0,
      intelligence: 0,
      charisme: 0,
      magie: 0,
    };
  }

  public static getIQuest(quest: Quest) {
    const item: IQuest = {
      id: quest.id,
      name: quest.name,
      description: quest.description,
      difficulty: quest.difficulty,
      category: quest.category,
      force: quest.xpRewards.force,
      habilete: quest.xpRewards.habilete,
      tenacite: quest.xpRewards.tenacite,
      intelligence: quest.xpRewards.intelligence,
      charisme: quest.xpRewards.charisme,
      magie: quest.xpRewards.magie,
    };
    return item;
  }

  public static getQuest(result: IQuest) {
    const xpRewards: Record<TCaractKey, number> = {
      force: result.force,
      habilete: result.habilete,
      tenacite: result.tenacite,
      intelligence: result.intelligence,
      charisme: result.charisme,
      magie: result.magie,
    };
    const quest: Quest = {
      id: result.id,
      name: result.name,
      description: result.description,
      difficulty: result.difficulty as QuestDifficulty,
      category: result.category as QuestCategory,
      xpRewards: xpRewards,
    };
    return quest;
  }
}

/* export const listQuests: Quest[] = [
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
];*/
