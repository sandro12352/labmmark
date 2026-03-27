import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface CaseStudyMetric {
    value: string;
    label: string;
}

export interface CaseStudyService {
    icon: string;
    name: string;
    description: string;
}

export interface CaseStudy {
    challenge: string;
    solution: string;
    results: string;
    services: CaseStudyService[];
    metrics: CaseStudyMetric[];
    gallery?: string[];
    videoUrl?: string;
    testimonial?: {
        quote: string;
        author: string;
        role: string;
    };
}

export interface Project {
    slug: string;
    title: string;
    category: string;
    size: 'large' | 'medium' | 'small';
    gradient: string;
    image?: string;
    caseStudy: CaseStudy;
}

@Component({
    selector: 'app-portfolio',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './portfolio.html',
    styleUrl: './portfolio.css',
})
export class PortfolioComponent {
    projects: Project[] = [
        {
            slug: 'martial-core',
            title: 'Martialcore',
            category: 'Branding / Packaging',
            size: 'large',
            gradient: 'from-lm-graphite to-lm-black',
            image: 'assets/martialcore.jpeg',
            caseStudy: {
                challenge: 'Martialcore necesitaba reposicionar su marca en un mercado saturado de productos de belleza. Su imagen anterior no conectaba con el público joven y no transmitía la calidad premium de sus productos.',
                solution: 'Desarrollamos una identidad visual completamente nueva, desde el logotipo hasta el packaging. Implementamos una estrategia de Meta Ads segmentada por intereses y comportamientos de compra, complementada con campañas de Google Ads para capturar intención de búsqueda.',
                results: 'En 3 meses logramos posicionar la marca como referente en cosmética natural, triplicando las ventas online y generando una comunidad activa en redes sociales.',
                services: [
                    { icon: 'palette', name: 'Branding & Identidad', description: 'Rediseño completo de marca, logotipo, paleta de colores y tipografía.' },
                    { icon: 'meta', name: 'Meta Ads', description: 'Campañas en Facebook e Instagram con segmentación avanzada por audiencias lookalike.' },
                    { icon: 'google', name: 'Google Ads', description: 'Campañas de Shopping y Search para capturar intención de compra directa.' },
                    { icon: 'package', name: 'Diseño de Packaging', description: 'Packaging premium alineado con la nueva identidad visual de la marca.' },
                ],
                metrics: [
                    { value: '320%', label: 'Aumento en ventas' },
                    { value: '4.2x', label: 'ROAS en Meta Ads' },
                    { value: '58K', label: 'Nuevos seguidores' },
                    { value: '-45%', label: 'Costo por adquisición' },
                ],
                gallery: [
                    'assets/gallery/martialcore-1.jpg',
                    'assets/gallery/martialcore-2.jpg',
                    'assets/gallery/martialcore-3.jpg',
                    'assets/gallery/martialcore-4.jpg',
                    'assets/gallery/martialcore-5.jpg',
                    'assets/gallery/martialcore-6.jpg',
                ],
                testimonial: {
                    quote: 'LABMARK transformó nuestra marca por completo. Los resultados superaron todas nuestras expectativas.',
                    author: 'María González',
                    role: 'CEO, Renacer Cosmetics',
                },
            },
        },
        {
            slug: 'techpulse',
            title: 'TechPulse',
            category: 'Web Design / UX',
            size: 'small',
            gradient: 'from-lm-slate to-lm-charcoal',
            image: 'assets/portfolio-2.png',
            caseStudy: {
                challenge: 'TechPulse tenía una plataforma web desactualizada con una tasa de rebote del 78%. Los usuarios no encontraban los productos y el proceso de compra era confuso.',
                solution: 'Rediseñamos la experiencia de usuario desde cero con un enfoque mobile-first. Implementamos Google Ads con campañas de Performance Max y remarketing dinámico para recuperar carritos abandonados.',
                results: 'La nueva plataforma redujo la tasa de rebote a un 32% y duplicó las conversiones en el primer mes.',
                services: [
                    { icon: 'layout', name: 'Diseño Web / UX', description: 'Rediseño completo de la plataforma con enfoque en conversión y usabilidad.' },
                    { icon: 'google', name: 'Google Ads', description: 'Performance Max y remarketing dinámico para maximizar conversiones.' },
                    { icon: 'search', name: 'SEO Técnico', description: 'Optimización on-page, velocidad de carga y estructura de datos.' },
                    { icon: 'bar-chart', name: 'Analytics & CRO', description: 'Implementación de tracking avanzado y optimización de tasa de conversión.' },
                ],
                metrics: [
                    { value: '-58%', label: 'Tasa de rebote' },
                    { value: '2.1x', label: 'Conversiones' },
                    { value: '3.8s', label: 'Tiempo de carga' },
                    { value: '185%', label: 'Tráfico orgánico' },
                ],
                testimonial: {
                    quote: 'El equipo de LABMARK entendió perfectamente lo que necesitábamos. La nueva web es otra cosa.',
                    author: 'Carlos Ruiz',
                    role: 'CTO, TechPulse',
                },
            },
        },
        {
            slug: 'alma-cafe',
            title: 'Alma Café',
            category: 'Social Media',
            size: 'small',
            gradient: 'from-lm-charcoal to-lm-graphite',
            image: 'assets/portfolio-1.png',
            caseStudy: {
                challenge: 'Alma Café era un negocio local con poca presencia digital. Necesitaban atraer clientes jóvenes y posicionarse como el café de especialidad de referencia en la ciudad.',
                solution: 'Creamos una estrategia de contenido para Instagram y TikTok con enfoque en storytelling. Implementamos Meta Ads con campañas de alcance local y generación de tráfico a tienda física.',
                results: 'En 4 meses Alma Café pasó de 800 a 15K seguidores y aumentó las visitas a tienda en un 200%.',
                services: [
                    { icon: 'instagram', name: 'Social Media Management', description: 'Gestión integral de Instagram y TikTok con contenido diario.' },
                    { icon: 'meta', name: 'Meta Ads', description: 'Campañas de alcance local y tráfico a tienda con geo-targeting.' },
                    { icon: 'camera', name: 'Producción de Contenido', description: 'Fotografía y video profesional para redes sociales.' },
                    { icon: 'trending-up', name: 'Estrategia de Crecimiento', description: 'Plan de crecimiento orgánico con colaboraciones e influencers locales.' },
                ],
                metrics: [
                    { value: '15K', label: 'Seguidores ganados' },
                    { value: '200%', label: 'Visitas a tienda' },
                    { value: '12%', label: 'Engagement rate' },
                    { value: '2.8x', label: 'ROAS campañas' },
                ],
                testimonial: {
                    quote: 'Gracias a LABMARK nuestro café se llenó de clientes nuevos. Las redes sociales cambiaron todo.',
                    author: 'Ana Torres',
                    role: 'Fundadora, Alma Café',
                },
            },
        },
        {
            slug: 'nova-fitness',
            title: 'Nova Fitness',
            category: 'Campaña Digital',
            size: 'small',
            gradient: 'from-lm-graphite to-lm-slate',
            image: 'assets/portfolio-1.png',
            caseStudy: {
                challenge: 'Nova Fitness lanzaba un nuevo gimnasio y necesitaba generar 500 membresías en el primer mes de apertura con un presupuesto limitado.',
                solution: 'Diseñamos una campaña de lanzamiento multicanal con Meta Ads (leads), Google Ads (búsqueda local) y una landing page optimizada para conversión. Implementamos una estrategia de urgencia con ofertas por tiempo limitado.',
                results: 'Superamos el objetivo con 687 membresías vendidas en 30 días, con un costo por lead de $1.20 USD.',
                services: [
                    { icon: 'meta', name: 'Meta Ads', description: 'Campañas de generación de leads con formularios instantáneos.' },
                    { icon: 'google', name: 'Google Ads', description: 'Campañas de búsqueda local y display para awareness en la zona.' },
                    { icon: 'layout', name: 'Landing Page', description: 'Diseño y desarrollo de landing page optimizada para conversión.' },
                    { icon: 'mail', name: 'Email Marketing', description: 'Secuencia automatizada de nurturing para convertir leads en membresías.' },
                ],
                metrics: [
                    { value: '687', label: 'Membresías vendidas' },
                    { value: '$1.20', label: 'Costo por lead' },
                    { value: '37%', label: 'Tasa de conversión' },
                    { value: '5.6x', label: 'ROAS general' },
                ],
                testimonial: {
                    quote: 'Abrimos con el gimnasio lleno. La estrategia de LABMARK fue impecable desde el día uno.',
                    author: 'Diego Méndez',
                    role: 'Director, Nova Fitness',
                },
            },
        },
        {
            slug: 'urban-living',
            title: 'Urban Living',
            category: 'Branding Completo',
            size: 'small',
            gradient: 'from-lm-slate to-lm-black',
            image: 'assets/portfolio-1.png',
            caseStudy: {
                challenge: 'Urban Living es una desarrolladora inmobiliaria que necesitaba diferenciarse en un mercado competitivo y generar leads cualificados para sus proyectos de departamentos de lujo.',
                solution: 'Construimos una marca premium desde cero y desplegamos una estrategia digital completa: Meta Ads para awareness, Google Ads para búsqueda de intención y una web inmersiva con recorridos virtuales.',
                results: 'Generamos 1,200 leads cualificados en 2 meses y la marca se posicionó como referente de vivienda premium en la región.',
                services: [
                    { icon: 'palette', name: 'Branding Completo', description: 'Identidad visual premium, manual de marca y aplicaciones.' },
                    { icon: 'meta', name: 'Meta Ads', description: 'Campañas de awareness y generación de leads para proyectos inmobiliarios.' },
                    { icon: 'google', name: 'Google Ads', description: 'Search y Display orientado a compradores de vivienda de lujo.' },
                    { icon: 'layout', name: 'Diseño Web Inmersivo', description: 'Web con recorridos virtuales 360° y experiencia interactiva.' },
                ],
                metrics: [
                    { value: '1,200', label: 'Leads cualificados' },
                    { value: '$8.50', label: 'Costo por lead' },
                    { value: '24', label: 'Departamentos vendidos' },
                    { value: '8.2x', label: 'ROI de campaña' },
                ],
                testimonial: {
                    quote: 'LABMARK nos ayudó a construir una marca que transmite exactamente lo que somos. Los resultados hablan solos.',
                    author: 'Roberto Castillo',
                    role: 'Director Comercial, Urban Living',
                },
            },
        },
        {
            slug: 'meridian-bank',
            title: 'Meridian Bank',
            category: 'Estrategia Digital',
            size: 'large',
            gradient: 'from-lm-charcoal to-lm-black',
            image: 'assets/da.jpg',
            caseStudy: {
                challenge: 'Meridian Bank necesitaba modernizar su imagen digital y atraer a un público más joven sin perder la confianza de sus clientes existentes. Su presencia en redes era inexistente.',
                solution: 'Implementamos una estrategia digital 360°: rediseño de marca digital, gestión de redes sociales con contenido educativo financiero, campañas de Google Ads para productos bancarios y Meta Ads para awareness de marca.',
                results: 'En 6 meses duplicaron las aperturas de cuenta online y se convirtieron en el banco con mayor engagement en redes sociales de su categoría.',
                services: [
                    { icon: 'trending-up', name: 'Estrategia Digital 360°', description: 'Plan integral de marketing digital con KPIs claros y medibles.' },
                    { icon: 'google', name: 'Google Ads', description: 'Campañas de Search para productos bancarios y remarketing.' },
                    { icon: 'meta', name: 'Meta Ads', description: 'Awareness de marca y campañas de engagement para público joven.' },
                    { icon: 'instagram', name: 'Social Media', description: 'Contenido educativo financiero y gestión de comunidad.' },
                ],
                metrics: [
                    { value: '2x', label: 'Aperturas de cuenta' },
                    { value: '340%', label: 'Engagement en RRSS' },
                    { value: '92K', label: 'Seguidores totales' },
                    { value: '3.5x', label: 'ROAS promedio' },
                ],
                testimonial: {
                    quote: 'LABMARK logró lo que parecía imposible: hacer que un banco conecte con millennials sin perder seriedad.',
                    author: 'Patricia Vega',
                    role: 'CMO, Meridian Bank',
                },
            },
        },
    ];
}
