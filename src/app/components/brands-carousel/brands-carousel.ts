import { Component } from '@angular/core';

interface Brand {
    name: string;
    logo: string;
}

@Component({
    selector: 'app-brands-carousel',
    standalone: true,
    templateUrl: './brands-carousel.html',
    styleUrl: './brands-carousel.css',
})
export class BrandsCarouselComponent {
    brands: Brand[] = [
        { name: 'Renacer Cosmetics', logo: 'RC' },
        { name: 'TechPulse', logo: 'TP' },
        { name: 'Alma Café', logo: 'AC' },
        { name: 'Nova Fitness', logo: 'NF' },
        { name: 'Urban Living', logo: 'UL' },
        { name: 'Meridian Bank', logo: 'MB' },
        { name: 'Solaris Energy', logo: 'SE' },
        { name: 'Vertex Studio', logo: 'VS' },
        { name: 'Prism Digital', logo: 'PD' },
        { name: 'Atlas Group', logo: 'AG' },
    ];
}
