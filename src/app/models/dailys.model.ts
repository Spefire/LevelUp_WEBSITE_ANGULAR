import { Quest } from '@src/models/quests.model';

export interface IDaily {
  id: number;
  user_id: string;
  id_quest: number;
  is_mandatory: boolean;
  lundi: boolean;
  mardi: boolean;
  mercredi: boolean;
  jeudi: boolean;
  vendredi: boolean;
  samedi: boolean;
  dimanche: boolean;
  semaine: number;
}

export class Daily {
  public id: number;
  public quest: Quest;
  public isMandatory: boolean;
  public daysOfWeek: number[]; // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
  public timesByWeek: number;

  constructor() {
    this.id = 0;
    this.quest = null;
    this.isMandatory = false;
    this.daysOfWeek = [];
    this.timesByWeek = 0;
  }

  /* public static getIDaily(daily: Daily) {
    const item: IDaily = {
      id: daily.id,
      user_id: '',
      id_quest: 0,
      is_mandatory: daily.isMandatory,
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

  public static getDaily(result: IDaily) {
    const xpRewards: Record<TCaractKey, number> = {
      force: result.force,
      habilete: result.habilete,
      tenacite: result.tenacite,
      intelligence: result.intelligence,
      charisme: result.charisme,
      magie: result.magie,
    };
    const daily: Daily = {
      id: result.id,
      name: result.name,
      description: result.description,
      difficulty: result.difficulty as QuestDifficulty,
      category: result.category as QuestCategory,
      xpRewards: xpRewards,
    };
    return quest;
  }*/
}
