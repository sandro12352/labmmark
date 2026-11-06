import { Component, computed, inject, signal } from '@angular/core';
import { HlmCarouselImports } from '@ui/carousel';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal';
import { whatsappLink } from '../../config/contact';
import { BLOG_POSTS, BlogPost, DEFAULT_AUTHOR } from './blog.data';

@Component({
    selector: 'app-blog-article',
    standalone: true,
    imports: [RouterLink, RevealDirective, ...HlmCarouselImports],
    templateUrl: './blog-article.html',
})
export class BlogArticleComponent {
    private router = inject(Router);
    carouselOptions = { align: 'start' as const, loop: false, slidesToScroll: 1 };

    // El artículo actual vive en una señal: así Angular detecta el cambio al pasar de un artículo a otro
    // (se reutiliza este componente) y no aparece el error NG0100 en desarrollo
    private current = signal<BlogPost>(BLOG_POSTS[0]);

    private view = computed(() => {
        const post = this.current();
        const at = BLOG_POSTS.indexOf(post);
        return {
            post,
            author: post.author ?? DEFAULT_AUTHOR,
            // Todos los demás artículos, empezando por el que sigue al actual
            related: [...BLOG_POSTS.slice(at + 1), ...BLOG_POSTS.slice(0, at)],
            whatsappUrl: whatsappLink(`¡Hola! Leí su artículo "${post.title}" y me gustaría conversar sobre mi proyecto.`),
        };
    });

    get post(): BlogPost { return this.view().post; }
    get related(): BlogPost[] { return this.view().related; }
    get author() { return this.view().author; }
    get whatsappUrl(): string { return this.view().whatsappUrl; }

    constructor() {
        // Se escucha el cambio de dirección: al pasar de un artículo a otro Angular reutiliza este componente
        inject(ActivatedRoute).paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
            const found = BLOG_POSTS.find((p) => p.slug === params.get('slug'));
            if (!found) {
                // Un artículo que no existe lleva al listado
                this.router.navigate(['/blog'], { replaceUrl: true });
                return;
            }
            this.current.set(found);
        });
    }

    /** "28 oct 2026" */
    formatDate(post: BlogPost): string {
        return new Date(post.date + 'T12:00:00')
            .toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' })
            .replace('.', '');
    }
}
