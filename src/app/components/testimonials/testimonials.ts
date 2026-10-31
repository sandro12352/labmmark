import { RevealDirective } from '../../directives/reveal';
import { Component, DestroyRef, HostListener, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HlmCarouselImports } from '@ui/carousel';
import { VIDEO_TESTIMONIALS, VideoTestimonial, YOUTUBE_CHANNEL_URL } from './testimonials.data';

@Component({
    selector: 'app-testimonials',
    standalone: true,
    imports: [RevealDirective, ...HlmCarouselImports],
    templateUrl: './testimonials.html',
    styleUrl: './testimonials.css',
})
export class TestimonialsComponent {
    private sanitizer = inject(DomSanitizer);

    videos = VIDEO_TESTIMONIALS;
    channelUrl = YOUTUBE_CHANNEL_URL;

    carouselOptions = {
        align: 'start' as const,
        loop: false,
        slidesToScroll: 1,
    };

    /** Video abierto en el visor (null = cerrado) */
    current = signal<VideoTestimonial | null>(null);
    videoUrl = signal<SafeResourceUrl | null>(null);

    constructor() {
        inject(DestroyRef).onDestroy(() => (document.body.style.overflow = ''));
    }

    /** Mm:ss de una duración en segundos */
    duration(seconds: number): string {
        return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
    }

    open(video: VideoTestimonial) {
        // youtube-nocookie: no deja cookies de YouTube hasta que el visitante reproduce el video
        const start = video.start ? `&start=${video.start}` : '';
        this.videoUrl.set(
            this.sanitizer.bypassSecurityTrustResourceUrl(
                `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1${start}`,
            ),
        );
        this.current.set(video);
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.current.set(null);
        this.videoUrl.set(null); // se quita el reproductor para que el video deje de sonar
        document.body.style.overflow = '';
    }

    @HostListener('document:keydown.escape')
    onEscape() {
        if (this.current()) this.close();
    }
}
