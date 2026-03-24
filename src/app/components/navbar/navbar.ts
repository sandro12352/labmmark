import { Component, signal, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
export class NavbarComponent {
    private router = inject(Router);

    isScrolled = signal(false);
    mobileMenuOpen = signal(false);

    navLinks = [
        { label: 'Inicio', fragment: '' },
        { label: 'Servicios', fragment: 'servicios' },
        { label: 'Nosotros', fragment: 'nosotros' },
        { label: 'Portafolio', fragment: 'portafolio' },
        { label: 'Contacto', fragment: 'contacto' },
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

        const isHome = this.router.url === '/' || this.router.url.startsWith('/#');

        if (isHome) {
            if (!fragment) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const el = document.getElementById(fragment);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            this.router.navigate(['/'], { fragment: fragment || undefined }).then(() => {
                setTimeout(() => {
                    if (!fragment) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        const el = document.getElementById(fragment);
                        if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                }, 300);
            });
        }
    }
}
