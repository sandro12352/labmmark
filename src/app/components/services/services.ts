import { RevealDirective } from '../../directives/reveal';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { whatsappLink } from '../../config/contact';
import { HlmCarouselImports } from '@ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import AutoScroll from 'embla-carousel-auto-scroll';

import { Service, SERVICES } from './services.data';

@Component({
    selector: 'app-services',
    standalone: true,
    imports: [CommonModule, RouterLink, ...HlmCarouselImports, RevealDirective],
    templateUrl: './services.html',
    styleUrl: './services.css',
})
export class ServicesComponent {
    services: Service[] = SERVICES;

    /** Enlace a WhatsApp con un mensaje listo sobre el servicio */
    whatsappUrl(service: Service): string {
        return whatsappLink(`¡Hola! Me interesa recibir más información sobre el servicio de ${service.title}.`);
    }

    carouselOptions = {
        align: 'start' as const,
        loop: true,
        slidesToScroll: 1,
    };
}
