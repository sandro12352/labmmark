import { afterNextRender, Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { SocialSidebarComponent } from './components/social-sidebar/social-sidebar';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button';
import { SeoService } from './services/seo.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, SocialSidebarComponent, WhatsappButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private seoService = inject(SeoService);
  private router = inject(Router);
  constructor() {
    afterNextRender(() => {
      // Cada cambio de ruta altera el alto de la página: se recalculan las posiciones de los triggers
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe(async (event) => {
          // La página nueva empieza arriba. Se sube al instante y antes del refresh: ScrollTrigger guarda la posición
          // actual y la vuelve a poner, así que con la posición vieja deshacía la subida (y no depende de que el
          // navegador ejecute la transición entre páginas). Si la ruta lleva ancla (#), la subida la hace cada enlace.
          if (!event.urlAfterRedirects.includes('#')) {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }
          const { ScrollTrigger } = await import('gsap/ScrollTrigger');
          setTimeout(() => ScrollTrigger.refresh(), 100);
        });
    });
  }

  ngOnInit() {
    this.seoService.init();
  }
}
