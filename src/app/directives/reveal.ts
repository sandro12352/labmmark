import { afterNextRender, Directive, ElementRef, inject, input, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export type RevealEffect =
  | 'fade-up'
  | 'fade-right'
  | 'fade-left'
  | 'zoom-in-up'
  | 'fade-down-right'
  | 'fade-up-left'
  | 'reveal-up'
  | 'fade'
  | 'zoom-in'
  | 'rise'
  | 'pop';

const EFFECTS: Record<RevealEffect, gsap.TweenVars> = {
  'fade-up': { y: 40 },
  'fade-right': { x: -40 },
  'fade-left': { x: 40 },
  'zoom-in-up': { y: 50, scale: 0.9 },
  'fade-down-right': { x: -40, y: -40 },
  'fade-up-left': { x: 40, y: 40 },
  // Se destapa de abajo hacia arriba; mantiene opacity 1 para que la máscara sea lo único que se anima
  'reveal-up': { clipPath: 'inset(100% 0% 0% 0%)', opacity: 1 },
  // Solo fundido, sin desplazamiento
  'fade': {},
  // Empieza un poco más grande y se asienta; pensado para imágenes dentro de un contenedor con overflow-hidden
  'zoom-in': { scale: 1.08 },
  // El texto sube desde dentro de un contenedor con overflow-hidden (máscara)
  'rise': { yPercent: 110, opacity: 1 },
  // Aparece creciendo desde cero; sin fundido para no chocar con animaciones CSS de opacidad
  'pop': { scale: 0, opacity: 1 },
};

const EASES: Record<string, string> = {
  'ease-out-back': 'back.out(1.4)',
  'ease-out-cubic': 'power3.out',
  'ease-in-out': 'sine.inOut',
};

// Las secciones con @defer cambian el alto de la página al cargar: se recalculan las posiciones una sola vez.
let refreshTimer: ReturnType<typeof setTimeout> | undefined;
function scheduleRefresh() {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
}

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnDestroy {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private tween?: gsap.core.Tween;

  appReveal = input<RevealEffect | ''>('fade-up');
  revealDelay = input(0);
  revealDuration = input(800);
  revealEase = input('');

  constructor() {
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.registerPlugin(ScrollTrigger);

      const effect = EFFECTS[this.appReveal() || 'fade-up'];
      const ease = EASES[this.revealEase()] ?? 'power2.out';

      this.tween = gsap.from(this.el.nativeElement, {
        opacity: 0,
        ...effect,
        duration: this.revealDuration() / 1000,
        delay: this.revealDelay() / 1000,
        ease,
        clearProps: 'opacity,transform,clipPath',
        scrollTrigger: {
          trigger: this.el.nativeElement,
          start: 'top 90%',
          once: true,
        },
      });

      scheduleRefresh();
    });
  }

  ngOnDestroy() {
    this.tween?.scrollTrigger?.kill();
    this.tween?.kill();
  }
}
