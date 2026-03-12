import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface SocialLink {
    name: string;
    url: string;
    icon: SafeHtml;
}

@Component({
    selector: 'app-social-sidebar',
    standalone: true,
    templateUrl: './social-sidebar.html',
    styleUrl: './social-sidebar.css',
})
export class SocialSidebarComponent {
    private sanitizer = inject(DomSanitizer);

    socials: SocialLink[] = [
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/labmmarkperu?igsh=OWxlZjQ3dGVoOGg3',
            icon: this.trust(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`),
        },
        {
            name: 'Facebook',
            url: 'https://www.facebook.com/labmmark',
            icon: this.trust(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`),
        },
        {
            name: 'TikTok',
            url: 'https://www.tiktok.com/@labmmark',
            icon: this.trust(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>`),
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/company/labmmark',
            icon: this.trust(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`),
        },
    ];

    private trust(svg: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(svg);
    }
}
