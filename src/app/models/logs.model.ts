import { Quest } from '@src/models/quests.model';

export interface ILog {
  id: number;
  user_id: string;
  id_quest: number;
  str_date: string;
}

export class Log {
  public id: number;
  public date: Date;
  public quest: Quest;

  constructor(date: Date, quest: Quest) {
    this.id = 0;
    this.date = date;
    this.quest = quest;
  }

  public static getILog(user_id: string, log: Log) {
    const item: ILog = {
      id: log.id,
      user_id: user_id,
      id_quest: log.quest.id,
      str_date: log.date.toDateString(),
    };
    return item;
  }

  public static getLog(result: ILog, quest: Quest) {
    const log: Log = {
      id: result.id,
      quest: quest,
      date: new Date(result.str_date),
    };
    return log;
  }
}
