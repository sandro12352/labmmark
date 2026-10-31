import { RevealDirective } from '../../directives/reveal';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationMapComponent } from '../location-map/location-map';
import { ADDRESS_LINES, HOURS_LINES, MAP_LINK, OFFICE_COORDS, PHONE_DISPLAY, WEB3FORMS_KEY, whatsappLink } from '../../config/contact';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [FormsModule, RevealDirective, LocationMapComponent],
    templateUrl: './contact.html',
    styleUrl: './contact.css',
})
export class ContactComponent {
    coords = OFFICE_COORDS;
    addressLines = ADDRESS_LINES;
    hoursLines = HOURS_LINES;
    mapLink = MAP_LINK;
    phone = PHONE_DISPLAY;
    whatsappUrl = whatsappLink('¡Hola! Me gustaría conversar sobre un proyecto.');

    formData = signal({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    /** Campo oculto: los bots lo llenan y las personas no */
    honeypot = signal('');

    status = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');

    setField(field: 'name' | 'email' | 'phone' | 'message', value: string) {
        this.formData.update((data) => ({ ...data, [field]: value }));
    }

    async onSubmit() {
        if (this.status() === 'sending') return;

        const { name, email, phone, message } = this.formData();

        // Un bot llenó el campo oculto: se finge el envío sin mandar nada
        if (this.honeypot()) {
            this.finish();
            return;
        }

        // Sin clave de Web3Forms todavía: se abre WhatsApp con el mensaje para no perder el contacto
        if (!WEB3FORMS_KEY) {
            const contact = phone ? `${email}, celular ${phone}` : email;
            window.open(whatsappLink(`¡Hola! Soy ${name} (${contact}). ${message}`), '_blank', 'noopener');
            this.finish();
            return;
        }

        this.status.set('sending');
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    subject: 'Nuevo mensaje desde la web de LABMMARK',
                    from_name: 'Web LABMMARK',
                    name,
                    email,
                    phone,
                    message,
                }),
            });
            const result = await response.json();
            if (result.success) {
                this.finish();
            } else {
                this.status.set('error');
            }
        } catch {
            this.status.set('error');
        }
    }

    /** Muestra "enviado", limpia el formulario y lo deja listo otra vez a los pocos segundos */
    private finish() {
        this.status.set('sent');
        this.formData.set({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => this.status.set('idle'), 4000);
    }
}
