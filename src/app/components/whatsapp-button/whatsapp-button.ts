import { Component, signal } from '@angular/core';
import { WHATSAPP_NUMBER } from '../../config/contact';

@Component({
    selector: 'app-whatsapp-button',
    standalone: true,
    templateUrl: './whatsapp-button.html',
})
export class WhatsappButtonComponent {
    isHovered = signal(false);
    showTooltip = signal(false);

    readonly whatsappNumber = WHATSAPP_NUMBER;
    readonly defaultMessage = '¡Hola! Quiero hablar con ustedes sobre mi marca.';

    get whatsappUrl(): string {
        const msg = encodeURIComponent(this.defaultMessage);
        return `https://wa.me/${this.whatsappNumber}?text=${msg}`;
    }

    constructor() {
        // El mensaje aparece a los 4 segundos y se queda fijo
        setTimeout(() => this.showTooltip.set(true), 4000);
    }
}
