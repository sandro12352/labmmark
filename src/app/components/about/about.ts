import { Component } from '@angular/core';

@Component({
    selector: 'app-about',
    standalone: true,
    templateUrl: './about.html',
    styleUrl: './about.css',
})
export class AboutComponent {
    stats = [
        { value: '+50', label: 'Clientes activos' },
        { value: '+120', label: 'Proyectos entregados' },
        { value: '5', label: 'Años de experiencia' },
        { value: '100%', label: 'Compromiso' },
    ];
}
