import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-hero',
    standalone: true,
    templateUrl: './hero.html',
    styleUrl: './hero.css',
})
export class HeroComponent {
    private router = inject(Router);

    scrollTo(fragment: string) {
        const isHome = this.router.url === '/' || this.router.url.startsWith('/#');
        if (isHome) {
            const el = document.getElementById(fragment);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            this.router.navigate(['/'], { fragment }).then(() => {
                setTimeout(() => {
                    const el = document.getElementById(fragment);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 300);
            });
        }
    }
}
