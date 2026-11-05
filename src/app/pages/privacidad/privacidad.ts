import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal';
import { EMAIL } from '../../config/contact';
import { PRIVACY_SECTIONS, PRIVACY_UPDATED } from './privacidad.data';

@Component({
    selector: 'app-privacidad',
    standalone: true,
    imports: [RouterLink, RevealDirective],
    templateUrl: './privacidad.html',
})
export class PrivacidadComponent {
    sections = PRIVACY_SECTIONS;
    updated = PRIVACY_UPDATED;
    email = EMAIL;

    /** Desplazamiento suave a una sección sin cambiar la dirección de la página */
    goTo(event: Event, id: string) {
        event.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
