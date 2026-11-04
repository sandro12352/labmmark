/**
 * Un bloque del texto de un artículo. Según "type" se usan unos campos u otros:
 *  - 'h2'    → text (subtítulo de una sección)
 *  - 'p'     → text (párrafo)
 *  - 'list'  → items (lista con viñetas) · ordered: true para lista numerada
 *  - 'quote' → text (frase destacada)
 *  - 'tip'   → title + text (recuadro de consejo)
 *  - 'image' → src + alt (+ caption opcional)
 */
export interface ArticleBlock {
    type: 'h2' | 'p' | 'list' | 'quote' | 'tip' | 'image';
    text?: string;
    items?: string[];
    ordered?: boolean;
    title?: string;
    src?: string;
    alt?: string;
    caption?: string;
}

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    /** Fecha de publicación o de la última revisión (AAAA-MM-DD). En el artículo se muestra como "Actualizado" */
    date: string;
    readMinutes: number;
    image: string;
    imageAlt: string;
    /** Segunda imagen, más pequeña, que se superpone a la principal en las composiciones del inicio del blog */
    image2?: string;
    image2Alt?: string;
    /** Quién firma el artículo; si no se indica, "Equipo LABMMARK" */
    author?: string;
    /** "En resumen": 3 o 4 ideas clave que se muestran antes del texto */
    summary: string[];
    /** Texto del artículo, en bloques */
    body: ArticleBlock[];
}

/** Firma por defecto de los artículos */
export const DEFAULT_AUTHOR = 'Equipo LABMMARK';

