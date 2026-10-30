import { Component } from '@angular/core';
import { FACEBOOK_URL, INSTAGRAM_URL, LINKEDIN_URL, TIKTOK_URL } from '../../config/contact';

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
        { name: 'Instagram', url: INSTAGRAM_URL },
        { name: 'Facebook', url: FACEBOOK_URL },
        { name: 'TikTok', url: TIKTOK_URL },
        { name: 'LinkedIn', url: LINKEDIN_URL },
    ];
}
