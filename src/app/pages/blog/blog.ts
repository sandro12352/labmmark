import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal';
import { whatsappLink } from '../../config/contact';
import { BLOG_POSTS, BlogPost } from './blog.data';

@Component({
    selector: 'app-blog',
    standalone: true,
    imports: [RouterLink, RevealDirective],
    templateUrl: './blog.html',
})
export class BlogComponent {
    /** Los tres primeros se muestran como composiciones (imágenes superpuestas); el resto va en una cuadrícula */
    a = BLOG_POSTS[0];
    b = BLOG_POSTS[1];
    c = BLOG_POSTS[2];
    more = BLOG_POSTS.slice(3);

    /** Desnivel de cada tarjeta de la cuadrícula en escritorio */
    offsets = ['', 'lg:mt-12', 'lg:mt-24'];

    whatsappUrl = whatsappLink('¡Hola! Vi su blog y me gustaría conversar sobre un proyecto.');

    /** "28 oct 2026" */
    formatDate(post: BlogPost): string {
        return new Date(post.date + 'T12:00:00')
            .toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' })
            .replace('.', '');
    }
}
