import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmCarouselImports } from '@ui/carousel';
import { RevealDirective } from '../../directives/reveal';
import { BLOG_POSTS } from '../../pages/blog/blog.data';

/** Sección del inicio que lleva al blog: carrusel con los artículos */
@Component({
    selector: 'app-blog-teaser',
    standalone: true,
    imports: [RouterLink, RevealDirective, ...HlmCarouselImports],
    templateUrl: './blog-teaser.html',
})
export class BlogTeaserComponent {
    posts = BLOG_POSTS;
    carouselOptions = { align: 'start' as const, loop: false, slidesToScroll: 1 };
}
