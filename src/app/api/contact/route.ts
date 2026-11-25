import { NextResponse, after } from "next/server";
import { cookies, headers } from "next/headers";
import { randomUUID } from "node:crypto";
import { Resend } from "resend";
import { ContactEmail } from "@/components/ContactEmail";
import { contextoDesde, enviarEventoCapi } from "@/lib/meta/capi";

const submissions: Record<string, number> = {};

export async function POST(req: Request) {
	const ip = req.headers.get("x-forwarded-for") || "local";
	const now = Date.now();

	// Rate limit per IP
	if (submissions[ip] && now - submissions[ip] < 60 * 1000) {
		return NextResponse.json(
			{
				success: false,
				message: "Por favor espera antes de enviar otro mensaje.",
			},
			{ status: 429 }
		);
	}

	const body = await req.json();
	const { name, email, phone, subject, message, extra_field } = body;

	// Honeypot
	if (extra_field) {
		return NextResponse.json({ success: false }, { status: 400 });
	}

	// Basic validation
	if (!name || !email || !phone || !message) {
		return NextResponse.json(
			{
				success: false,
				message: "Por favor completa todos los campos obligatorios.",
			},
			{ status: 400 }
		);
	}

	// Sender logic
	const fromEmail =
		process.env.RESEND_FROM_EMAIL_VERIFIED &&
		process.env.RESEND_DOMAIN_VERIFIED === "true"
			? process.env.RESEND_FROM_EMAIL_VERIFIED
			: process.env.RESEND_FROM_EMAIL_FALLBACK;

	try {
		// Se crea aquí (no al cargar el módulo): Resend 6 falla si no hay clave, y en el build no la hay.
		const resend = new Resend(process.env.RESEND_API_KEY);
		const result = await resend.emails.send({
			from: fromEmail!,
			to: [process.env.RESEND_TO_EMAIL!],
			subject: subject || "Nuevo mensaje desde el formulario de contacto",
			react: ContactEmail({ name, email, phone, subject, message }),
		});

		if (result.error) {
			console.error("Resend error:", result.error);
			return NextResponse.json(
				{ success: false, message: result.error.message },
				{ status: 500 }
			);
		}

		submissions[ip] = now;

		// Meta Lead (Conversions API) después de responder; nunca afecta el
		// envío. Solo con consentimiento; correo, teléfono y nombre van con hash.
		const metaEventId = `lead-${randomUUID()}`;
		const contextoMeta = contextoDesde(await cookies(), await headers());
		after(() =>
			enviarEventoCapi({
				nombre: "Lead",
				eventId: metaEventId,
				contexto: contextoMeta,
				customData: { content_name: "Formulario de contacto" },
				persona: { email, telefono: phone, nombre: name },
			})
		);

		return NextResponse.json({
			success: true,
			message: "Mensaje enviado correctamente.",
			metaEventId,
		});
	} catch (error: unknown) {
		console.error("Error inesperado:", error);
		const message =
			error instanceof Error
				? error.message
				: "Hubo un error al enviar el mensaje.";
		return NextResponse.json({ success: false, message }, { status: 500 });
	}
}
