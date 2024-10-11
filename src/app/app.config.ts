import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AuthInterceptor } from './interceptors/auth-interceptor.service'; // Ajusta la ruta según tu estructura

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    /** Habilita la caracteristica para hacer peticiones HTTP */
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // Esto permite que se puedan añadir múltiples interceptores
    },
    /** Habilita la caracteristica para hacer peticiones HTTP versiones anteriores a Angular 17*/
    // HttpClientModule
  ]
};
