import { RevealDirective } from '../../directives/reveal';
import { DOCUMENT } from '@angular/common';
import { afterNextRender, Component, computed, DestroyRef, ElementRef, HostListener, inject, OnInit, signal, viewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Project } from '../../components/portfolio/portfolio';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LucideSearch } from '@lucide/angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HlmCarouselImports } from '@ui/carousel';


@Component({
    selector: 'app-case-study',
    standalone: true,
    imports: [RouterLink, LucideSearch, RevealDirective, ...HlmCarouselImports],
    templateUrl: './case-study.html',
    styleUrl: './case-study.css',
})
export class CaseStudyComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private sanitizer = inject(DomSanitizer);
    private doc = inject(DOCUMENT);
    /** Visor abierto y su dirección; el reproductor solo existe mientras está abierto */
    videoOpen = signal(false);
    videoSrc = signal<SafeResourceUrl | null>(null);

    /** Posición del caso actual; al ser una señal, la pantalla se actualiza con seguridad cuando cambia de caso */
    private index = signal(0);

    get project(): Project {
        return this.allProjects[this.index()];
    }

    /** Todos los casos menos el actual, empezando por el que le sigue (el último vuelve al primero) */
    private othersList = computed(() => {
        const i = this.index();
        return this.allProjects.map((_, n) => this.allProjects[(i + n + 1) % this.allProjects.length]).slice(0, -1);
    });

    get others(): Project[] {
        return this.othersList();
    }

    /** Id del video de YouTube del caso (su miniatura está en assets/testimonios/<id>.webp) */
    get videoId(): string {
        return this.project.caseStudy.videoUrl?.match(/embed\/([\w-]+)/)?.[1] ?? '';
    }
    carouselOptions = { align: 'start' as const, loop: false, slidesToScroll: 1 };

    private heroCurtain = viewChild<ElementRef<HTMLElement>>('heroCurtain');
    private heroImg = viewChild<ElementRef<HTMLImageElement>>('heroImg');

    constructor() {
        inject(DestroyRef).onDestroy(() => (this.doc.body.style.overflow = ''));

        afterNextRender(() => {
            const curtain = this.heroCurtain()?.nativeElement;
            if (!curtain) return;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                curtain.remove();
                return;
            }
            // Solo opacidad: no toca la imagen, así que no repinta el banner
            const reveal = () =>
                gsap.to(curtain, {
                    opacity: 0,
                    duration: 1.2,
                    delay: 0.15,
                    ease: 'power2.inOut',
                    onComplete: () => curtain.remove(),
                });

            // La cortina se abre cuando el banner ya cargó (o a los 2.5 s como máximo), para no mostrar un fondo vacío
            const img = this.heroImg()?.nativeElement;
            if (!img || img.complete) {
                reveal();
            } else {
                let opened = false;
                const open = () => {
                    if (opened) return;
                    opened = true;
                    reveal();
                };
                img.addEventListener('load', open, { once: true });
                img.addEventListener('error', open, { once: true });
                setTimeout(open, 2500);
            }
        });
    }

    private allProjects: Project[] = [
        {
            slug: 'martial-core',
            title: 'Martialcore',
            category: 'Branding / Packaging',
            size: 'large',
            gradient: 'from-lm-graphite to-lm-black',
            image: 'assets/portafolio/martialcore/banner.webp',
            caseStudy: {
                challenge: 'Martial es un centro de alto rendimiento de deportes de combate que competía con gimnasios genéricos de la zona. Su comunicación no reflejaba la intensidad de sus atletas ni atraía a nuevos alumnos.',
                solution: 'Construimos una identidad visual con carácter de competencia y una sesión fotográfica con sus propios atletas como protagonistas. Lanzamos campañas en Meta Ads orientadas a clases de prueba gratuitas y reforzamos la presencia en redes con contenido de entrenamientos.',
                results: 'En 3 meses la academia duplicó sus solicitudes de clase de prueba y consolidó una comunidad activa en redes alrededor de su marca.',
                services: [
                    { icon: 'palette', name: 'Branding & Identidad', description: 'Logotipo, paleta y sistema visual con la fuerza de los deportes de combate.' },
                    { icon: 'camera', name: 'Producción Fotográfica', description: 'Sesión de retratos de atletas y entrenadores para toda la comunicación de marca.' },
                    { icon: 'meta', name: 'Meta Ads', description: 'Campañas de clase de prueba gratuita segmentadas por zona e intereses deportivos.' },
                    { icon: 'package', name: 'Merchandising', description: 'Diseño de uniformes y artículos con la nueva identidad visual.' },
                ],
                metrics: [
                    { value: '2.3x', label: 'Clases de prueba' },
                    { value: '38%', label: 'Conversión a matrícula' },
                    { value: '12K', label: 'Nuevos seguidores' },
                    { value: '-35%', label: 'Costo por lead' },
                ],
                gallery: [
                    'assets/portafolio/martialcore/1.webp',
                    'assets/portafolio/martialcore/2.webp',
                    'assets/portafolio/martialcore/3.webp',
                    'assets/portafolio/martialcore/4.webp',
                    'assets/portafolio/martialcore/5.webp',
                    'assets/portafolio/martialcore/6.webp',
                ],
                testimonial: {
                    quote: 'Pasamos de ser un gimnasio más a una marca con identidad. Nuestros alumnos se sienten parte de algo.',
                    author: 'Equipo Martial',
                    role: 'Centro de Alto Rendimiento',
                },
                videoUrl: 'https://www.youtube.com/embed/K7yloQsiAss?controls=1&rel=0',
            },
        },
        {
            slug: 'grin-peru',
            title: 'Grin Perú',
            category: 'Campaña Digital',
            size: 'small',
            gradient: 'from-lm-slate to-lm-charcoal',
            image: 'assets/portafolio/grin/banner.webp',
            caseStudy: {
                challenge: 'Grin lanzaba al mercado peruano motos y scooters eléctricos, una categoría nueva para muchos usuarios. Necesitaba darse a conocer, explicar sus beneficios y generar interesados desde el primer día.',
                solution: 'Diseñamos una campaña de lanzamiento con el mensaje "Lanzamiento exclusivo", con piezas de producto y estilo de vida urbano. Combinamos Meta Ads y Google Ads para captar interesados en movilidad eléctrica y los dirigimos a una landing optimizada para cotizar.',
                results: 'La campaña de lanzamiento generó cientos de cotizaciones en las primeras semanas y posicionó a Grin como una opción visible de movilidad eléctrica.',
                services: [
                    { icon: 'trending-up', name: 'Campaña de Lanzamiento', description: 'Concepto creativo y piezas gráficas para presentar los nuevos modelos.' },
                    { icon: 'meta', name: 'Meta Ads', description: 'Anuncios segmentados a público urbano interesado en movilidad sostenible.' },
                    { icon: 'google', name: 'Google Ads', description: 'Búsqueda y remarketing para quienes comparan motos y scooters eléctricos.' },
                    { icon: 'layout', name: 'Landing de Cotización', description: 'Página enfocada en convertir visitas en solicitudes de cotización.' },
                ],
                metrics: [
                    { value: '480', label: 'Cotizaciones en el lanzamiento' },
                    { value: '3.4x', label: 'ROAS' },
                    { value: '2.1%', label: 'CTR promedio' },
                    { value: '-40%', label: 'Costo por cotización' },
                ],
                gallery: [
                    'assets/portafolio/grin/1.webp',
                    'assets/portafolio/grin/2.webp',
                    'assets/portafolio/grin/3.webp',
                    'assets/portafolio/grin/4.webp',
                    'assets/portafolio/grin/5.webp',
                    'assets/portafolio/grin/6.webp',
                ],
                testimonial: {
                    quote: 'El lanzamiento tuvo la visibilidad que buscábamos. Las consultas llegaron desde el primer día.',
                    author: 'Equipo Grin',
                    role: 'Movilidad eléctrica',
                },
                videoUrl: 'https://www.youtube.com/embed/Wc4AZodk8Ss?controls=1&rel=0',
            },
        },
        {
            slug: 'opcion',
            title: 'Opción',
            category: 'Social Media',
            size: 'small',
            gradient: 'from-lm-charcoal to-lm-graphite',
            image: 'assets/portafolio/opcion/banner.webp',
            caseStudy: {
                challenge: 'Opción ofrece financiamiento para vehículos y maquinaria, un producto que genera dudas y requiere confianza. Necesitaba explicar su propuesta con claridad y atraer solicitudes de personas y empresas.',
                solution: 'Creamos una campaña de redes con el mensaje "Tu futuro, tus metas, tu Opción", mostrando metas alcanzables. Reforzamos con Meta Ads segmentados para personas y pymes, y contenido informativo que resuelve las dudas frecuentes sobre el financiamiento.',
                results: 'La campaña aumentó las solicitudes de información y posicionó a Opción como una alternativa clara y confiable de financiamiento.',
                services: [
                    { icon: 'instagram', name: 'Social Media Management', description: 'Calendario de contenido informativo y de confianza para Instagram y Facebook.' },
                    { icon: 'meta', name: 'Meta Ads', description: 'Campañas de generación de leads para personas y empresas.' },
                    { icon: 'palette', name: 'Diseño de Piezas', description: 'Piezas gráficas alineadas con la línea visual de la marca.' },
                    { icon: 'trending-up', name: 'Estrategia de Crecimiento', description: 'Plan de contenido y pauta para sostener el flujo de solicitudes.' },
                ],
                metrics: [
                    { value: '2.6x', label: 'Solicitudes mensuales' },
                    { value: '18K', label: 'Seguidores ganados' },
                    { value: '4.8%', label: 'Engagement rate' },
                    { value: '-30%', label: 'Costo por solicitud' },
                ],
                gallery: [
                    'assets/portafolio/opcion/1.webp',
                    'assets/portafolio/opcion/2.webp',
                    'assets/portafolio/opcion/3.webp',
                    'assets/portafolio/opcion/4.webp',
                    'assets/portafolio/opcion/5.webp',
                    'assets/portafolio/opcion/6.webp',
                ],

                testimonial: {
                    quote: 'Ahora nuestros clientes entienden mejor cómo funciona el financiamiento y nos escriben con más confianza.',
                    author: 'Equipo Opción',
                    role: 'Financiamiento vehicular',
                },
            },
        },
        {
            slug: 'tismartial',
            title: 'Tismartial',
            category: 'Estrategia Digital',
            size: 'large',
            gradient: 'from-lm-charcoal to-lm-black',
            image: 'assets/portafolio/tismartial/banner.webp',
            caseStudy: {
                challenge: 'Tismartial es una academia de artes marciales para niños y adultos que dependía del boca a boca. Necesitaba atraer nuevas familias y mantener inscritos a sus alumnos durante todo el año.',
                solution: 'Diseñamos una estrategia digital que muestra el valor de la disciplina y la comunidad: sesión de retratos de alumnos, campañas en Meta Ads para clases de prueba y una landing de inscripción. Sumamos email marketing para dar seguimiento a las familias interesadas.',
                results: 'La academia aumentó sus inscripciones en las temporadas de campaña y mejoró la retención de alumnos gracias al seguimiento continuo.',
                services: [
                    { icon: 'meta', name: 'Meta Ads', description: 'Campañas dirigidas a padres de familia y adultos interesados en artes marciales.' },
                    { icon: 'camera', name: 'Producción Fotográfica', description: 'Retratos de alumnos e instructores con estética de campeonato.' },
                    { icon: 'layout', name: 'Landing de Inscripción', description: 'Página optimizada para convertir visitas en inscripciones.' },
                    { icon: 'mail', name: 'Email Marketing', description: 'Seguimiento automatizado a las familias que pidieron información.' },
                ],
                metrics: [
                    { value: '+85', label: 'Nuevas inscripciones' },
                    { value: '$1.50', label: 'Costo por lead' },
                    { value: '32%', label: 'Tasa de conversión' },
                    { value: '4.1x', label: 'ROAS general' },
                ],
                gallery: [
                    'assets/portafolio/tismartial/1.webp',
                    'assets/portafolio/tismartial/2.webp',
                    'assets/portafolio/tismartial/3.webp',
                    'assets/portafolio/tismartial/4.webp',
                    'assets/portafolio/tismartial/5.webp',
                    'assets/portafolio/tismartial/6.webp',
                ],
                testimonial: {
                    quote: 'Las familias llegan mejor informadas y con ganas de empezar. La academia se siente más grande.',
                    author: 'Equipo Tismartial',
                    role: 'Academia de artes marciales',
                },
                videoUrl: 'https://www.youtube.com/embed/98Dl1ttq8fM?controls=1&rel=0',
            },
        },
        {
            slug: 'tecnograss',
            title: 'Tecnograss',
            category: 'Branding Completo',
            size: 'small',
            gradient: 'from-lm-slate to-lm-black',
            image: 'assets/portafolio/tecnograss/banner.webp',
            caseStudy: {
                challenge: 'Tecnograss vende césped sintético para canchas deportivas en un mercado donde casi todos compiten por precio. Necesitaba una marca que transmitiera calidad y tecnología, y generar solicitudes de presupuesto.',
                solution: 'Construimos la identidad de marca con un logotipo de carácter deportivo y tecnológico, y la aplicamos en fotografía de canchas y redes. Desplegamos Google Ads para búsquedas de césped sintético y Meta Ads para clubes, colegios y administradores de canchas.',
                results: 'La marca se diferenció de la competencia por precio y generó un flujo constante de solicitudes de presupuesto de clubes, colegios y empresas.',
                services: [
                    { icon: 'palette', name: 'Branding Completo', description: 'Logotipo, paleta de colores y manual de marca con identidad deportiva y tecnológica.' },
                    { icon: 'google', name: 'Google Ads', description: 'Campañas de búsqueda para quienes necesitan césped sintético para sus canchas.' },
                    { icon: 'meta', name: 'Meta Ads', description: 'Anuncios dirigidos a clubes, colegios y administradores de canchas.' },
                    { icon: 'layout', name: 'Diseño Web', description: 'Sitio con catálogo y formulario de solicitud de presupuesto.' },
                ],
                metrics: [
                    { value: '260', label: 'Solicitudes de presupuesto' },
                    { value: '$6.40', label: 'Costo por lead' },
                    { value: '14', label: 'Canchas instaladas' },
                    { value: '5.2x', label: 'ROI de campaña' },
                ],
                gallery: [
                    'assets/portafolio/tecnograss/1.webp',
                    'assets/portafolio/tecnograss/2.webp',
                    'assets/portafolio/tecnograss/3.webp',
                    'assets/portafolio/tecnograss/4.webp',
                    'assets/portafolio/tecnograss/5.webp',
                    'assets/portafolio/tecnograss/6.webp',
                ],
                testimonial: {
                    quote: 'Pasamos de competir solo por precio a que nos elijan por la calidad. La marca ahora se ve a la altura del producto.',
                    author: 'Equipo Tecnograss',
                    role: 'Césped sintético deportivo',
                },
                videoUrl: 'https://www.youtube.com/embed/rT6i0EqiZg8?controls=1&rel=0',
            },
        },
        {
            slug: 'sabor-y-sason',
            title: 'Son y Sazón',
            category: 'Campaña Digital',
            size: 'small',
            gradient: 'from-lm-graphite to-lm-slate',
            image: 'assets/portafolio/sabor-y-sason/banner.webp',
            caseStudy: {
                challenge: 'Son & Sazón D\'Mario es un restaurante de comida peruana que quería destacar frente a la competencia del barrio y llenar sus mesas en los días de menor afluencia, con poca presencia digital.',
                solution: 'Creamos la campaña "Somos los reyes de la sazón", con fotografía de sus platos estrella, promociones por día y piezas para redes. Activamos Meta Ads con geolocalización cercana al local y reforzamos la comunicación en Instagram y Facebook.',
                results: 'El restaurante aumentó los pedidos y las reservas, y sus platos se volvieron un referente en las redes de la zona.',
                services: [
                    { icon: 'trending-up', name: 'Estrategia Digital', description: 'Plan de promociones por día y calendario de contenido.' },
                    { icon: 'camera', name: 'Producción Fotográfica', description: 'Fotografía gastronómica para destacar sabor y presentación.' },
                    { icon: 'meta', name: 'Meta Ads', description: 'Campañas con geolocalización y promociones para el público cercano.' },
                    { icon: 'instagram', name: 'Social Media', description: 'Gestión de comunidad y contenido de platos y promociones.' },
                ],
                metrics: [
                    { value: '+45%', label: 'Pedidos mensuales' },
                    { value: '2.8x', label: 'Reservas desde redes' },
                    { value: '31K', label: 'Seguidores totales' },
                    { value: '3.9x', label: 'ROAS promedio' },
                ],
                gallery: [
                    'assets/portafolio/sabor-y-sason/1.webp',
                    'assets/portafolio/sabor-y-sason/2.webp',
                    'assets/portafolio/sabor-y-sason/3.webp',
                    'assets/portafolio/sabor-y-sason/4.webp',
                    'assets/portafolio/sabor-y-sason/5.webp',
                    'assets/portafolio/sabor-y-sason/6.webp',
                ],
                testimonial: {
                    quote: 'Las mesas se llenan incluso entre semana. Nuestros platos ahora se ven tan ricos como saben.',
                    author: 'Equipo D\'Mario',
                    role: 'Son & Sazón D\'Mario',
                },
            },
        },
        // TODO: texto provisional armado con lo que sabemos del proyecto (sin cifras). Confirmar con el equipo y, si hay datos reales, agregar metrics y testimonial.
        {
            slug: 'tayta',
            title: 'Tayta',
            category: 'Fotografía · Redes sociales',
            size: 'medium',
            gradient: 'from-lm-graphite to-lm-black',
            image: 'assets/portafolio/tayta/banner.webp',
            caseStudy: {
                challenge: 'Tayta es una marca de fermentos artesanales (kombucha, kéfir, chucrut y kimchi) que necesitaba una imagen atractiva y coherente para destacar frente a otras bebidas y alimentos naturales, y para explicar los beneficios de sus productos en redes sociales.',
                solution: 'Construimos una línea visual de colores vivos y fondos naturales, con fotografía de producto y piezas pensadas para cada sabor y cada ocasión, como las promociones por pack y las campañas de temporada. Cada publicación mantiene la misma identidad para que la marca se reconozca de un vistazo.',
                results: 'La marca cuenta con una imagen reconocible y con una colección de piezas listas para su comunicación en redes sociales, que presenta cada producto de forma apetitosa y consistente.',
                services: [
                    { icon: 'camera', name: 'Fotografía de producto', description: 'Imágenes de botellas y frascos con ingredientes naturales para resaltar el sabor y la frescura.' },
                    { icon: 'palette', name: 'Dirección visual', description: 'Paleta, composición y estilo gráfico coherentes para toda la comunicación.' },
                    { icon: 'instagram', name: 'Social Media', description: 'Diseño de publicaciones, promociones y campañas de temporada para redes.' },
                ],
                metrics: [],
                gallery: [
                    'assets/portafolio/tayta/1.webp',
                    'assets/portafolio/tayta/2.webp',
                    'assets/portafolio/tayta/3.webp',
                    'assets/portafolio/tayta/4.webp',
                    'assets/portafolio/tayta/5.webp',
                    'assets/portafolio/tayta/6.webp',
                ],
            },
        },
        // TODO: texto provisional armado con lo que sabemos del proyecto (sin cifras). Confirmar con el equipo y con el cliente (varias piezas muestran precios y condiciones de la promoción). Si hay datos reales, agregar metrics y testimonial.
        {
            slug: 'montepinar',
            title: 'Montepinar',
            category: 'Campaña Digital',
            size: 'medium',
            gradient: 'from-lm-graphite to-lm-black',
            image: 'assets/portafolio/montepinar/banner.webp',
            caseStudy: {
                challenge: 'Palmeras de Montepinar es un proyecto inmobiliario de lotes cerca de Bahía Salinas y del megapuerto de Chancay. Necesitaba darse a conocer, generar confianza en quienes compran un terreno por primera vez y atraer interesados dispuestos a agendar una cita con un asesor.',
                solution: 'Creamos una campaña digital con piezas para redes que comunican lo esencial de forma clara: la ubicación, las facilidades de pago y financiamiento, y cómo separar un lote. Cada pieza mantiene los colores y el logo del proyecto, y todas invitan a reservar una cita con un asesor.',
                results: 'El proyecto cuenta con una comunicación coherente y reconocible, con piezas listas para sus campañas en redes, que explican la propuesta de valor y facilitan que el interesado dé el siguiente paso.',
                services: [
                    { icon: 'trending-up', name: 'Estrategia Digital', description: 'Mensajes y ofertas pensados para atraer a compradores de terrenos.' },
                    { icon: 'palette', name: 'Diseño de piezas', description: 'Publicaciones con la identidad del proyecto, claras y fáciles de entender.' },
                    { icon: 'meta', name: 'Campaña en Redes', description: 'Piezas para anuncios y redes orientadas a conseguir citas con asesores.' },
                ],
                metrics: [],
                gallery: [
                    'assets/portafolio/montepinar/1.webp',
                    'assets/portafolio/montepinar/2.webp',
                    'assets/portafolio/montepinar/3.webp',
                    'assets/portafolio/montepinar/4.webp',
                    'assets/portafolio/montepinar/5.webp',
                    'assets/portafolio/montepinar/6.webp',
                ],
            },
        },
        // TODO: texto provisional armado con lo que sabemos del proyecto (sin cifras). Confirmar con el equipo, el permiso de las personas que aparecen en las fotos y los servicios reales (la tarjeta de "recientes" dice "Contenido · Meta Ads"). Si hay datos reales, agregar metrics y testimonial.
        {
            slug: 'alpina',
            title: 'Alpina',
            category: 'Contenido · Redes sociales',
            size: 'medium',
            gradient: 'from-lm-graphite to-lm-black',
            image: 'assets/portafolio/alpina/banner.webp',
            caseStudy: {
                challenge: 'Grupo Alpina distribuye maquinaria y productos complementarios de jardinería: podadoras, sopladoras, motoguadañas y tractores cortacésped. Necesitaba mostrar sus equipos de forma atractiva y explicar para qué sirve cada uno, para llegar a quienes cuidan jardines y grandes áreas verdes.',
                solution: 'Desarrollamos una línea de contenido con fotografía de los equipos en uso y piezas gráficas con mensajes claros y directos, como "Hecho para grandes terrenos" o "La herramienta correcta hace la diferencia". Todas siguen el mismo estilo verde y limpio, con la marca siempre visible y una invitación a pedir información.',
                results: 'La marca cuenta con una comunicación coherente y reconocible, con piezas listas para sus redes sociales, que presentan cada equipo y sus usos de forma clara.',
                services: [
                    { icon: 'camera', name: 'Producción de contenido', description: 'Fotografía de los equipos en uso, en jardines y áreas verdes.' },
                    { icon: 'palette', name: 'Diseño de piezas', description: 'Publicaciones con la identidad de la marca y mensajes claros por producto.' },
                    { icon: 'instagram', name: 'Social Media', description: 'Contenido para redes que presenta los equipos y sus beneficios.' },
                ],
                metrics: [],
                gallery: [
                    'assets/portafolio/alpina/1.webp',
                    'assets/portafolio/alpina/2.webp',
                    'assets/portafolio/alpina/4.webp',
                    'assets/portafolio/alpina/5.webp',
                    'assets/portafolio/alpina/6.webp',
                ],
            },
        },
    ];

    private destroyRef = inject(DestroyRef);

    ngOnInit() {
        // Se escucha el cambio de dirección: al pasar de un caso a otro Angular reutiliza este componente
        this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
            const index = this.allProjects.findIndex(p => p.slug === params.get('slug'));
            if (index === -1) {
                this.router.navigate(['/']);
                return;
            }
            this.index.set(index);
            if (this.videoOpen()) this.closeVideo();
        });
    }

    openVideo() {
        // youtube-nocookie: no deja cookies de YouTube hasta que el visitante reproduce el video
        this.videoSrc.set(
            this.sanitizer.bypassSecurityTrustResourceUrl(
                `https://www.youtube-nocookie.com/embed/${this.videoId}?autoplay=1&rel=0&modestbranding=1`,
            ),
        );
        this.videoOpen.set(true);
        this.doc.body.style.overflow = 'hidden';
    }

    closeVideo() {
        this.videoOpen.set(false);
        this.videoSrc.set(null); // se quita el reproductor para que el video deje de sonar
        this.doc.body.style.overflow = '';
    }

    @HostListener('document:keydown.escape')
    onEscape() {
        if (this.videoOpen()) this.closeVideo();
    }

    getServiceIcon(icon: string): string {
        const icons: Record<string, string> = {
            'palette': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
            'meta': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
            'google': 'M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z',
            'package': 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
            'layout': 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
            'search': 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
            'bar-chart': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
            'instagram': 'M16 4H8C5.79 4 4 5.79 4 8v8c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zm-4 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3.5-7.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z',
            'camera': 'M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 17a5 5 0 100-10 5 5 0 000 10z',
            'trending-up': 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
            'mail': 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        };
        return icons[icon] || icons['palette'];
    }
}
