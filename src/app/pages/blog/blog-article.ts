import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal';
import { whatsappLink } from '../../config/contact';
import { BLOG_POSTS, BlogPost, DEFAULT_AUTHOR } from './blog.data';

@Component({
    selector: 'app-blog-article',
    standalone: true,
    imports: [RouterLink, RevealDirective],
    templateUrl: './blog-article.html',
})
export class BlogArticleComponent {
    private router = inject(Router);

    post: BlogPost = BLOG_POSTS[0];
    related: BlogPost[] = [];
    author = DEFAULT_AUTHOR;
    whatsappUrl = '';

    constructor() {
        const slug = inject(ActivatedRoute).snapshot.paramMap.get('slug');
        const found = BLOG_POSTS.find((p) => p.slug === slug);
        if (!found) {
            // Un artículo que no existe lleva al listado
            this.router.navigate(['/blog'], { replaceUrl: true });
            return;
        }
        this.post = found;
        this.author = found.author ?? DEFAULT_AUTHOR;
        this.related = BLOG_POSTS.filter((p) => p.slug !== found.slug).slice(0, 2);
        this.whatsappUrl = whatsappLink(`¡Hola! Leí su artículo "${found.title}" y me gustaría conversar sobre mi proyecto.`);
    }

    /** "28 oct 2026" */
    formatDate(post: BlogPost): string {
        return new Date(post.date + 'T12:00:00')
            .toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' })
            .replace('.', '');
    }
}
