import { whatsappLink } from '../../config/contact';

export interface Program {
    name: string;
    focus: string;
    description: string;
    /** Qué busca el plan (se muestra en la página /planes) */
    objective: string;
    /** Dejar vacío para no mostrar el precio */
    price: string;
    features: string[];
    popular?: boolean;
}

export const PROGRAMS: Program[] = [
    {
        name: 'IMPULSO',
        focus: 'Crecimiento de marca y contenido',
        description: 'Gestión profesional de redes y campañas publicitarias.',
        objective: 'Fortalecer la presencia digital de tu empresa, generar oportunidades comerciales y establecer una base sólida de crecimiento mediante contenido estratégico y publicidad digital.',
        price: 'S/ 1,500',
        features: [
            'Gestión de Facebook, Instagram y TikTok',
            '5 videos + 5 piezas gráficas al mes',
            '1 visita mensual de grabación',
            'Meta Ads y TikTok Ads',
            '2 reuniones y 2 reportes al mes',
        ],
    },
    {
        name: 'XPANDE',
        focus: 'Crecimiento integral y escalamiento',
        description: 'Redes, campañas y producción a mayor escala, con equipo dedicado y seguimiento semanal.',
        objective: 'Potenciar la presencia digital de tu empresa, maximizar oportunidades comerciales y consolidar un sistema avanzado de crecimiento mediante contenido estratégico y publicidad digital.',
        price: 'S/ 3,000',
        popular: true,
        features: [
            'Facebook, Instagram, TikTok, YouTube y LinkedIn',
            '10 videos + 8 piezas gráficas al mes',
            '2 visitas mensuales de grabación',
            'Meta Ads, TikTok Ads y Google Ads',
            'Reunión semanal y 2 reportes al mes',
            'Equipo de 8 personas asignadas',
        ],
    },
];

/** Filas de la tabla comparativa: [concepto, IMPULSO, XPANDE]. `null` = no incluido. */
export const COMPARISON: [string, string | null, string | null][] = [
    ['Enfoque', 'Crecimiento de marca y contenido', 'Crecimiento integral y escalamiento'],
    ['Redes sociales', 'Facebook, Instagram y TikTok', 'Facebook, Instagram, TikTok, YouTube y LinkedIn'],
    ['Estrategia de contenido', 'Calendario estratégico de publicaciones', 'Estrategia y guiones'],
    ['Videos al mes', '5', '10'],
    ['Piezas gráficas al mes', '5', '8'],
    ['Historias', 'Historias estratégicas', 'Historias por fechas festivas (Facebook e Instagram)'],
    ['Visitas de grabación', '1 al mes', '2 al mes'],
    ['Publicidad digital', 'Meta Ads y TikTok Ads (ilimitado)', 'Meta Ads, TikTok Ads y Google Ads'],
    ['Lanzamientos y optimización constante', null, 'Incluido'],
    ['Reuniones de seguimiento', '2 al mes', '1 semanal'],
    ['Reportes', '1 de marketing orgánico y 1 de publicidad digital', '2 al mes'],
    ['Equipo asignado', null, '8 personas'],
];

/** Condiciones del servicio: [título, detalle]. */
export const CONDITIONS: [string, string][] = [
    ['Contrato mínimo de 3 meses', 'Tiempo necesario para implementar y optimizar la estrategia.'],
    ['Precios sin IGV', 'El impuesto (18 %) se adiciona al monto indicado.'],
    ['Inversión publicitaria aparte', 'El presupuesto de Meta Ads, TikTok Ads, Google Ads u otras plataformas lo asume el cliente.'],
    ['Visitas de grabación', 'Tienen un costo de traslado, que depende de la ubicación del cliente.'],
    ['Revisiones', 'Cada entregable incluye hasta 2 rondas de cambios en IMPULSO y hasta 3 en XPANDE.'],
    ['Atención del equipo', 'De lunes a viernes de 9:00 a. m. a 5:00 p. m. Lo que llegue fuera de horario se atiende el siguiente día hábil.'],
    ['Pago por adelantado', 'El servicio se paga por adelantado, lo que permite programar y ejecutar las actividades del mes.'],
    ['Confidencialidad', 'Toda la información compartida entre ambas partes se trata de forma confidencial.'],
];

/** WhatsApp con un mensaje listo para pedir la propuesta de un plan */
export function planWhatsappUrl(program: Program): string {
    return whatsappLink(`¡Hola! Me interesa el plan ${program.name}.`);
}

/** WhatsApp para quien aún no sabe qué plan le conviene */
export const PLAN_ADVICE_URL = whatsappLink('¡Hola! Me gustaría que me recomienden el plan que mejor encaja con mi negocio.');
