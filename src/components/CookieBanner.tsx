"use client";

/**
 * Aviso de cookies: Aceptar / Rechazar. Sin elección no se carga Google
 * Analytics, Microsoft Clarity ni el Pixel de Meta. Se reabre desde el botón
 * "Cookies" del footer.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { EVENTO_ABRIR_BANNER, guardarConsent, leerConsent } from "@/lib/consent";

export default function CookieBanner() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (leerConsent() === null) setVisible(true);
		const abrir = () => setVisible(true);
		window.addEventListener(EVENTO_ABRIR_BANNER, abrir);
		return () => window.removeEventListener(EVENTO_ABRIR_BANNER, abrir);
	}, []);

	if (!visible) return null;

	const elegir = (valor: "granted" | "denied") => {
		const antes = leerConsent();
		guardarConsent(valor);
		setVisible(false);
		// Retirar el consentimiento: recargar para descargar las herramientas.
		if (antes === "granted" && valor === "denied") window.location.reload();
	};

	return (
		<div
			role="dialog"
			aria-live="polite"
			aria-label="Preferencias de cookies"
			className="fixed inset-x-0 bottom-0 z-[60] border-t-2 border-fr-red bg-ink/95 backdrop-blur-sm text-bone"
		>
			<div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
				<p className="text-sm leading-relaxed text-bone/80 md:max-w-3xl">
					Usamos cookies de medición (Google Analytics y Microsoft Clarity) y publicidad (Meta) para saber qué
					funciona y mostrarte anuncios relevantes. Solo se activan si las aceptas.{" "}
					<Link href="/aviso-de-privacidad" className="text-bone underline underline-offset-4 hover:text-fr-red">
						Aviso de privacidad
					</Link>
				</p>
				<div className="flex shrink-0 gap-3">
					<button
						type="button"
						onClick={() => elegir("denied")}
						className="border border-bone/40 px-5 py-3 font-[almaq] text-xs font-bold uppercase tracking-[0.2em] text-bone/80 transition-colors duration-300 hover:border-bone hover:text-bone"
					>
						Rechazar
					</button>
					<button
						type="button"
						onClick={() => elegir("granted")}
						className="bg-fr-red px-5 py-3 font-[almaq] text-xs font-bold uppercase tracking-[0.2em] text-bone transition-colors duration-300 hover:bg-bone hover:text-ink"
					>
						Aceptar
					</button>
				</div>
			</div>
		</div>
	);
}
