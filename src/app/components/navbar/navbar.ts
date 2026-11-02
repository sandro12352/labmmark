import { Component, signal, computed, HostListener, inject, viewChild, ElementRef, DestroyRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { onPlainClick } from '../../utils/plain-click';
import { ADDRESS_LINES, EMAIL, FACEBOOK_URL, INSTAGRAM_URL, LINKEDIN_URL, HABLEMOS_URL, MAP_LINK, PHONE_DISPLAY, TIKTOK_URL, whatsappLink } from '../../config/contact';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
export class NavbarComponent {
    private router = inject(Router);
    private doc = inject(DOCUMENT);
    private destroyRef = inject(DestroyRef);

    menuBtn = viewChild<ElementRef<HTMLButtonElement>>('menuBtn');
    closeBtn = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');

    email = EMAIL;
    phone = PHONE_DISPLAY;
    address = ADDRESS_LINES.join(', ');
    mapLink = MAP_LINK;
    hablemosUrl = HABLEMOS_URL;
    whatsappUrl = whatsappLink('¡Hola! Me interesa saber más sobre los servicios de LABMMARK.');
    socials = [
        { name: 'Instagram', url: INSTAGRAM_URL },
        { name: 'Facebook', url: FACEBOOK_URL },
        { name: 'TikTok', url: TIKTOK_URL },
        { name: 'LinkedIn', url: LINKEDIN_URL },
    ];

    isScrolled = signal(false);
    isHidden = signal(false);
    private lastScrollY = 0;
    menuOpen = signal(false);
    /** Pasada la entrada escalonada, las opciones dejan de tener retraso para que el hover responda al instante */
    menuReady = signal(false);
    private readyTimer?: ReturnType<typeof setTimeout>;

    constructor() {
        this.destroyRef.onDestroy(() => {
            clearTimeout(this.readyTimer);
            this.doc.body.style.overflow = '';
        });
    }

    navLinks: { label: string; fragment: string; route?: string }[] = [
        { label: 'Inicio', fragment: '' },
        { label: 'Planes', fragment: 'planes', route: '/planes' },
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

        // Se oculta al bajar (pasado el hero) y reaparece al subir; con el menú abierto siempre visible
        const goingDown = y > this.lastScrollY;
        this.isHidden.set(goingDown && y > 200 && !this.menuOpen());
        this.lastScrollY = y;
    }

    @HostListener('document:keydown.escape')
    onEscape() {
        if (this.menuOpen()) this.closeMenu();
    }

    toggleMenu() {
        this.menuOpen() ? this.closeMenu() : this.openMenu();
    }

    openMenu() {
        this.menuOpen.set(true);
        this.doc.body.style.overflow = 'hidden';
        clearTimeout(this.readyTimer);
        this.readyTimer = setTimeout(() => this.menuReady.set(true), 1300);
        setTimeout(() => this.closeBtn()?.nativeElement.focus(), 500);
    }

    closeMenu() {
        if (!this.menuOpen()) return;
        this.menuOpen.set(false);
        this.menuReady.set(false);
        clearTimeout(this.readyTimer);
        this.doc.body.style.overflow = '';
        this.menuBtn()?.nativeElement.focus({ preventScroll: true });
    }

    /** Marca en el menú la página donde está el visitante */
    isActive(link: { route?: string }): boolean {
        const path = this.router.url.split(/[?#]/)[0];
        return link.route ? path.startsWith(link.route) : path === '/';
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

    /** Los enlaces llevan su dirección real (href) para que Google pueda seguirlos */
    onLink = onPlainClick;

    /** Va a una página desde los enlaces pequeños del menú */
    goTo(path: string) {
        this.closeMenu();
        this.router.navigate([path]);
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
