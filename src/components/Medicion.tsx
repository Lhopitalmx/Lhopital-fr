"use client";

/**
 * Herramientas de medición: Meta Pixel, Google Analytics 4 y Microsoft
 * Clarity. Ninguna se carga hasta que el visitante acepta cookies.
 *
 * - Meta PageView en la primera carga (navegador + CAPI con el mismo
 *   event_id); en los cambios de ruta fbevents manda el suyo.
 * - GA mide sus páginas solo.
 * - Al entrar a una línea (rescate, HAZMAT, ventilación, protección
 *   personal): ViewContent en Meta y view_item_list en GA.
 */

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { EVENTO_CONSENT, leerConsent } from "@/lib/consent";
import { lineaDeRuta } from "@/lib/lineas";
import { PIXEL_ID, enviarEvento, fijarFbc, iniciarPixel, recordarFbclid } from "@/lib/meta/pixel";
import { CLARITY_ID, GA_ID, gaEvento, iniciarGA } from "@/lib/analytics/ga";

export default function Medicion() {
	const [activo, setActivo] = useState(false);

	useEffect(() => {
		recordarFbclid();
		const revisar = () => {
			if (leerConsent() !== "granted") return;
			iniciarPixel();
			fijarFbc();
			iniciarGA();
			setActivo(true);
		};
		revisar();
		window.addEventListener(EVENTO_CONSENT, revisar);
		return () => window.removeEventListener(EVENTO_CONSENT, revisar);
	}, []);

	if (!activo) return null;

	return (
		<>
			{PIXEL_ID && (
				<Script id="meta-pixel" src="https://connect.facebook.net/en_US/fbevents.js" strategy="afterInteractive" />
			)}
			{GA_ID && (
				<Script
					id="ga4"
					src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`}
					strategy="afterInteractive"
				/>
			)}
			<Script id="clarity-init" strategy="afterInteractive">
				{`
					(function(c,l,a,r,i,t,y){
						c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
						t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
						y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
					})(window, document, "clarity", "script", "${CLARITY_ID}");
				`}
			</Script>
			<Eventos />
		</>
	);
}

function Eventos() {
	const pathname = usePathname();
	const pageViewEnviado = useRef(false);

	useEffect(() => {
		if (!pageViewEnviado.current) {
			pageViewEnviado.current = true;
			enviarEvento("PageView");
		}
		const linea = lineaDeRuta(pathname);
		if (!linea) return;
		enviarEvento("ViewContent", linea);
		gaEvento("view_item_list", { item_list_id: linea.id, item_list_name: linea.nombre });
	}, [pathname]);

	return null;
}
