/** Servicios de LABMMARK: se usan en la sección de Servicios y en los datos estructurados para buscadores */
export interface Service {
    icon: string;
    title: string;
    imageUrl: string;
    description: string;
}

export const SERVICES: Service[] = [
    {
        icon: 'branding',
        title: 'Branding',
        imageUrl: 'assets/services/branding.jpg',
        description: 'Construimos identidades visuales que conectan emocionalmente con tu audiencia y diferencian tu marca en el mercado.',
    },
    {
        icon: 'social',
        title: 'Social Media',
        imageUrl: 'assets/services/social.jpg',
        description: 'Estrategias de contenido y gestión de redes sociales que generan comunidad, engagement y conversiones reales.',
    },
    {
        icon: 'web',
        title: 'Diseño Web',
        imageUrl: 'assets/services/web.jpg',
        description: 'Websites y landing pages con diseño premium, optimizados para conversión y experiencia de usuario.',
    },
    {
        icon: 'ads',
        title: 'Publicidad Digital',
        imageUrl: 'assets/services/ads.jpg',
        description: 'Campañas de Meta Ads, Google Ads y TikTok Ads con segmentación precisa y optimización constante.',
    },
    {
        icon: 'content',
        title: 'Marketing de Contenido',
        imageUrl: 'assets/services/content.jpg',
        description: 'Creación de contenido estratégico: video, fotografía, copywriting y diseño gráfico que cuenta tu historia.',
    },
    {
        icon: 'strategy',
        title: 'Estrategia Digital',
        imageUrl: 'assets/services/strategy.jpg',
        description: 'Planificación integral basada en datos. Definimos el camino óptimo para alcanzar tus objetivos de negocio.',
    },
    {
        icon: 'analytics',
        title: 'Analítica y Optimización',
        imageUrl: 'assets/services/analitica.jpg',
        description: 'Seguimiento de métricas clave y mejora continua basada en datos, no en intuición.',
    },
    {
        icon: 'automation',
        title: 'Automatización Comercial',
        imageUrl: 'assets/services/automatizacion.jpg',
        description: 'CRM en GoHighLevel, WhatsApp e IA para vender y fidelizar sin depender de procesos manuales.',
    },
];
