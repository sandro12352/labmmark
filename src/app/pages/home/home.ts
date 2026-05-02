import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero';
import { ServicesComponent } from '../../components/services/services';
import { AboutComponent } from '../../components/about/about';
import { PortfolioComponent } from '../../components/portfolio/portfolio';
import { TestimonialsComponent } from '../../components/testimonials/testimonials';
import { ContactComponent } from '../../components/contact/contact';
import { BrandsCarouselComponent } from '../../components/brands-carousel/brands-carousel';

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
    ContactComponent,
  ],
  template: `
    <main>
      <app-hero />
      
      @defer (on viewport; prefetch on idle) {
        <app-portfolio />
      } @placeholder {
        <div id="portafolio" class="min-h-screen"></div>
      }

      
      @defer (on viewport; prefetch on idle) {
        <app-services />
      } @placeholder {
        <div id="servicios" class="min-h-screen"></div>
      }

      @defer (on viewport; prefetch on idle) {
        <app-about />
      } @placeholder {
        <div id="nosotros" class="min-h-screen"></div>
      }

      

      @defer (on viewport; prefetch on idle) {
        <app-testimonials />
      } @placeholder {
        <div class="min-h-[60vh]"></div>
      }

      @defer (on viewport; prefetch on idle) {
        <app-brands-carousel />
      } @placeholder {
        <div class="min-h-[20vh]"></div>
      }

      @defer (on viewport; prefetch on idle) {
        <app-contact />
      } @placeholder {
        <div id="contacto" class="min-h-screen"></div>
      }
    </main>
  `,
})
export class HomeComponent { }
