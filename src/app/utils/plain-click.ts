/**
 * Enlaces con dirección real (href) que se navegan sin recargar: un clic normal ejecuta la acción,
 * pero Ctrl/Cmd/Mayús o el botón del medio dejan que el navegador abra el enlace en otra pestaña.
 */
export function onPlainClick(event: MouseEvent, action: () => void) {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    action();
}
