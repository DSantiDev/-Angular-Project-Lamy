import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    /** Habilita la caracteristica para hacer peticiones HTTP */
    provideHttpClient(
      withFetch()
    ),
    /** Habilita la caracteristica para hacer peticiones HTTP versiones anteriores a Angular 17*/
    // HttpClientModule
  ]
};