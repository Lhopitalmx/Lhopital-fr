/**
 * Consentimiento de cookies de medición y publicidad (Google Analytics,
 * Microsoft Clarity y Meta Pixel + Conversions API).
 *
 * Cookie propia `lh_consent` = "granted" | "denied", 12 meses. Sin cookie
 * = sin decisión: no se carga ninguna herramienta ni se manda nada.
 * Se usa en el navegador y en el servidor (solo constantes y parseo).
 */

export const COOKIE_CONSENT = "lh_consent";
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;
/** Evento de ventana cuando el visitante cambia su elección. */
export const EVENTO_CONSENT = "lh-consent";
/** Evento de ventana para reabrir el banner (botón "Cookies" del footer). */
export const EVENTO_ABRIR_BANNER = "lh-consent-abrir";

export type Consent = "granted" | "denied" | null;

export function parseConsent(valor: string | undefined | null): Consent {
	return valor === "granted" || valor === "denied" ? valor : null;
}

/** Navegador: lee la elección guardada. */
export function leerConsent(): Consent {
	if (typeof document === "undefined") return null;
	const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_CONSENT}=([^;]*)`));
	return parseConsent(m ? decodeURIComponent(m[1]) : null);
}

/** Navegador: guarda la elección y avisa a quien escuche. */
export function guardarConsent(valor: "granted" | "denied") {
	const seguro = location.protocol === "https:" ? "; Secure" : "";
	document.cookie = `${COOKIE_CONSENT}=${valor}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax${seguro}`;
	window.dispatchEvent(new CustomEvent(EVENTO_CONSENT, { detail: valor }));
}
