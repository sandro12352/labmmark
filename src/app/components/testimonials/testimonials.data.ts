export interface VideoTestimonial {
    /** Id del video en YouTube */
    id: string;
    client: string;
    /** Frase del cliente (es el título del video, en minúsculas) */
    quote: string;
    /** Duración en segundos */
    seconds: number;
    /** Segundo en que debe empezar a reproducirse */
    start?: number;
}

export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@labmmarkagency';

// Videos del canal "Labmmark Agency". Las miniaturas están en assets/testimonios/<id>.webp
// TODO: los dos últimos videos no traen el nombre del cliente en la descripción de YouTube
export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
    { id: 'rT6i0EqiZg8', client: 'Tecnograss', quote: 'Por primera vez empezamos a recibir leads con intención de compra', seconds: 209, start: 88 },
    { id: 'dTzP0QFeIRc', client: 'Catalina', quote: 'No teníamos ni redes sociales y las campañas explotaron el primer mes', seconds: 94 },
    { id: 'Wc4AZodk8Ss', client: 'GRIN', quote: 'Cambiamos de agencia varias veces y nada funcionaba hasta que los encontramos y todo cambió', seconds: 166 },
    { id: 'JFzooFtsmgs', client: 'Terry Guty', quote: 'Pensaba que invertir en publicidad era para marcas grandes, pero pasé de tener una tienda a tres', seconds: 112 },
    { id: 'U27HwAE9maQ', client: 'Lions', quote: 'Nos funcionaron las campañas de Facebook, Instagram y LinkedIn', seconds: 17 },
    { id: 'mTP14JLNrfc', client: 'Infarvet', quote: 'Me voló la cabeza escalar mi negocio solo en 3 meses', seconds: 91 },
    { id: 'ELtqqfp3x3Q', client: 'Bubble Head', quote: 'Nuestros primeros S/18,000 en ventas por WhatsApp', seconds: 106 },
    { id: '98Dl1ttq8fM', client: 'TIS Martial Arts', quote: 'Notamos un cambio radical, nos vemos muy profesionales y la llegada del alumnado ha sido óptima', seconds: 45 },
    { id: 'innPFw-vXjc', client: 'Centro Madre', quote: 'Hoy nos conocen más y eso se refleja en la cantidad de pacientes agendados', seconds: 27 },
    { id: 'rpSE5cySOGs', client: 'Prado Viteri', quote: 'El cambio fue impactante desde el primer día, los recomiendo totalmente', seconds: 33 },
    { id: 'K7yloQsiAss', client: 'Martial Core', quote: 'Una mala agencia nos hizo perder el tiempo… esta nos hizo evolucionar', seconds: 37 },
    { id: '-1va_LBTPII', client: 'Lambalab', quote: 'La diferencia estuvo en la metodología y eso se reflejó en nuestras ventas', seconds: 21 },
    { id: 'zXIOkWTF6Z0', client: 'Margi', quote: 'En solo 4 meses se notó la diferencia, crecimos enormemente en nuestras ventas', seconds: 28 },
    { id: 'WbPSzNTJEJ4', client: 'SGA', quote: 'Venimos trabajando 2 años y realmente han transformado nuestros resultados', seconds: 22 },
    { id: 'HYtfK2iKevU', client: 'HELPMED', quote: 'Hemos mejorado enormemente las ventas en tan solo 4 meses', seconds: 22 },
    { id: '0J5C6jY5VVE', client: 'Lima Barber', quote: 'La gente nos reconoce, pero lo más importante es que nuestras reservas se han incrementado', seconds: 20 },
    { id: 'IpiRbfm-YkA', client: 'Cliente de LABMMARK', quote: 'Nosotros crecimos en todo: seguidores, alcance, y eso nos ha posicionado mucho mejor', seconds: 106 },
    { id: 'oKBgxKq83GM', client: 'Cliente de LABMMARK', quote: 'Nunca tuvimos resultados con otras agencias, pero con ustedes los tuvimos desde el día uno', seconds: 79 },
];
