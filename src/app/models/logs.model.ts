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
}
