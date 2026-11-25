/**
 * Meta Conversions API — solo servidor.
 *
 * - Nada sale sin consentimiento (cookie lh_consent=granted).
 * - Datos personales solo con hash SHA-256, normalizados; nunca en claro.
 * - El token va en el cuerpo del POST, nunca en la URL.
 * - Nunca lanza: un error de Meta se registra en el log del servidor y ya.
 */

import "server-only";
import { createHash } from "node:crypto";
import { COOKIE_CONSENT, parseConsent } from "@/lib/consent";

const GRAPH_VERSION = "v26.0";
const TIMEOUT_MS = 4000;

export type EventoMeta = "PageView" | "ViewContent" | "Lead";

/** Lo que se toma de la petición del visitante. */
export interface ContextoNavegador {
	consent: boolean;
	ip: string | null;
	userAgent: string | null;
	fbp: string | null;
	fbc: string | null;
	url: string | null;
}

export interface DatosPersona {
	email?: string | null;
	telefono?: string | null;
	/** Nombre completo; se separa en nombre y apellido. */
	nombre?: string | null;
}

interface LectorCookies {
	get(name: string): { value: string } | undefined;
}
interface LectorHeaders {
	get(name: string): string | null;
}

export function metaConfigurado(): boolean {
	return Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID && process.env.META_CAPI_ACCESS_TOKEN);
}

/** Arma el contexto desde cookies() y headers() de la petición actual. */
export function contextoDesde(
	cookies: LectorCookies,
	headers: LectorHeaders,
	url?: string | null
): ContextoNavegador {
	const ip =
		headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip")?.trim() || null;
	return {
		consent: parseConsent(cookies.get(COOKIE_CONSENT)?.value) === "granted",
		ip,
		userAgent: headers.get("user-agent"),
		fbp: cookies.get("_fbp")?.value ?? null,
		fbc: cookies.get("_fbc")?.value ?? null,
		url: url ?? headers.get("referer"),
	};
}

function sha256(v: string): string {
	return createHash("sha256").update(v).digest("hex");
}

/** Minúsculas, sin acentos y solo letras (recomendación de Meta para nombres). */
function normalizarTexto(v: string): string {
	return v
		.trim()
		.toLowerCase()
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.replace(/[^a-zñ]/g, "");
}

/** Teléfono: solo dígitos y con lada 52. */
function normalizarTelefono(v: string): string | null {
	let d = v.replace(/\D/g, "");
	if (!d) return null;
	if (d.startsWith("521") && d.length === 13) d = `52${d.slice(3)}`;
	if (d.length === 10) d = `52${d}`;
	return d.length >= 12 ? d : null;
}

function datosHasheados(p: DatosPersona | undefined) {
	const out: Record<string, string[]> = {};
	if (!p) return out;
	const email = p.email?.trim().toLowerCase();
	if (email) out.em = [sha256(email)];
	const tel = p.telefono ? normalizarTelefono(p.telefono) : null;
	if (tel) out.ph = [sha256(tel)];
	const partes = (p.nombre ?? "").trim().split(/\s+/).filter(Boolean);
	const fn = partes[0] ? normalizarTexto(partes[0]) : "";
	const ln = partes.length > 1 ? normalizarTexto(partes.slice(1).join(" ")) : "";
	if (fn) out.fn = [sha256(fn)];
	if (ln) out.ln = [sha256(ln)];
	return out;
}

/**
 * Manda un evento a Meta. Devuelve false si no se mandó (sin consentimiento,
 * sin configuración o error); nunca lanza.
 */
export async function enviarEventoCapi(e: {
	nombre: EventoMeta;
	eventId: string;
	contexto: ContextoNavegador;
	customData?: Record<string, unknown>;
	persona?: DatosPersona;
}): Promise<boolean> {
	try {
		if (!e.contexto.consent || !metaConfigurado()) return false;

		const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID!;
		const token = process.env.META_CAPI_ACCESS_TOKEN!;
		const testCode = process.env.META_TEST_EVENT_CODE || undefined;

		const userData: Record<string, unknown> = { ...datosHasheados(e.persona) };
		if (e.contexto.ip) userData.client_ip_address = e.contexto.ip;
		if (e.contexto.userAgent) userData.client_user_agent = e.contexto.userAgent;
		if (e.contexto.fbp) userData.fbp = e.contexto.fbp;
		if (e.contexto.fbc) userData.fbc = e.contexto.fbc;

		const evento: Record<string, unknown> = {
			event_name: e.nombre,
			event_time: Math.floor(Date.now() / 1000),
			event_id: e.eventId,
			action_source: "website",
			user_data: userData,
		};
		if (e.contexto.url) evento.event_source_url = e.contexto.url;
		if (e.customData && Object.keys(e.customData).length) evento.custom_data = e.customData;

		const r = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				data: [evento],
				access_token: token,
				...(testCode ? { test_event_code: testCode } : {}),
			}),
			signal: AbortSignal.timeout(TIMEOUT_MS),
			cache: "no-store",
		});
		if (!r.ok) {
			const cuerpo = await r.text().catch(() => "");
			console.error("[meta capi]", e.nombre, r.status, cuerpo.slice(0, 300));
			return false;
		}
		return true;
	} catch (err) {
		console.error("[meta capi]", e.nombre, err instanceof Error ? err.message : err);
		return false;
	}
}
