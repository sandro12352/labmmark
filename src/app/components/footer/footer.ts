import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.html',
    styleUrl: './footer.css',
})
export class FooterComponent {
    currentYear = new Date().getFullYear();

    footerLinks = [
        {
            title: 'Servicios',
            links: ['Branding', 'Social Media', 'Diseño Web', 'Publicidad Digital'],
        },
        {
            title: 'Empresa',
            links: ['Nosotros', 'Portafolio', 'Blog', 'Carreras'],
        },
        {
            title: 'Legal',
            links: ['Privacidad', 'Términos', 'Cookies'],
        },
    ];

    socialLinks = [
        { name: 'Instagram', url: '#' },
        { name: 'LinkedIn', url: '#' },
        { name: 'TikTok', url: '#' },
        { name: 'Behance', url: '#' },
    ];
}
