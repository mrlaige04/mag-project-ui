import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AppThemePreset} from '../preset';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      inputVariant: 'filled',
      theme: {
        preset: AppThemePreset
      }
    }),
    provideAnimationsAsync(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient()
  ]
};
