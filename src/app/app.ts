import { afterNextRender, Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { SocialSidebarComponent } from './components/social-sidebar/social-sidebar';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button';
import { SeoService } from './services/seo.service';
import AOS from 'aos';
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
      AOS.init({
        duration: 800,
        once: false, // Animación solo la primera vez que hace scroll
        mirror: true,
      });

      // 2. Escuchamos cada cambio de ruta para recalculaciones del DOM
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          setTimeout(() => AOS.refresh(), 100);
        });
    });
  }

  ngOnInit() {
    this.seoService.init();
  }
}
