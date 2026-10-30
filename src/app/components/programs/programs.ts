import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal';
import { PROGRAMS } from './programs.data';

@Component({
    selector: 'app-programs',
    standalone: true,
    imports: [RouterLink, RevealDirective],
    templateUrl: './programs.html',
})
export class ProgramsComponent {
    programs = PROGRAMS;
}
