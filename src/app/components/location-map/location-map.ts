import { afterNextRender, Component, DestroyRef, ElementRef, inject, input } from '@angular/core';

/** Mapa oscuro (Leaflet + teselas CARTO Dark) con marcador lila que late. Solo se carga en el navegador. */
@Component({
    selector: 'app-location-map',
    standalone: true,
    template: '<div class="absolute inset-0 bg-lm-black"></div>',
    styles: [`
        :host { display: block; position: absolute; inset: 0; z-index: 0; }
        :host ::ng-deep .lm-marker { position: relative; width: 20px; height: 20px; }
        :host ::ng-deep .lm-marker i { position: absolute; inset: 0; border-radius: 9999px; background: #C9A0DC; border: 3px solid #0A0A0A; }
        :host ::ng-deep .lm-marker b { position: absolute; inset: -10px; border-radius: 9999px; background: rgba(201,160,220,.35); animation: lm-ping 2.4s ease-out infinite; }
        :host ::ng-deep .leaflet-container { background: #0A0A0A; font-family: inherit; }
        :host ::ng-deep .leaflet-tile-pane { filter: invert(1) hue-rotate(180deg) grayscale(.85) brightness(.85) contrast(.95); }
        :host ::ng-deep .leaflet-control-attribution { background: rgba(10,10,10,.7); color: #A0A0A0; font-size: 10px; }
        :host ::ng-deep .leaflet-control-attribution a { color: #D4D4D4; }
        :host ::ng-deep .leaflet-bar a { background: #1A1A1A; color: #F5F5F5; border-color: #2D2D2D; }
        :host ::ng-deep .leaflet-bar a:hover { background: #2D2D2D; }
        @keyframes lm-ping { 0% { transform: scale(.6); opacity: .8; } 100% { transform: scale(1.8); opacity: 0; } }
    `],
})
export class LocationMapComponent {
    coords = input.required<[number, number]>();
    zoom = input(14);

    private host = inject<ElementRef<HTMLElement>>(ElementRef);
    private destroyRef = inject(DestroyRef);

    constructor() {
        afterNextRender(async () => {
            const mod: any = await import('leaflet');
            const L = mod.default ?? mod;
            const el = this.host.nativeElement.firstElementChild as HTMLElement;

            const map = L.map(el, { center: this.coords(), zoom: this.zoom(), scrollWheelZoom: false, zoomControl: true });
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 19,
            }).addTo(map);

            // La rueda solo hace zoom tras hacer clic en el mapa, para no atrapar el scroll de la página
            map.on('click focus', () => map.scrollWheelZoom.enable());
            map.on('mouseout blur', () => map.scrollWheelZoom.disable());

            L.marker(this.coords(), {
                icon: L.divIcon({ className: '', html: '<div class="lm-marker"><b></b><i></i></div>', iconSize: [20, 20], iconAnchor: [10, 10] }),
            }).addTo(map);

            this.destroyRef.onDestroy(() => map.remove());
        });
    }
}
