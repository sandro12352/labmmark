import { RevealDirective } from '../../directives/reveal';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationMapComponent } from '../location-map/location-map';
import { ADDRESS_LINES, HOURS_LINES, MAP_LINK, OFFICE_COORDS, PHONE_DISPLAY, whatsappLink } from '../../config/contact';

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
        message: '',
    });

    submitted = signal(false);

    onSubmit() {
        this.submitted.set(true);
        setTimeout(() => this.submitted.set(false), 3000);
    }
}
