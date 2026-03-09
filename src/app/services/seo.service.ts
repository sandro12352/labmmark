import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  init() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data: any) => {
        const pageTitle = data['title']
          ? `${data['title']} — LABMARK`
          : 'LABMARK — Agencia de Marketing Digital';
        this.title.setTitle(pageTitle);

        if (data['description']) {
          this.meta.updateTag({ name: 'description', content: data['description'] });
          this.meta.updateTag({ property: 'og:description', content: data['description'] });
        }

        this.meta.updateTag({ property: 'og:title', content: pageTitle });
      });
  }
}
