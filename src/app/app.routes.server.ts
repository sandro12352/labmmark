import { RenderMode, ServerRoute } from '@angular/ssr';

const PORTFOLIO_SLUGS = [
  'martial-core',
  'grin-peru',
  'opcion',
  'sabor-y-sason',
  'tecnograss',
  'tismartial',
];

export const serverRoutes: ServerRoute[] = [
  {
    path: 'nosotros',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'contacto',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'programas',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'portafolio/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PORTFOLIO_SLUGS.map(slug => ({ slug })),
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
