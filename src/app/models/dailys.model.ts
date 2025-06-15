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

  constructor(quest: Quest) {
    this.id = 0;
    this.quest = quest;
    this.isMandatory = false;
    this.daysOfWeek = [];
    this.timesByWeek = 0;
  }

  public static getIDaily(user_id: string, daily: Daily) {
    const item: IDaily = {
      id: daily.id,
      user_id: user_id,
      id_quest: daily.quest.id,
      is_mandatory: daily.isMandatory,
      lundi: daily.daysOfWeek.includes(1),
      mardi: daily.daysOfWeek.includes(2),
      mercredi: daily.daysOfWeek.includes(3),
      jeudi: daily.daysOfWeek.includes(4),
      vendredi: daily.daysOfWeek.includes(5),
      samedi: daily.daysOfWeek.includes(6),
      dimanche: daily.daysOfWeek.includes(0),
      semaine: daily.timesByWeek,
    };
    return item;
  }

  public static getDaily(result: IDaily, quest: Quest) {
    const daysOfWeek = [];
    if (result.lundi) daysOfWeek.push(1);
    if (result.mardi) daysOfWeek.push(2);
    if (result.mercredi) daysOfWeek.push(3);
    if (result.jeudi) daysOfWeek.push(4);
    if (result.vendredi) daysOfWeek.push(5);
    if (result.samedi) daysOfWeek.push(6);
    if (result.dimanche) daysOfWeek.push(0);
    const daily: Daily = {
      id: result.id,
      quest: quest,
      isMandatory: result.is_mandatory,
      daysOfWeek: daysOfWeek,
      timesByWeek: result.semaine,
    };
    return daily;
  }
}
