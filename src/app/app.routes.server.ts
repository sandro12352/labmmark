import { RenderMode, ServerRoute } from '@angular/ssr';

const PORTFOLIO_SLUGS = [
  'martial-core',
  'techpulse',
  'alma-cafe',
  'nova-fitness',
  'urban-living',
  'meridian-bank',
];

export const serverRoutes: ServerRoute[] = [
  {
    path: 'nosotros',
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
