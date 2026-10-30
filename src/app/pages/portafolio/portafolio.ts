import { afterNextRender, Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { RevealDirective } from '../../directives/reveal';
import { whatsappLink } from '../../config/contact';
import { DiagonalGalleryComponent } from '../../components/diagonal-gallery/diagonal-gallery';
import { GALLERY_COLUMNS, PORTFOLIO_FILTERS, PORTFOLIO_ITEMS, RECENT_WORKS, STACK_CASES } from './portafolio.data';

/** Desfase vertical de las tarjetas según su columna, para una cuadrícula escalonada */
const OFFSETS = ['', 'lg:mt-24', 'lg:mt-12'];

@Component({
    selector: 'app-portafolio',
    standalone: true,
    imports: [RouterLink, RevealDirective, DiagonalGalleryComponent],
    templateUrl: './portafolio.html',
})
export class PortafolioComponent {
    private host = inject<ElementRef<HTMLElement>>(ElementRef);
    private destroyRef = inject(DestroyRef);

    grid = viewChild.required<ElementRef<HTMLElement>>('grid');

    filters = PORTFOLIO_FILTERS;
    items = PORTFOLIO_ITEMS;
    stack = STACK_CASES;
    galleryColumns = GALLERY_COLUMNS;
    recent = RECENT_WORKS;
    marqueeNames = [...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS].map(i => i.title);
    titleLine1 = 'CASOS QUE'.split('');
    titleLine2 = 'HABLAN'.split('');
    whatsappUrl = whatsappLink('¡Hola! Vi su portafolio y me gustaría conversar sobre un proyecto.');

    active = signal('Todos');

    private reduceMotion = false;

    constructor() {
        afterNextRender(() => {
            gsap.registerPlugin(ScrollTrigger, Flip);
            this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (this.reduceMotion) return;

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

    setFilter(filter: string) {
        if (filter === this.active()) return;
        this.active.set(filter);

        const grid = this.grid().nativeElement;
        const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-card]'));
        const state = this.reduceMotion ? null : Flip.getState(cards);
        const startHeight = grid.offsetHeight;

        let visibleIndex = 0;
        cards.forEach((card) => {
            const show = filter === 'Todos' || card.dataset['group'] === filter;
            card.classList.toggle('hidden', !show);
            OFFSETS.forEach(o => o && card.classList.remove(...o.split(' ')));
            if (show) {
                const offset = OFFSETS[visibleIndex % OFFSETS.length];
                if (offset) card.classList.add(...offset.split(' '));
                visibleIndex++;
            }
        });

        if (!state) return;

        // Flip saca las tarjetas del flujo y la cuadrícula se encogería de golpe, subiendo las secciones de abajo.
        // Se mantiene el alto anterior y se anima hasta el nuevo.
        grid.style.minHeight = '0px';
        const endHeight = grid.offsetHeight;
        gsap.killTweensOf(grid);
        gsap.fromTo(grid, { minHeight: startHeight }, { minHeight: endHeight, duration: 0.8, ease: 'power3.inOut', onComplete: () => { gsap.set(grid, { clearProps: 'minHeight' }); ScrollTrigger.refresh(); } });

        Flip.from(state, {
            duration: 0.8,
            ease: 'power3.inOut',
            absolute: true,
            stagger: 0.05,
            onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, delay: 0.25 }),
            onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.3 }),
            onComplete: () => ScrollTrigger.refresh(),
        });
    }
}
