import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngxs/store';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CanActivateTeam } from './services/canactivate';
import { registerLocaleData } from '@angular/common';
import localeTR from '@angular/common/locales/tr';
registerLocaleData(localeTR);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideStore(),
    provideHttpClient(),
    provideAnimations(),
    CanActivateTeam,
    { provide: LOCALE_ID, useValue: 'tr' }
  ]
};
