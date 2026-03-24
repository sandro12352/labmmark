import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs';
import { SocialSidebarComponent } from './components/social-sidebar/social-sidebar';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, SocialSidebarComponent, WhatsappButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.init();
  }
}
