import { Quest } from '@src/models/quests.model';

export interface DailyQuest {
  id: number;
  id_quest: number;
  quest: Quest;
}
