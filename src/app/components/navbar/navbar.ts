import { Component, signal, computed, HostListener, inject } from '@angular/core';
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
    isHidden = signal(false);
    private lastScrollY = 0;
    mobileMenuOpen = signal(false);

    navLinks: { label: string; fragment: string; route?: string }[] = [
        { label: 'Inicio', fragment: '' },
        { label: 'Programas', fragment: 'programas', route: '/programas' },
        { label: 'Nosotros', fragment: 'nosotros', route: '/nosotros' },
        { label: 'Portafolio', fragment: 'portafolio', route: '/portafolio' },
        { label: 'Contacto', fragment: 'contacto', route: '/contacto' },
    ];

    navClasses = computed(() => {
        const state = this.isScrolled()
            ? 'bg-lm-black/80 backdrop-blur-md shadow-2xl border-b border-lm-graphite'
            : 'bg-transparent';
        return this.isHidden() ? state + ' -translate-y-full' : state;
    });

    @HostListener('window:scroll')
    onScroll() {
        const y = window.scrollY;
        this.isScrolled.set(y > 50);

        // Se oculta al bajar (pasado el hero) y reaparece al subir; con el menú móvil abierto siempre visible
        const goingDown = y > this.lastScrollY;
        this.isHidden.set(goingDown && y > 200 && !this.mobileMenuOpen());
        this.lastScrollY = y;
    }

    toggleMenu() {
        this.mobileMenuOpen.update((v) => !v);
    }

    closeMenu() {
        this.mobileMenuOpen.set(false);
    }

    navigateTo(link: { label: string; fragment: string; route?: string }) {
        this.closeMenu();

        // If the link has a dedicated route, navigate to it
        if (link.route) {
            this.router.navigate([link.route]);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        this.scrollTo(link.fragment);
    }

    goToContact() {
        this.closeMenu();
        this.router.navigate(['/contacto']);
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
