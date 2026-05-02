import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'nosotros',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'portafolio/:slug',
    renderMode: RenderMode.Prerender

  },
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
