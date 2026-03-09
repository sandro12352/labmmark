import { Component } from '@angular/core';

interface Testimonial {
    quote: string;
    name: string;
    role: string;
    company: string;
    initials: string;
}

@Component({
    selector: 'app-testimonials',
    standalone: true,
    templateUrl: './testimonials.html',
    styleUrl: './testimonials.css',
})
export class TestimonialsComponent {
    testimonials: Testimonial[] = [
        {
            quote: 'LABMARK transformó completamente nuestra presencia digital. Los resultados superaron nuestras expectativas en los primeros 3 meses.',
            name: 'Andrea Villanueva',
            role: 'CEO',
            company: 'Renacer Cosmetics',
            initials: 'AV',
        },
        {
            quote: 'Su enfoque estratégico y la calidad del diseño hicieron que nuestra marca se destaque en un mercado saturado. Totalmente recomendables.',
            name: 'Carlos Mendoza',
            role: 'Director de Marketing',
            company: 'TechPulse',
            initials: 'CM',
        },
        {
            quote: 'El equipo de LABMARK entiende perfectamente las necesidades de cada proyecto. Su creatividad no tiene límites.',
            name: 'María del Carmen',
            role: 'Fundadora',
            company: 'Alma Café',
            initials: 'MC',
        },
    ];
}
