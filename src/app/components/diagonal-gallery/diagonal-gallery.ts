import { afterNextRender, Component, DestroyRef, ElementRef, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';

export interface GalleryItem {
    slug: string;
    title: string;
    category: string;
    image: string;
    width: number;
    height: number;
}

/**
 * Veces que se repite cada columna. Con solo dos copias, al avanzar una vuelta completa la ventana visible
 * (que además está inclinada) se sale del final de la columna y quedan huecos; con cuatro, la ventana siempre
 * queda dentro del contenido.
 */
const COPIES = 4;

/** Duración (s) de una vuelta (el alto de una copia) de cada columna; distintas para que no se muevan al unísono */
const DURATIONS = [58, 72, 64];

/**
 * Columnas inclinadas de piezas que suben y bajan en bucle (las pares suben, las impares bajan).
 * Cada columna se pinta varias veces y se desplaza exactamente el alto de una copia, así el bucle no tiene corte.
 */
@Component({
    selector: 'app-diagonal-gallery',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './diagonal-gallery.html',
})
export class DiagonalGalleryComponent {
    columns = input.required<GalleryItem[][]>();
    copies = Array.from({ length: COPIES }, (_, i) => i);

    private host = inject<ElementRef<HTMLElement>>(ElementRef);
    private destroyRef = inject(DestroyRef);

    constructor() {
        afterNextRender(() => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            const root = this.host.nativeElement;
            const tweens: gsap.core.Tween[] = [];

            const ctx = gsap.context(() => {
                gsap.utils.toArray<HTMLElement>('.gd-track', root).forEach((track, i) => {
                    const up = i % 2 === 0;
                    tweens.push(gsap.fromTo(track, { yPercent: up ? 0 : -100 / COPIES }, {
                        yPercent: up ? -100 / COPIES : 0,
                        duration: DURATIONS[i % DURATIONS.length],
                        ease: 'none',
                        repeat: -1,
                    }));
                });
            }, root);

            // Se frena al pasar el mouse para poder ver las piezas
            const slow = () => tweens.forEach(t => gsap.to(t, { timeScale: 0.15, duration: 0.6, overwrite: 'auto' }));
            const resume = () => tweens.forEach(t => gsap.to(t, { timeScale: 1, duration: 0.6, overwrite: 'auto' }));
            root.addEventListener('mouseenter', slow);
            root.addEventListener('mouseleave', resume);

            // Fuera de pantalla no hace falta animar
            const observer = new IntersectionObserver(([entry]) => {
                tweens.forEach(t => entry.isIntersecting ? t.resume() : t.pause());
            });
            observer.observe(root);

            this.destroyRef.onDestroy(() => {
                observer.disconnect();
                root.removeEventListener('mouseenter', slow);
                root.removeEventListener('mouseleave', resume);
                ctx.revert();
            });
        });
    }
}
