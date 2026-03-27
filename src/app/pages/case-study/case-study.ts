import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Project } from '../../components/portfolio/portfolio';

@Component({
    selector: 'app-case-study',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './case-study.html',
    styleUrl: './case-study.css',
})
export class CaseStudyComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    project!: Project;

    private allProjects: Project[] = [
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
                    'assets/martial/martialcore-1.jpeg',
                    'assets/martial/martialcore-2.jpeg',
                    'assets/martial/martialcore-3.jpeg',
                    'assets/martial/martialcore-4.jpeg',
                    'assets/martial/martialcore-5.jpeg',
                    'assets/martial/martialcore-6.jpeg',
                ],
                testimonial: {
                    quote: 'LABMARK transformó nuestra marca por completo. Los resultados superaron todas nuestras expectativas.',
                    author: 'María González',
                    role: 'CEO, Renacer Cosmetics',
                },
                videoUrl: 'assets/martial/video2.mp4',
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

    ngOnInit() {
        const slug = this.route.snapshot.paramMap.get('slug');
        const found = this.allProjects.find(p => p.slug === slug);
        if (!found) {
            this.router.navigate(['/']);
            return;
        }
        this.project = found;
    }

    getServiceIcon(icon: string): string {
        const icons: Record<string, string> = {
            'palette': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
            'meta': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
            'google': 'M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z',
            'package': 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
            'layout': 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
            'search': 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
            'bar-chart': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
            'instagram': 'M16 4H8C5.79 4 4 5.79 4 8v8c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zm-4 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3.5-7.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z',
            'camera': 'M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 17a5 5 0 100-10 5 5 0 000 10z',
            'trending-up': 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
            'mail': 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        };
        return icons[icon] || icons['palette'];
    }
}
