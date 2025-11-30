import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AppThemePreset} from '../preset';
import {MessageService} from 'primeng/api';
import {handleServerNotRespondingInterceptor} from './utils/interceptors/handle-server-not-responding-interceptor';
import {DialogService} from 'primeng/dynamicdialog';

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
    provideHttpClient(withInterceptors([
      handleServerNotRespondingInterceptor
    ])),
    DialogService,
    MessageService
  ]
};
