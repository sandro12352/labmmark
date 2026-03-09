import { Component } from '@angular/core';

interface Project {
    title: string;
    category: string;
    size: 'large' | 'medium' | 'small';
    gradient: string;
    image?: string;
}

@Component({
    selector: 'app-portfolio',
    standalone: true,
    templateUrl: './portfolio.html',
    styleUrl: './portfolio.css',
})
export class PortfolioComponent {
    projects: Project[] = [
        { title: 'Renacer Cosmetics', category: 'Branding / Packaging', size: 'large', gradient: 'from-lm-graphite to-lm-black', image: 'assets/portfolio-1.png' },
        { title: 'TechPulse', category: 'Web Design / UX', size: 'medium', gradient: 'from-lm-slate to-lm-charcoal', image: 'assets/portfolio-2.png' },
        { title: 'Alma Café', category: 'Social Media', size: 'medium', gradient: 'from-lm-charcoal to-lm-graphite' },
        { title: 'Nova Fitness', category: 'Campaña Digital', size: 'small', gradient: 'from-lm-graphite to-lm-slate' },
        { title: 'Urban Living', category: 'Branding Completo', size: 'small', gradient: 'from-lm-slate to-lm-black' },
        { title: 'Meridian Bank', category: 'Estrategia Digital', size: 'large', gradient: 'from-lm-charcoal to-lm-black' },
    ];
}
