import { Quest } from '@src/models/quests.model';

export interface Log {
  date: Date;
  quest: Quest;
}
