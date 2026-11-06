import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions({
      onViewTransitionCreated: ({ transition }) => {
        const scrollToTop = () => {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        };
        // Si la pestaña no está visible el navegador cancela la transición (InvalidStateError: Document hidden):
        // no es un fallo, solo se ignora y se sube igual al inicio de la página
        transition.ready.then(scrollToTop, scrollToTop);
        transition.finished.catch(() => { });
      }
    })), provideClientHydration(withEventReplay())
  ]
};
