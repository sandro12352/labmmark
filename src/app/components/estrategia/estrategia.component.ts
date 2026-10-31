import { RevealDirective } from '../../directives/reveal';
import { afterNextRender, Component, DestroyRef, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { HABLEMOS_URL } from '../../config/contact';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-estrategia',
  imports: [RevealDirective, NgClass],
  templateUrl: './estrategia.component.html',
  styleUrl: './estrategia.component.css',
})
export class EstrategiaComponent {
  private destroyRef = inject(DestroyRef);

  hablemosUrl = HABLEMOS_URL;

  readonly isModalOpen = signal<boolean>(false);

  steps = [
    {
      title: 'Descubrimiento',
      text: 'Entendemos profundamente tu negocio, audiencia y objetivos para crear una estrategia personalizada.',
    },
    {
      title: 'Estrategia',
      text: 'Desarrollamos un plan detallado basado en datos, insights de mercado y mejores prácticas de la industria.',
    },
    {
      title: 'Ejecución',
      text: 'Nuestro equipo creativo implementa la estrategia con diseño de calidad premium y tecnología de punta.',
    },
    {
      title: 'Optimización',
      text: 'Monitoreamos resultados, analizamos métricas y optimizamos continuamente para máximo impacto.',
    },
  ];

  processStepsRef = viewChild<ElementRef<HTMLElement>>('processSteps');
  lineProgress = signal(0);

  constructor() {
    afterNextRender(() => {
      const el = this.processStepsRef()?.nativeElement;
      const line = el?.querySelector('.process-line');
      if (!el || !line) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(line, { scaleX: 1 });
        this.lineProgress.set(1);
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      // La línea se dibuja con el scroll; el progreso también enciende cada paso
      const tween = gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 0.5,
            onUpdate: (self) => this.lineProgress.set(self.progress),
          },
        },
      );

      this.destroyRef.onDestroy(() => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    });
  }

  isStepActive(stepIndex: number): boolean {
    return this.lineProgress() >= (stepIndex + 0.5) / this.steps.length;
  }

  openModal() {
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden'; // Previene scroll mientras el modal está abierto
  }

  closeModal() {
    this.isModalOpen.set(false);
    document.body.style.overflow = '';
  }

  // Cerrar modal al presionar la tecla ESC
  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isModalOpen()) {
      this.closeModal();
    }
  }
}
