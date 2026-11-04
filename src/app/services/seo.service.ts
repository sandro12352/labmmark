import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SHARE_IMAGE_ALT, SHARE_IMAGE_PATH, SITE_URL } from '../config/site';
import { SERVICES } from '../components/services/services.data';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private doc = inject(DOCUMENT);

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
          ? `${data['title']} — LABMMARK`
          : 'LABMMARK — Agencia de Marketing Digital en Lima';
        this.title.setTitle(pageTitle);

        if (data['description']) {
          this.meta.updateTag({ name: 'description', content: data['description'] });
          this.meta.updateTag({ property: 'og:description', content: data['description'] });
        }

        this.meta.updateTag({ property: 'og:title', content: pageTitle });

        // Páginas que aún no deben aparecer en buscadores (por ejemplo, con datos de ejemplo)
        if (data['noindex']) {
          this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
        } else {
          this.meta.removeTag("name='robots'");
        }

        // Lo siguiente necesita enlaces completos, así que solo se escribe cuando se conoce el dominio
        if (SITE_URL) {
          const path = this.cleanPath(this.router.url);
          const pageUrl = `${SITE_URL}${path}`;
          const image = `${SITE_URL}${SHARE_IMAGE_PATH}`;

          this.setCanonical(pageUrl);
          this.meta.updateTag({ property: 'og:url', content: pageUrl });
          this.meta.updateTag({ property: 'og:image', content: image });
          this.meta.updateTag({ property: 'og:image:width', content: '1200' });
          this.meta.updateTag({ property: 'og:image:height', content: '630' });
          this.meta.updateTag({ property: 'og:image:alt', content: SHARE_IMAGE_ALT });
          this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
          this.meta.updateTag({ name: 'twitter:image', content: image });

          this.setBreadcrumbs(path, data);
          this.setHomeStructuredData(path);
        }
      });
  }

  /** Dirección sin parámetros ni barra final (el inicio queda como "/") */
  private cleanPath(url: string): string {
    const path = url.split(/[?#]/)[0];
    return path.length > 1 ? path.replace(/\/+$/, '') : '/';
  }

  /** Dirección "oficial" de la página: evita que Google la cuente como contenido duplicado */
  private setCanonical(href: string) {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  /**
   * Datos del inicio para buscadores (no dibuja nada en la página): los servicios que ofrece LABMMARK.
   * Solo se escriben en el inicio, que es donde está esa sección.
   */
  private setHomeStructuredData(path: string) {
    const id = 'home-jsonld';
    this.doc.getElementById(id)?.remove();
    if (path !== '/') return;

    const provider = { '@type': 'ProfessionalService', name: 'LABMMARK', url: `${SITE_URL}/` };
    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        ...SERVICES.map((service) => ({
          '@type': 'Service',
          name: service.title,
          description: service.description,
          serviceType: service.title,
          areaServed: 'PE',
          provider,
        })),
      ],
    });
    this.doc.head.appendChild(script);
  }

  /** Migas de pan para buscadores (no dibuja nada en la página) */
  private setBreadcrumbs(path: string, data: any) {
    const id = 'breadcrumb-jsonld';
    this.doc.getElementById(id)?.remove();
    if (path === '/') return;

    const items: { name: string; url: string }[] = [{ name: 'Inicio', url: `${SITE_URL}/` }];
    const caseSlug = path.match(/^\/portafolio\/[^/]+$/);
    const blogSlug = path.match(/^\/blog\/[^/]+$/);
    if (blogSlug) {
      // Artículo: Inicio > Blog > título del artículo
      items.push({ name: 'Blog', url: `${SITE_URL}/blog` });
      items.push({ name: String(data['title'] ?? 'Artículo'), url: `${SITE_URL}${path}` });
    } else if (caseSlug) {
      // Caso: Inicio > Portafolio > nombre del caso (el título viene como "Nombre — Caso de éxito")
      items.push({ name: 'Portafolio', url: `${SITE_URL}/portafolio` });
      items.push({ name: String(data['title'] ?? 'Caso de éxito').split(' — ')[0], url: `${SITE_URL}${path}` });
    } else {
      items.push({ name: data['breadcrumb'] ?? String(data['title'] ?? ''), url: `${SITE_URL}${path}` });
    }

    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    });
    this.doc.head.appendChild(script);
  }
}
