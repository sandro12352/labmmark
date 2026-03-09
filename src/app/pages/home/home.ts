import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero';
import { ServicesComponent } from '../../components/services/services';
import { AboutComponent } from '../../components/about/about';
import { PortfolioComponent } from '../../components/portfolio/portfolio';
import { TestimonialsComponent } from '../../components/testimonials/testimonials';
import { ContactComponent } from '../../components/contact/contact';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        HeroComponent,
        ServicesComponent,
        AboutComponent,
        PortfolioComponent,
        TestimonialsComponent,
        ContactComponent,
    ],
    template: `
    <main>
      <app-hero />
      <app-services />
      <app-about />
      <app-portfolio />
      <app-testimonials />
      <app-contact />
    </main>
  `,
})
export class HomeComponent { }
