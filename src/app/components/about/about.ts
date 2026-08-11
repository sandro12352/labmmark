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
        { title: 'Martial', image: 'assets/about/img1.webp', link: '/portfolio' },
        { title: 'Oigo', image: 'assets/about/img2.webp', link: '/portfolio' },
        { title: 'Tis', image: 'assets/about/img3.webp', link: '/portfolio' },
        { title: 'Grin', image: 'assets/about/img4.webp', link: '/portfolio' },
    ];
}
