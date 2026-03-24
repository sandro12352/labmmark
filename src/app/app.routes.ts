import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
        data: {
            title: 'Inicio',
            description: 'LABMARK: Agencia de marketing digital especializada en branding, social media, diseño web y estrategia digital.',
        },
    },
    {
        path: 'servicios',
        loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
        data: {
            title: 'Servicios',
            breadcrumb: 'Servicios',
            description: 'Conoce nuestros servicios: branding, social media, diseño web, publicidad digital, marketing de contenido y estrategia.',
        },
    },
    {
        path: 'nosotros',
        loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
        data: {
            title: 'Nosotros',
            breadcrumb: 'Nosotros',
            description: 'Conoce al equipo de LABMARK. Fusionamos creatividad e inteligencia de datos para construir marcas que trascienden.',
        },
    },
    {
        path: 'portafolio',
        loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
        data: {
            title: 'Portafolio',
            breadcrumb: 'Portafolio',
            description: 'Explora nuestros proyectos de branding, diseño web, social media y estrategia digital.',
        },
    },
    {
        path: 'portafolio/:slug',
        loadComponent: () => import('./pages/case-study/case-study').then(m => m.CaseStudyComponent),
        data: {
            title: 'Caso de Éxito',
            breadcrumb: 'Caso de Éxito',
            description: 'Conoce los detalles de nuestro caso de éxito y los resultados obtenidos.',
        },
    },
    {
        path: 'contacto',
        loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
        data: {
            title: 'Contacto',
            breadcrumb: 'Contacto',
            description: 'Contáctanos para transformar tu marca. Primera consulta sin costo.',
        },
    },
    {
        path: '**',
        redirectTo: '',
    },
];
