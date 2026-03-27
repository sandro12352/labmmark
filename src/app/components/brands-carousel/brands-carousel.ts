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
        { name: 'Martialcore', logo: 'brands/martial.webp' },
        { name: 'Profe Altoque', logo: 'brands/profe.webp' },
        { name: 'Oigo Salud', logo: 'brands/oigo.webp' },
        { name: 'Tis Martial', logo: 'brands/tis.webp' },
        { name: 'Tecnograss', logo: 'brands/tecnograss.webp' },
        { name: 'Grin Perú', logo: 'brands/grin.webp' },

    ];
}
