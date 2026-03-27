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
            name: 'Alejandro Villanueva',
            role: 'Dueño',
            company: 'Martial Core',
            initials: 'MC',
        },
        {
            quote: 'Su enfoque estratégico y la calidad del diseño hicieron que nuestra marca se destaque en un mercado saturado. Totalmente recomendables.',
            name: 'Carlos Mendoza',
            role: 'Dueño',
            company: 'Tis Martial',
            initials: 'TM',
        },
        {
            quote: 'El equipo de LABMARK entiende perfectamente las necesidades de cada proyecto. Su creatividad no tiene límites.',
            name: 'Mario del Carmen',
            role: 'Fundador',
            company: 'Grin Perú',
            initials: 'GP',
        },
    ];
}
