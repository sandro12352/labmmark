import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal';
import { COMPARISON, CONDITIONS, PLAN_ADVICE_URL, PROGRAMS, planWhatsappUrl } from '../../components/programs/programs.data';

@Component({
    selector: 'app-planes',
    standalone: true,
    imports: [RouterLink, RevealDirective],
    templateUrl: './planes.html',
})
export class PlanesComponent {
    programs = PROGRAMS;
    comparison = COMPARISON;
    conditions = CONDITIONS;

    planUrl = planWhatsappUrl;
    adviceUrl = PLAN_ADVICE_URL;
}
