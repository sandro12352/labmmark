import { RevealDirective } from '../../directives/reveal';
import { Component } from '@angular/core';

export interface Brand {
    name: string;
    logo: string;
}

@Component({
    selector: 'app-brands-carousel',
    standalone: true,
    imports: [RevealDirective],
    templateUrl: './brands-carousel.html',
    styleUrl: './brands-carousel.css',
})
export class BrandsCarouselComponent {
    brands: Brand[] = [
        { name: 'Martialcore', logo: 'brands/martial.webp' },
        { name: 'Profe al Toque', logo: 'brands/profe.webp' },
        { name: 'Oigo Salud', logo: 'brands/oigo.webp' },
        { name: 'Tis Martial', logo: 'brands/tis.webp' },
        { name: 'Tecnograss', logo: 'brands/tecnograss.webp' },
        { name: 'Grin Perú', logo: 'brands/grin.webp' },
        { name: 'Tayta', logo: 'brands/tayta.webp' },
        { name: 'Montepinar', logo: 'brands/montepinar.webp' },
        { name: 'Alpina', logo: 'brands/alpina.webp' },

    ];
}
