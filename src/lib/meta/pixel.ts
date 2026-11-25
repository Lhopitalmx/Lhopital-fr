/**
 * Meta Pixel en el navegador. Solo se usa después de que el visitante
 * acepta cookies. Cada evento que también va por Conversions API lleva el
 * mismo event_id en ambos lados para que Meta lo cuente una sola vez.
 */

import { leerConsent } from "@/lib/consent";
import type { Linea } from "@/lib/lineas";

type Fbq = ((...args: unknown[]) => void) & {
	callMethod?: (...args: unknown[]) => void;
	queue: unknown[];
	push: Fbq;
	loaded: boolean;
	version: string;
};

declare global {
	interface Window {
		fbq?: Fbq;
		_fbq?: Fbq;
	}
}

export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

export function nuevoEventId(): string {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function permitido(): boolean {
	return Boolean(PIXEL_ID) && leerConsent() === "granted";
}

/**
 * Crea la cola `fbq` (el mismo stub del snippet oficial) y hace `init`.
 * fbevents.js se carga aparte con next/script y procesa la cola en orden.
 */
export function iniciarPixel() {
	if (typeof window === "undefined" || !permitido() || window.fbq) return;
	const fbq = function (...args: unknown[]) {
		if (fbq.callMethod) fbq.callMethod(...args);
		else fbq.queue.push(args);
	} as Fbq;
	fbq.push = fbq;
	fbq.loaded = true;
	fbq.version = "2.0";
	fbq.queue = [];
	window.fbq = fbq;
	if (!window._fbq) window._fbq = fbq;
	// Solo los eventos que mandamos nosotros (sin clics automáticos).
	window.fbq("set", "autoConfig", false, PIXEL_ID);
	window.fbq("init", PIXEL_ID);
}

/** Evento del Pixel; no hace nada si el Pixel no está cargado o no hay consentimiento. */
export function track(eventName: string, params: Record<string, unknown> = {}, eventId?: string) {
	if (typeof window === "undefined" || !window.fbq || !permitido()) return;
	try {
		window.fbq("track", eventName, params, eventId ? { eventID: eventId } : undefined);
	} catch {
		// nunca romper la página por el Pixel
	}
}

// ─── _fbc desde fbclid ───
// fbclid se recuerda solo en memoria hasta que haya consentimiento; no se
// escribe ninguna cookie antes.
let fbclidPendiente: string | null = null;

export function recordarFbclid() {
	if (typeof window === "undefined") return;
	const v = new URLSearchParams(window.location.search).get("fbclid");
	if (v) fbclidPendiente = v;
}

export function fijarFbc() {
	if (!fbclidPendiente || !permitido()) return;
	const actual = document.cookie.match(/(?:^|; )_fbc=([^;]*)/)?.[1];
	if (actual && decodeURIComponent(actual).endsWith(`.${fbclidPendiente}`)) return;
	const seguro = location.protocol === "https:" ? "; Secure" : "";
	const valor = `fb.1.${Date.now()}.${fbclidPendiente}`;
	document.cookie = `_fbc=${valor}; Max-Age=${60 * 60 * 24 * 90}; Path=/; SameSite=Lax${seguro}`;
}

export function datosViewContent(linea: Linea) {
	return {
		content_ids: [linea.id],
		content_name: linea.nombre,
		content_category: linea.categoria,
		content_type: "product_group",
	};
}

/**
 * Manda el evento al Pixel y su copia al servidor (/api/meta/event → CAPI)
 * con el mismo event_id. El servidor toma la línea de la URL, no del
 * navegador.
 */
export function enviarEvento(eventName: "PageView" | "ViewContent", linea?: Linea | null) {
	if (!permitido()) return;
	const eventId = nuevoEventId();
	track(eventName, eventName === "ViewContent" && linea ? datosViewContent(linea) : {}, eventId);
	try {
		void fetch("/api/meta/event", {
			method: "POST",
			keepalive: true,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				event_name: eventName,
				event_id: eventId,
				event_source_url: window.location.href,
			}),
		}).catch(() => {});
	} catch {
		// sin servidor: el Pixel igual registra el evento
	}
}
