import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { API_URL } from '@abc/shared/data-access';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({
      eventCoalescing: true,
    }),
    provideRouter(appRoutes),
    provideHttpClient(),
    { provide: API_URL, useValue: environment.api_url }, provideHttpClient(withInterceptorsFromDi())
  ],
};
