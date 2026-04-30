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
    image: string;
    link: string;
}

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [RouterLink],
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
        { title: 'Martial', image: 'assets/about/martial.jpg', link: '/portfolio' },
        { title: 'Oigo', image: 'assets/about/oigo.jpg', link: '/portfolio' },
        { title: 'Tis', image: 'assets/about/tis.jpg', link: '/portfolio' },
        { title: 'Grin', image: 'assets/about/grin.jpg', link: '/portfolio' },
    ];
}
