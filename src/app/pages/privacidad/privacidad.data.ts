import { ADDRESS_LINES, EMAIL, LEGAL_NAME, RUC } from '../../config/contact';

/** Un bloque de texto: párrafo, lista (con viñetas) o datos clave/valor */
export interface LegalBlock {
    type: 'p' | 'list' | 'facts';
    text?: string;
    items?: string[];
    facts?: { label: string; value: string }[];
}

export interface LegalSection {
    id: string;
    title: string;
    blocks: LegalBlock[];
}

/** Fecha de la última revisión del texto (cámbiala cada vez que se modifique la política) */
export const PRIVACY_UPDATED = '5 de noviembre de 2026';

// Texto de la política de privacidad. Conviene que lo revise un abogado antes de publicarlo.
// Pendientes de confirmar: plazo de conservación (12 meses), transferencia internacional e inscripción del banco de datos ante la ANPD.
export const PRIVACY_SECTIONS: LegalSection[] = [
    {
        id: 'quienes-somos',
        title: 'Quiénes somos',
        blocks: [
            { type: 'p', text: 'LABMMARK es el nombre comercial de la agencia de marketing digital con sede en Lima, Perú. Somos los responsables de los datos personales que se recogen a través de www.labmmark.com.' },
            {
                type: 'facts',
                facts: [
                    { label: 'Razón social', value: LEGAL_NAME },
                    { label: 'RUC', value: RUC },
                    { label: 'Dirección', value: ADDRESS_LINES.join(', ') },
                    { label: 'Correo de contacto', value: EMAIL },
                ],
            },
        ],
    },
    {
        id: 'datos',
        title: 'Qué datos recogemos',
        blocks: [
            { type: 'p', text: 'Los que tú nos das. Cuando completas el formulario de contacto, recogemos tu nombre, correo electrónico, teléfono y el mensaje que nos escribes.' },
            { type: 'p', text: 'Los que se registran automáticamente. Al visitar el sitio, los servidores que lo alojan pueden registrar datos técnicos como la dirección IP, el tipo de navegador y las páginas visitadas, para que el sitio funcione y sea seguro.' },
            { type: 'p', text: 'WhatsApp y redes sociales. Si nos escribes por WhatsApp o por una red social, esa conversación también se rige por las condiciones y la política de privacidad de esa plataforma.' },
        ],
    },
    {
        id: 'finalidad',
        title: 'Para qué usamos tus datos',
        blocks: [
            { type: 'p', text: 'Usamos tus datos solo para:' },
            { type: 'list', items: ['responder tu consulta;', 'comunicarnos contigo y preparar una propuesta de servicios;', 'y, si llegas a contratarnos, gestionar la relación comercial.'] },
            { type: 'p', text: 'No vendemos tus datos. Si en el futuro quisiéramos enviarte promociones o boletines, te lo pediremos aparte y podrás decir que no.' },
        ],
    },
    {
        id: 'consentimiento',
        title: 'Tu consentimiento',
        blocks: [
            { type: 'p', text: 'Para enviar el formulario de contacto debes marcar la casilla mediante la cual autorizas expresamente el tratamiento de tus datos personales (nombre, correo, teléfono y mensaje) para atender tu consulta y gestionar propuestas de servicios. Con ella también declaras haber leído esta política. La casilla no viene marcada de antemano.' },
            { type: 'p', text: 'Puedes retirar tu consentimiento en cualquier momento escribiéndonos al correo de contacto.' },
        ],
    },
    {
        id: 'terceros',
        title: 'Con quién compartimos tus datos',
        blocks: [
            { type: 'p', text: 'Proveedores que tratan datos por cuenta nuestra. Los usamos para que el sitio funcione y solo los tratan según nuestras instrucciones:' },
            {
                type: 'list',
                items: [
                    'Web3Forms: recibe el mensaje del formulario y lo reenvía a nuestro correo.',
                    'Vercel: servicio donde está alojado el sitio.',
                    'Google (Gmail): el correo donde recibimos tus solicitudes.',
                ],
            },
            { type: 'p', text: 'Servicios de terceros que se cargan en el sitio. Al visitar la página, estos servicios pueden recibir datos técnicos tuyos, como tu dirección IP, y los tratan según sus propias políticas de privacidad:' },
            {
                type: 'list',
                items: [
                    'Google Fonts: carga las tipografías de la página.',
                    'YouTube: los videos se cargan en modo de privacidad ampliada y no dejan cookies hasta que los reproduces.',
                    'OpenStreetMap: muestra el mapa de la página de Contacto.',
                    'WhatsApp (Meta): si eliges escribirnos por ese canal, tus mensajes se tratan según su política de privacidad.',
                ],
            },
            { type: 'p', text: 'Algunos de estos servicios utilizan infraestructura ubicada fuera del Perú, por lo que tus datos pueden tratarse en otros países. No compartimos tus datos con otros terceros, salvo que la ley nos lo exija.' },
        ],
    },
    {
        id: 'conservacion',
        title: 'Cuánto tiempo conservamos tus datos',
        blocks: [
            {
                type: 'list',
                items: [
                    'Si solo hiciste una consulta y no contrataste, conservamos tus datos hasta 12 meses desde el último contacto y luego los eliminamos.',
                    'Si te conviertes en cliente, los conservamos mientras dure la relación y durante el plazo que la ley exija para documentos comerciales y tributarios.',
                    'Puedes pedir que eliminemos tus datos cuando quieras, salvo que la ley nos obligue a conservarlos.',
                ],
            },
        ],
    },
    {
        id: 'derechos',
        title: 'Tus derechos',
        blocks: [
            { type: 'p', text: 'Tienes derecho a acceder a tus datos, rectificarlos, cancelarlos y oponerte a su uso, a ser informado sobre su tratamiento y a solicitar su portabilidad, además de los demás derechos que reconoce la Ley N.° 29733, Ley de Protección de Datos Personales, y su reglamento vigente.' },
            { type: 'p', text: `Para ejercerlos, escríbenos a ${EMAIL} indicando tu nombre y qué quieres solicitar. Atenderemos tu solicitud en los siguientes plazos, contados desde el día siguiente de recibirla:` },
            {
                type: 'list',
                items: [
                    'Acceso y portabilidad: hasta 20 días hábiles.',
                    'Rectificación, cancelación y oposición: hasta 10 días hábiles.',
                    'Información: hasta 8 días hábiles.',
                ],
            },
            { type: 'p', text: 'Salvo en el caso de información, el plazo podrá ampliarse una sola vez por un período igual cuando las circunstancias lo justifiquen. Si tenemos dudas sobre tu identidad, podremos pedirte que la acredites.' },
            { type: 'p', text: 'Si consideras que no atendimos tus derechos, puedes presentar un reclamo ante la Autoridad Nacional de Protección de Datos Personales (ANPD) del Ministerio de Justicia.' },
        ],
    },
    {
        id: 'seguridad',
        title: 'Seguridad',
        blocks: [
            { type: 'p', text: 'Aplicamos medidas razonables para proteger tus datos, como el uso de conexión segura (HTTPS) y el acceso restringido a los mensajes que recibimos. Ningún sistema es totalmente infalible, pero trabajamos para reducir los riesgos.' },
        ],
    },
    {
        id: 'cookies',
        title: 'Cookies y herramientas de medición',
        blocks: [
            { type: 'p', text: 'Este sitio no usa herramientas de analítica ni píxeles de publicidad, y solo emplea los elementos técnicos necesarios para funcionar. Si en el futuro incorporamos alguna herramienta que registre la navegación de los visitantes, actualizaremos esta política y te pediremos permiso cuando corresponda.' },
        ],
    },
    {
        id: 'menores',
        title: 'Menores de edad',
        blocks: [{ type: 'p', text: 'El sitio no está dirigido a menores de edad y no recogemos sus datos de forma intencional.' }],
    },
    {
        id: 'cambios',
        title: 'Cambios en esta política',
        blocks: [{ type: 'p', text: 'Podemos actualizar esta política. Cuando lo hagamos, cambiaremos la fecha de "Última actualización" que aparece al inicio.' }],
    },
    {
        id: 'contacto',
        title: 'Contacto',
        blocks: [{ type: 'p', text: `Para cualquier consulta sobre esta política o sobre tus datos, escríbenos a ${EMAIL}.` }],
    },
];
