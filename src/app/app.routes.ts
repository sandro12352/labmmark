import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            title: 'Inicio',
            description: 'LABMMARK: Agencia de marketing digital especializada en branding, social media, diseño web y estrategia digital.',
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
            description: 'Conoce al equipo de LABMMARK. Fusionamos creatividad e inteligencia de datos para construir marcas que trascienden. Descubre nuestros valores, proceso y trayectoria.',
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
        data: {
            title: 'Caso de Éxito',
            breadcrumb: 'Caso de Éxito',
            description: 'Conoce los detalles de nuestro caso de éxito y los resultados obtenidos.',
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
    // La dirección anterior sigue funcionando
    { path: 'programas', redirectTo: 'planes', pathMatch: 'full' },
    {
        path: '**',
        redirectTo: '',
    },
];
