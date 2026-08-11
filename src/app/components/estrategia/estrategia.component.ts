import { Component, HostListener, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Brand } from '../brands-carousel/brands-carousel';

@Component({
  selector: 'app-estrategia',
  imports: [],
  templateUrl: './estrategia.component.html',
  styleUrl: './estrategia.component.css',
})
export class EstrategiaComponent {
  private sanitizer = inject(DomSanitizer);

  readonly isModalOpen = signal<boolean>(false);


  brands: Brand[] = [
    { name: 'Martialcore', logo: 'brands/martial.webp' },
    { name: 'Profe Altoque', logo: 'brands/profe.webp' },
    { name: 'Oigo Salud', logo: 'brands/oigo.webp' },
    { name: 'Tis Martial', logo: 'brands/tis.webp' },
    { name: 'Tecnograss', logo: 'brands/tecnograss.webp' },
    { name: 'Grin Perú', logo: 'brands/grin.webp' },

  ];

  // Sanitizamos la URL al inicializar la propiedad
  readonly videoUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    './assets/videos/hero-video.mp4'
  );

  openModal() {
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden'; // Previene scroll mientras el modal está abierto
  }

  closeModal() {
    this.isModalOpen.set(false);
    document.body.style.overflow = 'auto';
  }

  // Cerrar modal al presionar la tecla ESC
  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isModalOpen()) {
      this.closeModal();
    }
  }
}
