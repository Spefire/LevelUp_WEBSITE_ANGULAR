import { Injectable } from '@angular/core';

import { CharacterService } from '@src/services/character.service';
import { DailysService } from '@src/services/dailys.service';
import { LogsService } from '@src/services/logs.service';
import { QuestsService } from '@src/services/quests.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    protected _characterService: CharacterService,
    protected _questsService: QuestsService,
    protected _dailysService: DailysService,
    protected _logsService: LogsService
  ) {}

  public async loadAll() {
    await this._characterService.loadCharacter();
    await this._questsService.loadQuests();
    await this._dailysService.loadDailys();
    await this._logsService.loadLogs();
  }
}
