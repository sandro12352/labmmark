import type { GalleryItem } from '../../components/diagonal-gallery/diagonal-gallery';

export interface PortfolioItem {
    slug: string;
    title: string;
    category: string;
    /** Grupo para los filtros de la página */
    group: string;
    image: string;
}

export const PORTFOLIO_FILTERS = ['Todos', 'Branding', 'Social Media', 'Campañas', 'Estrategia'];

// Los slugs deben coincidir con los de case-study.ts y con app.routes.server.ts
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
    { slug: 'martial-core', title: 'Martialcore', category: 'Branding / Packaging', group: 'Branding', image: 'assets/portafolio/martialcore.webp' },
    { slug: 'grin-peru', title: 'Grin Perú', category: 'Campaña Digital', group: 'Campañas', image: 'assets/portafolio/grin-peru.webp' },
    { slug: 'opcion', title: 'Opción', category: 'Social Media', group: 'Social Media', image: 'assets/portafolio/opcion.webp' },
    { slug: 'sabor-y-sason', title: 'Sabory Sason', category: 'Campaña Digital', group: 'Campañas', image: 'assets/portafolio/saborysason.webp' },
    { slug: 'tecnograss', title: 'Tecnograss', category: 'Branding Completo', group: 'Branding', image: 'assets/portafolio/tecnograss.webp' },
    { slug: 'tismartial', title: 'Tismartial', category: 'Estrategia Digital', group: 'Estrategia', image: 'assets/portafolio/tismartial.webp' },
];

// Banners de cada caso para las tarjetas apiladas (versión ancha para escritorio y casi cuadrada para móvil)
export const STACK_CASES = PORTFOLIO_ITEMS.map(item => ({
    slug: item.slug,
    title: item.title,
    category: item.category,
    desktop: `assets/portafolio/miniaturas/${item.slug}-banner-xl.webp`,
    mobile: `assets/portafolio/miniaturas/${item.slug}-banner-cel.webp`,
}));

// TODO: los servicios son provisionales (igual que en about.ts)
export const RECENT_WORKS = [
    { name: 'Montepinar', service: 'Campaña digital', image: 'assets/about/montepinar.webp' },
    { name: 'Tayta', service: 'Fotografía · Redes sociales', image: 'assets/about/tayta.webp' },
    { name: 'Alpina', service: 'Contenido · Meta Ads', image: 'assets/about/podadora.webp' },
];

// Galería diagonal: una pieza de campaña por caso (banner horizontal y publicación vertical).
// Miniaturas livianas en assets/portafolio/miniaturas; los originales siguen en la carpeta de cada caso.
const piece = (slug: string, kind: 'banner' | 'foto'): GalleryItem => {
    const item = PORTFOLIO_ITEMS.find(i => i.slug === slug)!;
    return {
        slug,
        title: item.title,
        category: item.category,
        image: `assets/portafolio/miniaturas/${slug}-${kind}.webp`,
        width: kind === 'banner' ? 720 : 420,
        height: kind === 'banner' ? 405 : 525,
    };
};

// Cada columna alterna banner y publicación; las tres juntas usan las 12 piezas sin repetir
export const GALLERY_COLUMNS: GalleryItem[][] = [
    [piece('martial-core', 'banner'), piece('grin-peru', 'foto'), piece('tecnograss', 'banner'), piece('sabor-y-sason', 'foto')],
    [piece('grin-peru', 'banner'), piece('opcion', 'foto'), piece('sabor-y-sason', 'banner'), piece('tismartial', 'foto')],
    [piece('opcion', 'banner'), piece('tecnograss', 'foto'), piece('tismartial', 'banner'), piece('martial-core', 'foto')],
];
