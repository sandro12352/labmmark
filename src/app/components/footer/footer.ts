import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ADDRESS_LINES, EMAIL, FACEBOOK_URL, INSTAGRAM_URL, LINKEDIN_URL, MAP_LINK, PHONE_DISPLAY, TIKTOK_URL, whatsappLink } from '../../config/contact';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './footer.html',
    styleUrl: './footer.css',
})
export class FooterComponent {
    private router = inject(Router);

    currentYear = new Date().getFullYear();

    navLinks = [
        { label: 'Inicio', path: '/' },
        { label: 'Planes', path: '/planes' },
        { label: 'Nosotros', path: '/nosotros' },
        { label: 'Portafolio', path: '/portafolio' },
        { label: 'Contacto', path: '/contacto' },
    ];

    // Los mismos servicios de la sección Servicios del inicio, a la que llevan todos los enlaces
    services = [
        'Branding',
        'Social Media',
        'Diseño Web',
        'Publicidad Digital',
        'Marketing de Contenido',
        'Estrategia Digital',
        'Analítica y Optimización',
        'Automatización Comercial',
    ];

    email = EMAIL;
    phone = PHONE_DISPLAY;
    whatsappUrl = whatsappLink('¡Hola! Me gustaría conversar sobre un proyecto.');
    address = ADDRESS_LINES.join(', ');
    mapLink = MAP_LINK;

    socialLinks = [
        { name: 'Instagram', url: INSTAGRAM_URL },
        { name: 'Facebook', url: FACEBOOK_URL },
        { name: 'TikTok', url: TIKTOK_URL },
        { name: 'LinkedIn', url: LINKEDIN_URL },
    ];

    /** Lleva a la sección de servicios del inicio, con el mismo desplazamiento suave que el menú */
    goToServices(event: Event) {
        event.preventDefault();
        const scroll = () => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
        const path = this.router.url.split(/[?#]/)[0];

        if (path === '/') {
            scroll();
        } else {
            this.router.navigate(['/']).then(() => setTimeout(scroll, 500));
        }
    }
}
