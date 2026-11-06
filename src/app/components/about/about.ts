import { RevealDirective } from '../../directives/reveal';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Work {
    title: string;
    service: string;
    description: string;
    image: string;
    /** Si el proyecto ya tiene página de caso, la tarjeta lleva a ella */
    slug?: string;
}

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [RouterLink, RevealDirective],
    templateUrl: './about.html',
    styleUrl: './about.css',
})
export class AboutComponent {
    recentWorks: Work[] = [
        // TODO: los `service` son provisionales, reemplazar por el trabajo real de cada cliente
        { title: 'Montepinar', service: 'Campaña digital', description: 'Proyecto inmobiliario.', image: 'assets/about/montepinar.webp', slug: 'montepinar' },
        { title: 'Tayta', service: 'Fotografía · Redes sociales', description: 'Kombucha y otras bebidas artesanales.', image: 'assets/about/tayta.webp', slug: 'tayta' },
        { title: 'Alpina', service: 'Contenido · Meta Ads', description: 'Maquinaria y productos complementarios de jardinería.', image: 'assets/about/podadora.webp', slug: 'alpina' },
    ];
}
