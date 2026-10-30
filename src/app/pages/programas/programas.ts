import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal';
import { COMPARISON, CONDITIONS, PROGRAMS } from '../../components/programs/programs.data';

@Component({
    selector: 'app-programas',
    standalone: true,
    imports: [RouterLink, RevealDirective],
    templateUrl: './programas.html',
})
export class ProgramasComponent {
    private router = inject(Router);

    programs = PROGRAMS;
    comparison = COMPARISON;
    conditions = CONDITIONS;

    /** Va a la página de contacto */
    goToContact() {
        this.router.navigate(['/contacto']);
    }
}
