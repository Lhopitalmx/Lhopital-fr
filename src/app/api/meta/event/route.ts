/**
 * POST /api/meta/event — copia de servidor (Conversions API) de PageView y
 * ViewContent, con el mismo event_id que el Pixel para deduplicar.
 *
 * - Lead lo manda /api/contact al enviarse el formulario, nunca desde aquí.
 * - Requiere la cookie de consentimiento y que la petición venga del sitio.
 * - La línea de ViewContent sale de la URL (lista blanca), no del navegador.
 * - Siempre responde 204: un fallo de Meta no afecta la página.
 */

import { NextResponse, after } from "next/server";
import { cookies, headers } from "next/headers";
import { contextoDesde, enviarEventoCapi, metaConfigurado } from "@/lib/meta/capi";
import { lineaDeRuta } from "@/lib/lineas";

export const dynamic = "force-dynamic";

const vacio = () => new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
	if (!metaConfigurado()) return vacio();

	const hs = await headers();
	const host = hs.get("host");
	const origen = hs.get("origin");
	if (!host || (origen && new URL(origen).host !== host)) return vacio();

	const b = (await req.json().catch(() => null)) as {
		event_name?: unknown;
		event_id?: unknown;
		event_source_url?: unknown;
	} | null;
	if (!b || (b.event_name !== "PageView" && b.event_name !== "ViewContent")) return vacio();
	if (typeof b.event_id !== "string" || b.event_id.length < 8 || b.event_id.length > 80) return vacio();

	// La URL del evento debe ser de este mismo sitio
	let url: URL | null = null;
	if (typeof b.event_source_url === "string" && b.event_source_url.length <= 2000) {
		try {
			const u = new URL(b.event_source_url);
			if (u.host === host) url = u;
		} catch {
			// ignorar
		}
	}

	const contexto = contextoDesde(await cookies(), hs, url?.toString() ?? null);
	if (!contexto.consent) return vacio();

	let customData: Record<string, unknown> | undefined;
	if (b.event_name === "ViewContent") {
		const linea = url ? lineaDeRuta(url.pathname) : null;
		if (!linea) return vacio();
		customData = {
			content_ids: [linea.id],
			content_name: linea.nombre,
			content_category: linea.categoria,
			content_type: "product_group",
		};
	}

	const nombre = b.event_name;
	const eventId = b.event_id;
	after(() => enviarEventoCapi({ nombre, eventId, contexto, customData }));
	return vacio();
}
