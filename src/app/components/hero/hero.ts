import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

@Component({
    selector: 'app-hero',
    standalone: true,
    templateUrl: './hero.html',
    styleUrl: './hero.css',
})
export class HeroComponent {
    private router = inject(Router);
    private host = inject<ElementRef<HTMLElement>>(ElementRef);
    private destroyRef = inject(DestroyRef);

    constructor() {
        afterNextRender(() => {
            const q = gsap.utils.selector(this.host.nativeElement);

            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                gsap.set(q('.hero-tag, .hero-word, .hero-sub, .hero-cta'), { opacity: 1 });
                return;
            }

            const ctx = gsap.context(() => {
                gsap.fromTo(q('.hero-video'), { scale: 1.12 }, { scale: 1, duration: 2.6, ease: 'power2.out' });

                gsap.timeline({ defaults: { ease: 'power3.out' } })
                    .fromTo(q('.hero-tag'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
                    .fromTo(q('.hero-word'), { yPercent: 110, opacity: 1 }, { yPercent: 0, duration: 1, stagger: 0.12 }, '-=0.3')
                    .fromTo(q('.hero-sub'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
                    .fromTo(q('.hero-cta'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5');
            });

            this.destroyRef.onDestroy(() => ctx.revert());
        });
    }

    goToContact() {
        this.router.navigate(['/contacto']);
    }

    scrollTo(fragment: string) {
        const isHome = this.router.url === '/' || this.router.url.startsWith('/#');
        if (isHome) {
            const el = document.getElementById(fragment);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            this.router.navigate(['/'], { fragment }).then(() => {
                setTimeout(() => {
                    const el = document.getElementById(fragment);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 300);
            });
        }
    }
}
