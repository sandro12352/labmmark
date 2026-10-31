import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { whatsappLink } from '../../config/contact';
import { HeroComponent } from '../../components/hero/hero';
import { ServicesComponent } from '../../components/services/services';
import { AboutComponent } from '../../components/about/about';
import { PortfolioComponent } from '../../components/portfolio/portfolio';
import { TestimonialsComponent } from '../../components/testimonials/testimonials';
import { BrandsCarouselComponent } from '../../components/brands-carousel/brands-carousel';
import { EstrategiaComponent } from '../../components/estrategia/estrategia.component';
import { ProgramsComponent } from '../../components/programs/programs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ServicesComponent,
    AboutComponent,
    PortfolioComponent,
    TestimonialsComponent,
    BrandsCarouselComponent,
    EstrategiaComponent,
    ProgramsComponent,
    RouterLink,
  ],
  template: `
    <main>
      <app-hero />

       @defer  {
        <app-estrategia/>
      } @placeholder {
        <div id="portafolio" class="min-h-screen"></div>
      }
      
      @defer  {
        <app-portfolio />
      } @placeholder {
        <div id="portafolio" class="min-h-screen"></div>
      }

      
      @defer  {
        <app-services />
      } @placeholder {
        <div id="servicios" class="min-h-screen"></div>
      }

      @defer {
        <app-programs />
      } @placeholder {
        <div id="planes" class="min-h-[70vh]"></div>
      }

      @defer {
        <app-about />
      } @placeholder {
        <div id="nosotros" class="min-h-screen"></div>
      }

      

      @defer  {
        <app-testimonials />
      } @placeholder {
        <div class="min-h-[60vh]"></div>
      }

      @defer  {
        <app-brands-carousel />
      } @placeholder {
        <div class="min-h-[20vh]"></div>
      }

      <!-- Cierre -->
      <section class="relative py-24 lg:py-32 bg-lm-black border-t border-lm-graphite/30" aria-labelledby="cta-title">
        <div class="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-px bg-lm-silver"></div>
              <span class="text-xs text-lm-silver tracking-[0.3em] uppercase font-body">Contacto</span>
            </div>
            <h2 id="cta-title" class="font-display text-4xl sm:text-5xl lg:text-6xl font-800 tracking-[-0.03em] text-lm-white leading-[1.1]">
              ¿LISTO PARA<br><span class="text-lm-silver">TRANSFORMAR</span><br>TU MARCA<span class="text-lm-violet">?</span>
            </h2>
          </div>
          <div class="flex flex-col sm:flex-row gap-4">
            <a routerLink="/contacto"
              class="group inline-flex items-center justify-between gap-3 px-8 py-4 bg-lm-white text-lm-black font-display font-700 text-sm tracking-[0.1em] hover:bg-lm-violet transition-colors duration-300">
              ESCRÍBENOS
              <svg class="transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a [href]="whatsappUrl" target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center justify-center px-8 py-4 border border-lm-silver/40 text-lm-white font-display font-700 text-sm tracking-[0.1em] hover:border-lm-violet hover:text-lm-violet transition-colors duration-300">
              WHATSAPP
            </a>
          </div>
        </div>
      </section>
    </main>
  `,
})
export class HomeComponent {
  whatsappUrl = whatsappLink('¡Hola! Me gustaría conversar sobre un proyecto.');
}
