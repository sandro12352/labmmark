import { Component, inject, DOCUMENT } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

interface Breadcrumb {
    label: string;
    url: string;
}

@Component({
    selector: 'app-breadcrumbs',
    standalone: true,
    templateUrl: './breadcrumbs.html',
    styleUrl: './breadcrumbs.css',
})
export class BreadcrumbsComponent {
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    private document = inject(DOCUMENT);

    breadcrumbs: Breadcrumb[] = [];
    showBreadcrumbs = false;

    constructor() {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.activatedRoute),
                map((route) => {
                    while (route.firstChild) route = route.firstChild;
                    return route;
                })
            )
            .subscribe((route) => {
                const data = route.snapshot.data;
                if (data['breadcrumb']) {
                    this.showBreadcrumbs = true;
                    this.breadcrumbs = [
                        { label: 'Inicio', url: '/' },
                        { label: data['breadcrumb'], url: this.router.url },
                    ];
                    this.injectJsonLd();
                } else {
                    this.showBreadcrumbs = false;
                    this.breadcrumbs = [];
                    this.removeJsonLd();
                }
            });
    }

    private injectJsonLd() {
        this.removeJsonLd();
        const script = this.document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'breadcrumb-jsonld';
        script.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: this.breadcrumbs.map((bc, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: bc.label,
                item: `https://labmark.agency${bc.url}`,
            })),
        });
        this.document.head.appendChild(script);
    }

    private removeJsonLd() {
        const existing = this.document.getElementById('breadcrumb-jsonld');
        if (existing) {
            existing.remove();
        }
    }
}
