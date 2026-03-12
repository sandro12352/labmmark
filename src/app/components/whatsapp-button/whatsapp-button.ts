import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-whatsapp-button',
    standalone: true,
    templateUrl: './whatsapp-button.html',
    styleUrl: './whatsapp-button.css',
})
export class WhatsappButtonComponent {
    isHovered = signal(false);
    showTooltip = signal(true);

    /** WhatsApp number — change this to the real one */
    readonly whatsappNumber = '51999999999';
    readonly defaultMessage = '¡Hola! Me interesa saber más sobre los servicios de LABMARK.';

    get whatsappUrl(): string {
        const msg = encodeURIComponent(this.defaultMessage);
        return `https://wa.me/${this.whatsappNumber}?text=${msg}`;
    }

    constructor() {
        // Auto-hide tooltip after 5 seconds
        setTimeout(() => this.showTooltip.set(false), 5000);
    }
}
