import { Component } from '@angular/core';

interface Service {
    icon: string;
    title: string;
    description: string;
}

@Component({
    selector: 'app-services',
    standalone: true,
    templateUrl: './services.html',
    styleUrl: './services.css',
})
export class ServicesComponent {
    services: Service[] = [
        {
            icon: 'branding',
            title: 'Branding',
            description: 'Construimos identidades visuales que conectan emocionalmente con tu audiencia y diferencian tu marca en el mercado.',
        },
        {
            icon: 'social',
            title: 'Social Media',
            description: 'Estrategias de contenido y gestión de redes sociales que generan comunidad, engagement y conversiones reales.',
        },
        {
            icon: 'web',
            title: 'Diseño Web',
            description: 'Websites y landing pages con diseño premium, optimizados para conversión y experiencia de usuario.',
        },
        {
            icon: 'ads',
            title: 'Publicidad Digital',
            description: 'Campañas de Meta Ads, Google Ads y TikTok Ads con segmentación precisa y optimización constante.',
        },
        {
            icon: 'content',
            title: 'Marketing de Contenido',
            description: 'Creación de contenido estratégico: video, fotografía, copywriting y diseño gráfico que cuenta tu historia.',
        },
        {
            icon: 'strategy',
            title: 'Estrategia Digital',
            description: 'Planificación integral basada en datos. Definimos el camino óptimo para alcanzar tus objetivos de negocio.',
        },
    ];
}
