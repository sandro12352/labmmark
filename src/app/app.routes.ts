import { ResolveFn, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';

/** Título y descripción de cada caso según su nombre (se cargan solo al entrar a un caso) */
const caseTitle: ResolveFn<string> = async (route) => {
    const { PORTFOLIO_ITEMS } = await import('./pages/portafolio/portafolio.data');
    const item = PORTFOLIO_ITEMS.find((i) => i.slug === route.paramMap.get('slug'));
    return item ? `${item.title} — Caso de éxito` : 'Caso de éxito';
};

const caseDescription: ResolveFn<string> = async (route) => {
    const { PORTFOLIO_ITEMS } = await import('./pages/portafolio/portafolio.data');
    const item = PORTFOLIO_ITEMS.find((i) => i.slug === route.paramMap.get('slug'));
    return item
        ? `Conoce el proyecto de ${item.title} con LABMMARK (${item.category}): qué necesitaba, qué hicimos y cómo lo trabajamos.`
        : 'Conoce los detalles de nuestro caso de éxito.';
};

/** Título y descripción de cada artículo del blog según su dirección */
const blogTitle: ResolveFn<string> = async (route) => {
    const { BLOG_POSTS } = await import('./pages/blog/blog.data');
    return BLOG_POSTS.find((p) => p.slug === route.paramMap.get('slug'))?.title ?? 'Blog de marketing digital';
};

const blogDescription: ResolveFn<string> = async (route) => {
    const { BLOG_POSTS } = await import('./pages/blog/blog.data');
    return BLOG_POSTS.find((p) => p.slug === route.paramMap.get('slug'))?.excerpt ?? 'Guías y consejos de marketing digital de LABMMARK.';
};

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        // Sin "title": el inicio usa el título completo de la marca (ver SeoService)
        data: {
            description: 'LABMMARK es una agencia de marketing digital en Lima: branding, redes sociales, diseño web, publicidad y estrategia para que tu marca venda más.',
        },
    },
    // {
    //     path: 'servicios',
    //     component: HomeComponent,
    //     data: {
    //         title: 'Servicios',
    //         breadcrumb: 'Servicios',
    //         description: 'Conoce nuestros servicios: branding, social media, diseño web, publicidad digital, marketing de contenido y estrategia.',
    //     },
    // },
    {
        path: 'nosotros',
        loadComponent: () => import('./pages/nosotros/nosotros').then(m => m.NosotrosComponent),
        data: {
            title: 'Nosotros, agencia de marketing en Lima',
            breadcrumb: 'Nosotros',
            description: 'Conoce al equipo de LABMMARK. Fusionamos creatividad e inteligencia de datos para construir marcas que trascienden. Descubre nuestros valores y proceso.',
        },
    },
    {
        path: 'planes',
        loadComponent: () => import('./pages/planes/planes').then(m => m.PlanesComponent),
        data: {
            title: 'Planes de marketing digital',
            breadcrumb: 'Planes',
            description: 'Planes de crecimiento IMPULSO y XPANDE: gestión de redes, producción de contenido y publicidad digital con seguimiento y reportes mensuales.',
        },
    },
    {
        path: 'portafolio',
        loadComponent: () => import('./pages/portafolio/portafolio').then(m => m.PortafolioComponent),
        data: {
            title: 'Portafolio y casos de éxito',
            breadcrumb: 'Portafolio',
            description: 'Casos de éxito de LABMMARK: branding, campañas y redes sociales para marcas como Martialcore, Grin Perú, Opción y Tecnograss. Mira los resultados.',
        },
    },
    {
        path: 'portafolio/:slug',
        loadComponent: () => import('./pages/case-study/case-study').then(m => m.CaseStudyComponent),
        resolve: { title: caseTitle, description: caseDescription },
        data: {
            breadcrumb: 'Caso de Éxito',
        },
    },
    {
        path: 'contacto',
        loadComponent: () => import('./pages/contacto/contacto').then(m => m.ContactoComponent),
        data: {
            title: 'Contacto, cotiza tu proyecto',
            breadcrumb: 'Contacto',
            description: 'Escríbenos por WhatsApp o desde el formulario y cuéntanos tu proyecto. Agencia de marketing digital en Lima: armamos tu propuesta a medida.',
        },
    },
    {
        path: 'blog',
        loadComponent: () => import('./pages/blog/blog').then(m => m.BlogComponent),
        data: {
            title: 'Blog de marketing digital',
            breadcrumb: 'Blog',
            description: 'Guías y consejos de marketing digital: publicidad, redes sociales, diseño web y branding, desde la experiencia real de LABMMARK en Lima.',
            // EJEMPLO: mientras el blog lleve artículos de relleno no debe aparecer en Google. Quitar esta línea al publicar los reales y añadir /blog al sitemap.
            noindex: true,
        },
    },
    {
        path: 'blog/:slug',
        loadComponent: () => import('./pages/blog/blog-article').then(m => m.BlogArticleComponent),
        resolve: { title: blogTitle, description: blogDescription },
        data: {
            breadcrumb: 'Blog',
            // EJEMPLO: igual que el listado, quitar al publicar artículos reales.
            noindex: true,
        },
    },
    {
        path: 'privacidad',
        loadComponent: () => import('./pages/privacidad/privacidad').then(m => m.PrivacidadComponent),
        data: {
            title: 'Política de privacidad',
            breadcrumb: 'Política de privacidad',
            description: 'Cómo LABMMARK recoge, usa y protege tus datos personales cuando nos contactas desde el sitio web.',
        },
    },
    // Cualquier dirección que no exista lleva al inicio
    {
        path: '**',
        redirectTo: '',
    },
];
