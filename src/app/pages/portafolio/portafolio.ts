import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RevealDirective } from '../../directives/reveal';
import { whatsappLink } from '../../config/contact';
import { DiagonalGalleryComponent } from '../../components/diagonal-gallery/diagonal-gallery';
import { GALLERY_COLUMNS, PORTFOLIO_ITEMS, RECENT_WORKS, STACK_CASES } from './portafolio.data';

@Component({
    selector: 'app-portafolio',
    standalone: true,
    imports: [RouterLink, RevealDirective, DiagonalGalleryComponent],
    templateUrl: './portafolio.html',
})
export class PortafolioComponent {
    private host = inject<ElementRef<HTMLElement>>(ElementRef);
    private destroyRef = inject(DestroyRef);

    items = PORTFOLIO_ITEMS;
    stack = STACK_CASES;
    galleryColumns = GALLERY_COLUMNS;
    recent = RECENT_WORKS;
    marqueeNames = [...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS].map(i => i.title);
    titleLine1 = 'CASOS QUE'.split('');
    titleLine2 = 'HABLAN'.split('');
    whatsappUrl = whatsappLink('¡Hola! Vi su portafolio y me gustaría conversar sobre un proyecto.');

    constructor() {
        afterNextRender(() => {
            gsap.registerPlugin(ScrollTrigger);
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            const root = this.host.nativeElement;
            const q = gsap.utils.selector(root);

            const ctx = gsap.context(() => {
                // Título: letras que entran desde un lado
                gsap.from(q('.pf-char'), { x: 150, opacity: 0, duration: 0.7, delay: 0.2, stagger: 0.025, ease: 'power4.out' });

                // Cinta de nombres: avanza sola y se frena al pasar el mouse
                const track = q('.pf-marquee-track')[0];
                if (track) {
                    const tween = gsap.to(track, { xPercent: -50, duration: 50, ease: 'none', repeat: -1 });
                    const band = track.parentElement as HTMLElement;
                    band.addEventListener('mouseenter', () => gsap.to(tween, { timeScale: 0.15, duration: 0.5 }));
                    band.addEventListener('mouseleave', () => gsap.to(tween, { timeScale: 1, duration: 0.5 }));
                }

                // Parallax: la imagen se desplaza dentro de su marco al hacer scroll
                q('[data-parallax]').forEach((img) => {
                    const end = Number((img as HTMLElement).dataset['parallax']);
                    gsap.fromTo(img, { yPercent: 0 }, {
                        yPercent: -end,
                        ease: 'none',
                        scrollTrigger: { trigger: img.parentElement!.parentElement!, start: 'top bottom', end: 'bottom top', scrub: true },
                    });
                });

                // Tarjetas apiladas: la anterior se aleja y se oscurece mientras la siguiente sube por encima
                const stackCards = q('.stack-card');
                stackCards.forEach((card, i) => {
                    const next = stackCards[i + 1];
                    if (!next) return;
                    const trigger = { trigger: next, start: 'top 95%', end: 'top 14%', scrub: true };
                    gsap.fromTo(card, { scale: 1 }, { scale: 0.92, transformOrigin: 'center top', ease: 'none', scrollTrigger: trigger });
                    gsap.fromTo(card.querySelector('.stack-dim'), { opacity: 0 }, { opacity: 0.7, ease: 'none', scrollTrigger: trigger });
                });

                // Cursor "VER CASO" sobre las tarjetas (solo con mouse)
                const cursor = q('.pf-cursor')[0];
                if (cursor && window.matchMedia('(hover: hover)').matches) {
                    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
                    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.4, ease: 'power3' });
                    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.4, ease: 'power3' });

                    let shown = false;
                    let lastX = -1;
                    let lastY = -1;
                    let frame = 0;

                    // 'auto': solo reemplaza escala y opacidad; con overwrite: true se cancelaría también el seguimiento
                    const toggle = (show: boolean) => {
                        if (show === shown) return;
                        shown = show;
                        gsap.to(cursor, {
                            scale: show ? 1 : 0,
                            opacity: show ? 1 : 0,
                            duration: show ? 0.35 : 0.25,
                            ease: show ? 'back.out(1.7)' : 'power2.out',
                            overwrite: 'auto',
                        });
                    };

                    // Se decide por lo que hay bajo el mouse, también al hacer scroll con el mouse quieto
                    const update = () => {
                        frame = 0;
                        toggle(!!document.elementFromPoint(lastX, lastY)?.closest('[data-card] a, [data-cursor]'));
                    };
                    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
                    const onMove = (e: MouseEvent) => { lastX = e.clientX; lastY = e.clientY; moveX(lastX); moveY(lastY); schedule(); };
                    const onLeave = () => toggle(false);

                    window.addEventListener('mousemove', onMove, { passive: true });
                    window.addEventListener('scroll', schedule, { passive: true });
                    document.documentElement.addEventListener('mouseleave', onLeave);
                    this.destroyRef.onDestroy(() => {
                        cancelAnimationFrame(frame);
                        window.removeEventListener('mousemove', onMove);
                        window.removeEventListener('scroll', schedule);
                        document.documentElement.removeEventListener('mouseleave', onLeave);
                    });
                }
            }, root);

            this.destroyRef.onDestroy(() => ctx.revert());
        });
    }
}
