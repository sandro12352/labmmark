import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions({
      onViewTransitionCreated: ({ transition }) => {
        transition.ready.then(() => {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        })
      }
    }))
  ]
};
