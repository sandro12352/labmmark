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
        { title: 'TechPulse', category: 'Web Design / UX', size: 'small', gradient: 'from-lm-slate to-lm-charcoal', image: 'assets/portfolio-2.png' },
        { title: 'Alma Café', category: 'Social Media', size: 'small', gradient: 'from-lm-charcoal to-lm-graphite', image: 'assets/portfolio-1.png' },
        { title: 'Nova Fitness', category: 'Campaña Digital', size: 'small', gradient: 'from-lm-graphite to-lm-slate', image: 'assets/portfolio-1.png' },
        { title: 'Urban Living', category: 'Branding Completo', size: 'small', gradient: 'from-lm-slate to-lm-black', image: 'assets/portfolio-1.png' },
        { title: 'Meridian Bank', category: 'Estrategia Digital', size: 'large', gradient: 'from-lm-charcoal to-lm-black', image: 'assets/da.jpg' },
    ];
}
