import { Component, signal, HostListener } from '@angular/core';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
export class NavbarComponent {
    isScrolled = signal(false);
    mobileMenuOpen = signal(false);

    navLinks = [
        { label: 'Inicio', path: '/', fragment: '' },
        { label: 'Servicios', path: '/', fragment: 'servicios' },
        { label: 'Nosotros', path: '/', fragment: 'nosotros' },
        { label: 'Portafolio', path: '/', fragment: 'portafolio' },
        { label: 'Contacto', path: '/', fragment: 'contacto' },
    ];

    @HostListener('window:scroll')
    onScroll() {
        this.isScrolled.set(window.scrollY > 50);
    }

    toggleMenu() {
        this.mobileMenuOpen.update((v) => !v);
    }

    closeMenu() {
        this.mobileMenuOpen.set(false);
    }

    scrollTo(fragment: string) {
        this.closeMenu();
        if (!fragment) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const el = document.getElementById(fragment);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
