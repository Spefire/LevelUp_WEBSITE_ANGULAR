import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import * as fr from '@angular/common/locales/fr';
import { ApplicationConfig, isDevMode, LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';

import { routes } from './app.routes';

registerLocaleData(fr.default);

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
};
