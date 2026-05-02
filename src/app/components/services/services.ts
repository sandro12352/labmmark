import { Component, ElementRef, HostListener, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmCarouselImports } from '@ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import AutoScroll from 'embla-carousel-auto-scroll';

interface Service {
    icon: string;
    title: string;
    imageUrl: string;
    description: string;
}

@Component({
    selector: 'app-services',
    standalone: true,
    imports: [CommonModule, ...HlmCarouselImports],
    templateUrl: './services.html',
    styleUrl: './services.css',
})
export class ServicesComponent {
    services: Service[] = [
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
    ];

    carouselOptions = {
        align: 'start' as const,
        loop: true,
        slidesToScroll: 1,
    };

    carouselPlugins = [
        AutoScroll({
            speed: 2,
            startDelay:0,
            stopOnMouseEnter: true,
            stopOnInteraction:false,
        }),
    ];


    

    processStepsRef = viewChild<ElementRef<HTMLElement>>('processSteps');
    lineProgress = signal(0);

    @HostListener('window:scroll')
    @HostListener('window:resize')
    onScroll() {
        const el = this.processStepsRef()?.nativeElement;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = vh * 0.85;
        const end = vh * 0.35;
        const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
        this.lineProgress.set(progress);
    }

    isStepActive(stepIndex: number): boolean {
        return this.lineProgress() >= (stepIndex + 0.5) / 4;
    }
}
