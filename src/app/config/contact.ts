/** Número de WhatsApp de la agencia, con código de país y sin signos (es el que aparece en Contacto: +51 933 024 824) */
export const WHATSAPP_NUMBER = '51933024824';

export const PHONE_DISPLAY = '+51 933 024 824';

export const EMAIL = 'labmmarkperu@gmail.com';

export const INSTAGRAM_URL = 'https://www.instagram.com/labmmarkagency/';
export const TIKTOK_URL = 'https://www.tiktok.com/@labmmarkagency';
export const FACEBOOK_URL = 'https://www.facebook.com/labmmark.agency';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/labmmark-agency-53929a259/';

export const ADDRESS_LINES = ['Casma 267', 'Lima 15302, Perú'];
export const OFFICE_COORDS: [number, number] = [-11.99665854893034, -77.08027101743741];
// TODO: confirmar los días de atención
export const HOURS_LINES = ['Lunes a viernes', '9:00 a. m. – 5:00 p. m.'];
export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${OFFICE_COORDS.join(',')}`;

export function whatsappLink(message: string): string {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Clave pública de Web3Forms (https://web3forms.com) para que el formulario de Contacto llegue al correo de la agencia.
 * TODO: pegar aquí la clave que Web3Forms envía por correo. Mientras esté vacía, el formulario abre WhatsApp con el mensaje.
 */
export const WEB3FORMS_KEY = '';

/** Enlace de los botones "HABLEMOS": abre un chat de WhatsApp */
export const HABLEMOS_URL = whatsappLink('¡Hola! Me gustaría conversar sobre un proyecto.');
