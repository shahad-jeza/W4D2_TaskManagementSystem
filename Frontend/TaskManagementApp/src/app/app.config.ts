import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { taskReducer } from './store/task/task.reducer';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideClientHydration(withEventReplay()),
    provideRouter(routes),
    provideStore({ task: taskReducer }),
   //provideEffects(TaskEffects), 
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideHttpClient(),
  ],
};