// EJEMPLO: artículos y textos de relleno para ver el diseño. Reemplazar por los reales (títulos, textos, fechas e imágenes).
// Mientras la página lleve datos de ejemplo debe seguir marcada como "noindex" en app.routes.ts y fuera del sitemap.
export const BLOG_POSTS: BlogPost[] = [
    {
        slug: 'errores-publicidad-meta',
        title: 'Los 5 errores más comunes al empezar con publicidad en Meta',
        excerpt: 'Qué revisar antes de invertir tu primer sol en anuncios, y cómo evitar los fallos que más dinero hacen perder.',
        category: 'Publicidad digital',
        date: '2026-10-28',
        readMinutes: 6,
        image: 'assets/blog/errores-meta.webp',
        imageAlt: 'Persona revisando documentos con gesto de preocupación',
        image2: 'assets/blog/errores-meta-2.webp',
        image2Alt: 'Dos personas del equipo, una con el celular y otra con el pulgar arriba',
        summary: [
            'Antes de invertir, define qué quieres lograr con el anuncio.',
            'Un anuncio sin una página o un chat que reciba al cliente pierde la venta.',
            'Mide resultados reales (mensajes, ventas), no solo "me gusta".',
        ],
        body: [
            { type: 'p', text: 'Muchos negocios empiezan con publicidad en Meta (Facebook e Instagram) con entusiasmo, gastan su primer presupuesto en pocos días y se quedan sin resultados. Casi siempre el problema no es la plataforma, sino un puñado de errores que se repiten.' },
            { type: 'h2', text: '1. No tener un objetivo claro' },
            { type: 'p', text: 'No es lo mismo querer mensajes de clientes, visitas a tu web o reconocimiento de marca. Cada objetivo se configura distinto, y si eliges mal, la plataforma optimiza para lo que no necesitas.' },
            { type: 'h2', text: '2. Enviar a las personas a un lugar que no vende' },
            { type: 'p', text: 'Un buen anuncio no sirve si quien hace clic llega a una página lenta, confusa o a un chat que tarda horas en responder. Antes de pagar por visitas, revisa que el destino esté listo para atenderlas.' },
            { type: 'tip', title: 'Revisión rápida', text: 'Abre tu anuncio desde tu celular, haz clic como si fueras un cliente y anota cuántos pasos necesitas para contactar al negocio. Si son más de tres, hay algo que simplificar.' },
            { type: 'h2', text: '3. Medir solo "me gusta" y alcance' },
            { type: 'p', text: 'Los números que se ven bonitos no siempre pagan las cuentas. Lo que importa es cuántos mensajes, cotizaciones o ventas trae cada sol invertido.' },
            { type: 'list', items: ['Costo por mensaje o por cliente potencial.', 'Cuántos de esos contactos terminan comprando.', 'Cuánto recuperas frente a lo que gastaste.'] },
            { type: 'h2', text: '4. Cambiar todo cada dos días' },
            { type: 'p', text: 'Las campañas necesitan unos días para aprender. Si modificas el público, el presupuesto y el diseño a cada rato, nunca sabrás qué funcionó. Cambia una cosa a la vez y espera datos suficientes.' },
            { type: 'h2', text: '5. Usar un solo anuncio' },
            { type: 'p', text: 'Probar dos o tres versiones distintas de imagen o de mensaje te muestra qué le interesa realmente a tu público, y es la forma más barata de mejorar.' },
            { type: 'quote', text: 'Invertir en anuncios sin medir es como encender las luces y salir de la tienda.' },
        ],
    },
    {
        slug: 'elegir-agencia-marketing',
        title: 'Cómo elegir una agencia de marketing digital sin equivocarte',
        excerpt: 'Las preguntas que conviene hacer antes de contratar y las señales de que una agencia sí sabe lo que hace.',
        category: 'Estrategia',
        date: '2026-10-21',
        readMinutes: 5,
        image: 'assets/blog/elegir-agencia-2.webp',
        imageAlt: 'Editora de video sonriendo en su estudio',
        image2: 'assets/blog/elegir-agencia.webp',
        image2Alt: 'Presentadora sonriendo frente a un micrófono',
        summary: [
            'Pide casos reales, con resultados y con el nombre del cliente.',
            'Desconfía de las promesas de resultados garantizados.',
            'Pregunta quién hará el trabajo del día a día y cómo se reporta.',
        ],
        body: [
            { type: 'p', text: 'Elegir una agencia es una decisión que afecta tus ventas durante meses. Estas son las preguntas que ayudan a distinguir a una agencia que trabaja con método de una que solo promete.' },
            { type: 'h2', text: 'Pide casos reales' },
            { type: 'p', text: 'Una agencia seria puede mostrarte proyectos concretos: qué necesitaba el cliente, qué se hizo y qué cambió. Si solo ves logos sin explicación, pregunta más.' },
            { type: 'h2', text: 'Preguntas que conviene hacer' },
            { type: 'list', ordered: true, items: ['¿Quién trabajará en mi cuenta y cuánto tiempo le dedicará?', '¿Cómo y cada cuánto recibiré reportes?', '¿Qué incluye el precio y qué se cobra aparte?', '¿Qué pasa si decido terminar el contrato?'] },
            { type: 'tip', title: 'Señal de alerta', text: 'Nadie puede garantizarte un número exacto de ventas o seguidores. Si una agencia lo hace, pide que te explique cómo lo logrará.' },
            { type: 'h2', text: 'Revisa cómo se comunican contigo' },
            { type: 'p', text: 'La forma en que te atienden antes de contratar suele ser la forma en que te atenderán después. Si responden con claridad y sin presión, es buena señal.' },
        ],
    },
    {
        slug: 'pagina-web-profesional-peru',
        title: '¿Cuánto cuesta una página web profesional en Perú?',
        excerpt: 'De qué depende el precio de una web y qué debería incluir para que de verdad te traiga clientes.',
        category: 'Diseño web',
        date: '2026-10-14',
        readMinutes: 7,
        image: 'assets/blog/pagina-web.webp',
        imageAlt: 'Editor de video pensativo entre pilas de referencias',
        image2: 'assets/blog/pagina-web-2.webp',
        image2Alt: 'Editor de video en su escritorio con la exportación en curso',
        summary: [
            'El precio depende de cuántas páginas, funciones y contenido necesitas.',
            'Una web barata sin estrategia suele salir más cara a la larga.',
            'Lo importante es que cargue rápido, se vea bien en celular y lleve al cliente a contactarte.',
        ],
        body: [
            { type: 'p', text: 'No existe un precio único, porque no todas las webs son iguales. Una página de presentación sencilla y una tienda con pagos online son proyectos muy distintos. Lo útil es entender de qué depende el costo.' },
            { type: 'h2', text: 'De qué depende el precio' },
            { type: 'list', items: ['Cantidad de páginas y secciones.', 'Si necesita tienda, reservas, pagos o un panel para editar contenido.', 'Si el diseño es a medida o parte de una plantilla.', 'Quién escribe los textos y prepara las imágenes.'] },
            { type: 'h2', text: 'Qué debería incluir siempre' },
            { type: 'p', text: 'Más allá del diseño, una web que trae clientes carga rápido, se ve bien en el celular, aparece en Google con un título claro y tiene botones visibles para escribirte o llamarte.' },
            { type: 'tip', title: 'Pregunta clave', text: 'Antes de pedir precios, escribe qué quieres que haga tu web: ¿recibir mensajes, vender, mostrar tu trabajo? Con eso, cualquier cotización será más precisa.' },
            { type: 'h2', text: 'Lo barato puede salir caro' },
            { type: 'p', text: 'Una web hecha sin pensar en tu cliente puede verse bien y no generar ninguna consulta. Invertir en estrategia desde el inicio evita rehacerla a los pocos meses.' },
        ],
    },
    {
        slug: 'calendario-contenido-redes',
        title: 'Contenido que vende: cómo planificar un mes de redes sociales',
        excerpt: 'Un método simple para organizar tus publicaciones y dejar de improvisar cada día.',
        category: 'Redes sociales',
        date: '2026-10-07',
        readMinutes: 4,
        image: 'assets/blog/calendario-redes.webp',
        imageAlt: 'Dos jóvenes sobre fondo violeta, uno con la mano en la frente',
        summary: [
            'Planificar el mes ahorra tiempo y evita publicar "por cumplir".',
            'Reparte el contenido entre enseñar, mostrar tu trabajo y vender.',
            'Revisa qué funcionó y repite lo que mejor responde.',
        ],
        body: [
            { type: 'p', text: 'Improvisar cada día es agotador y se nota en los resultados. Planificar un mes de contenido no requiere herramientas caras: basta con un método simple.' },
            { type: 'h2', text: 'Un reparto sencillo' },
            { type: 'list', items: ['Contenido que enseña o ayuda a tu cliente.', 'Contenido que muestra tu trabajo y tus resultados.', 'Contenido que invita a comprar o a contactarte.'] },
            { type: 'h2', text: 'Cómo organizarlo' },
            { type: 'p', text: 'Elige cuántas publicaciones puedes sostener por semana, asigna un tema a cada una y deja fechas fijas. Es mejor publicar tres veces por semana todo el mes que diez veces en una semana y luego desaparecer.' },
            { type: 'tip', title: 'Al final del mes', text: 'Mira cuáles publicaciones recibieron más mensajes o guardados, no solo más "me gusta", y haz más de ese tipo.' },
        ],
    },
    {
        slug: 'branding-negocios-pequenos',
        title: 'Branding para negocios pequeños: por dónde empezar',
        excerpt: 'Lo básico que tu marca necesita para verse profesional, sin gastar de más.',
        category: 'Branding',
        date: '2026-09-30',
        readMinutes: 5,
        image: 'assets/blog/branding.webp',
        imageAlt: 'Editora de video con gorro esperando un render',
        summary: [
            'Una marca es más que un logo: es cómo te ven y cómo te recuerdan.',
            'Empieza por lo esencial: logo, colores, tipografías y tono de voz.',
            'La constancia importa más que tener muchos materiales.',
        ],
        body: [
            { type: 'p', text: 'Muchos negocios creen que el branding es solo hacer un logo. En realidad es el conjunto de cosas que hacen que tu marca se vea y se sienta coherente en todas partes.' },
            { type: 'h2', text: 'Lo esencial para empezar' },
            { type: 'list', items: ['Un logo claro y que funcione en tamaños pequeños.', 'Dos o tres colores y una o dos tipografías.', 'Una forma de hablar, que se note en tus textos y respuestas.'] },
            { type: 'h2', text: 'Úsalo siempre igual' },
            { type: 'p', text: 'De nada sirve tener una identidad cuidada si cada publicación se ve distinta. Guarda tus colores y tipografías en un documento y úsalos en todo.' },
            { type: 'tip', title: 'Para empezar hoy', text: 'Pon tu logo, tus colores y tus tipografías en una sola hoja. Cada vez que hagas una pieza, ábrela como referencia.' },
        ],
    },
    {
        slug: 'metricas-que-importan',
        title: 'Las métricas que sí importan (y las que solo se ven bonitas)',
        excerpt: 'Cómo leer los números de tus campañas para tomar decisiones y no solo para mostrar reportes.',
        category: 'Analítica',
        date: '2026-09-23',
        readMinutes: 6,
        image: 'assets/blog/metricas.webp',
        imageAlt: 'Editor de video con gesto cansado frente a su monitor',
        summary: [
            'Los seguidores y los "me gusta" no pagan las cuentas por sí solos.',
            'Mide lo que te acerca a vender: contactos, cotizaciones y ventas.',
            'Un reporte útil termina con una decisión, no solo con números.',
        ],
        body: [
            { type: 'p', text: 'Un reporte lleno de números puede ser muy bonito y no servir de nada. Lo importante es saber qué cifras están ligadas a tus ventas.' },
            { type: 'h2', text: 'Métricas que sí importan' },
            { type: 'list', items: ['Cuántos contactos o mensajes recibes.', 'Cuánto te cuesta conseguir cada contacto.', 'Cuántos de esos contactos se convierten en clientes.'] },
            { type: 'h2', text: 'Métricas que solo se ven bonitas' },
            { type: 'p', text: 'Los seguidores, los "me gusta" y el alcance sirven como contexto, pero por sí solos no dicen si tu marketing está funcionando.' },
            { type: 'quote', text: 'Un número sin una decisión detrás es solo un adorno.' },
        ],
    },
];
