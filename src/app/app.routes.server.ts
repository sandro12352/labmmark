import { RenderMode, ServerRoute } from '@angular/ssr';
import { BLOG_POSTS } from './pages/blog/blog.data';

const PORTFOLIO_SLUGS = [
  'martial-core',
  'grin-peru',
  'opcion',
  'sabor-y-sason',
  'tecnograss',
  'tismartial',
  'tayta',
  'montepinar',
  'alpina',
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
    path: 'planes',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'portafolio/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PORTFOLIO_SLUGS.map(slug => ({ slug })),
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => BLOG_POSTS.map(post => ({ slug: post.slug })),
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
