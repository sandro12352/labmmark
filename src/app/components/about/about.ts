import { RevealDirective } from '../../directives/reveal';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Work {
    title: string;
    service: string;
    description: string;
    image: string;
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
        { title: 'Montepinar', service: 'Campaña digital', description: 'Proyecto inmobiliario.', image: 'assets/about/montepinar.webp' },
        { title: 'Tayta', service: 'Fotografía · Redes sociales', description: 'Kombucha y otras bebidas artesanales.', image: 'assets/about/tayta.webp' },
        { title: 'Alpina', service: 'Contenido · Meta Ads', description: 'Maquinaria y productos complementarios de jardinería.', image: 'assets/about/podadora.webp' },
    ];
}
