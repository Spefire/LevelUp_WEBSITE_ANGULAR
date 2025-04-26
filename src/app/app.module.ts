import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { CharacterStatsComponent } from './components/character-stats/character-stats.component';
import { DailyActionsComponent } from './components/daily-actions/daily-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterStatsComponent,
    DailyActionsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
