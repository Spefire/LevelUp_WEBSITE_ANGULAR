import { Quest } from '@src/models/quests.model';

export interface IDailyQuest {
  id: number;
  user_id: string;
  id_quest: number;
}

export class DailyQuest {
  public id: number;
  public quest: Quest;
}
