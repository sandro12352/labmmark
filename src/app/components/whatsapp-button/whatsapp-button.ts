import { Component, signal } from '@angular/core';
import { WHATSAPP_NUMBER } from '../../config/contact';

@Component({
    selector: 'app-whatsapp-button',
    standalone: true,
    templateUrl: './whatsapp-button.html',
})
export class WhatsappButtonComponent {
    isHovered = signal(false);
    showTooltip = signal(true);

    readonly whatsappNumber = WHATSAPP_NUMBER;
    readonly defaultMessage = '¡Hola! Me interesa saber más sobre los servicios de LABMMARK.';

    get whatsappUrl(): string {
        const msg = encodeURIComponent(this.defaultMessage);
        return `https://wa.me/${this.whatsappNumber}?text=${msg}`;
    }

    constructor() {
        // Auto-hide tooltip after 5 seconds
        setTimeout(() => this.showTooltip.set(false), 5000);
    }
}
