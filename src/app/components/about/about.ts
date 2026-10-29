import { RevealDirective } from '../../directives/reveal';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Experience {
    role: string;
    client: string;
    period: string;
    current?: boolean;
}

interface Work {
    title: string;
    service: string;
    description: string;
    image: string;
    link: string;
}

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [RouterLink, RevealDirective],
    templateUrl: './about.html',
    styleUrl: './about.css',
})
export class AboutComponent {
    tags = [
        'Branding',
        'Diseño Web',
        'Performance',
        'Social Media',
        'Marketing de Contenido',
        'Figma',
        'Photoshop',
    ];

    experience: Experience[] = [
        { role: 'Branding Lead', client: 'Martial Co.', period: 'Currently', current: true },
        { role: 'Diseño Web', client: 'Oigo Studio', period: '2023-24' },
        { role: 'Performance', client: 'Tis Agency', period: '2020-22' },
    ];

    recentWorks: Work[] = [
        // TODO: los `service` son provisionales, reemplazar por el trabajo real de cada cliente
        { title: 'Montepinar', service: 'Campaña digital', description: 'Proyecto inmobiliario.', image: 'assets/about/montepinar.webp', link: '/portafolio' },
        { title: 'Tayta', service: 'Fotografía · Redes sociales', description: 'Kombucha y otras bebidas artesanales.', image: 'assets/about/tayta.webp', link: '/portafolio' },
        { title: 'Alpina', service: 'Contenido · Meta Ads', description: 'Maquinaria y productos complementarios de jardinería.', image: 'assets/about/podadora.webp', link: '/portafolio' },
    ];
}
