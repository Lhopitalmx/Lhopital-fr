/**
 * Google Analytics 4 y Microsoft Clarity en el navegador, con el mismo
 * consentimiento que Meta (cookie lh_consent): sin "Aceptar" no se carga
 * nada ni se manda nada.
 *
 * page_view lo manda GA solo (config + medición mejorada en cambios de
 * ruta); aquí solo van los eventos propios.
 */

import { leerConsent } from "@/lib/consent";

export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
/** Proyecto de Microsoft Clarity (público, ya estaba en el sitio). */
export const CLARITY_ID = "sef1eizc17";

declare global {
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

function permitido(): boolean {
	return Boolean(GA_ID) && leerConsent() === "granted";
}

/** Crea la cola de gtag y la configura. gtag.js se carga aparte (Medicion.tsx). */
export function iniciarGA() {
	if (typeof window === "undefined" || !permitido() || window.gtag) return;
	window.dataLayer = window.dataLayer || [];
	window.gtag = function gtag() {
		// gtag.js espera el objeto `arguments`, no un arreglo
		// eslint-disable-next-line prefer-rest-params
		window.dataLayer!.push(arguments);
	};
	// Solo medición; nada de publicidad de Google.
	window.gtag("consent", "default", {
		analytics_storage: "granted",
		ad_storage: "denied",
		ad_user_data: "denied",
		ad_personalization: "denied",
	});
	window.gtag("js", new Date());
	window.gtag("config", GA_ID);
}

/** Evento de GA4; no hace nada sin consentimiento o sin ID. */
export function gaEvento(nombre: string, params: Record<string, unknown> = {}) {
	if (typeof window === "undefined" || !permitido()) return;
	iniciarGA();
	if (!window.gtag) return;
	try {
		window.gtag("event", nombre, params);
	} catch {
		// nunca romper la página por Analytics
	}
}
