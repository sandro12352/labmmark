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
      <app-services />
      <app-about />
      <app-portfolio />
      <app-testimonials />
      <app-brands-carousel />
      <app-contact />
    </main>
  `,
})
export class HomeComponent { }
