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

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        // Sin "title": el inicio usa el título completo de la marca (ver SeoService)
        data: {
            description:'LABMMARK: Agencia de marketing digital especializada en branding, social media, diseño web y estrategia digital.',
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
            title: 'Nosotros',
            breadcrumb: 'Nosotros',
            description: 'Conoce al equipo de LABMMARK. Fusionamos creatividad e inteligencia de datos para construir marcas que trascienden. Descubre nuestros valores y proceso.',
        },
    },
    {
        path: 'planes',
        loadComponent: () => import('./pages/planes/planes').then(m => m.PlanesComponent),
        data: {
            title: 'Planes',
            breadcrumb: 'Planes',
            description: 'Planes de crecimiento IMPULSO y XPANDE: gestión de redes, producción de contenido y publicidad digital con seguimiento y reportes mensuales.',
        },
    },
    {
        path: 'portafolio',
        loadComponent: () => import('./pages/portafolio/portafolio').then(m => m.PortafolioComponent),
        data: {
            title: 'Portafolio',
            breadcrumb: 'Portafolio',
            description: 'Explora nuestros proyectos de branding, diseño web, social media y estrategia digital.',
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
            title: 'Contacto',
            breadcrumb: 'Contacto',
            description: 'Contáctanos para transformar tu marca. Escríbenos por formulario o WhatsApp.',
        },
    },
    // Cualquier dirección que no exista lleva al inicio
    {
        path: '**',
        redirectTo: '',
    },
];
