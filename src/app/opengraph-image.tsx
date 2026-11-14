import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Imagen que aparece al compartir el sitio en WhatsApp, Facebook, LinkedIn, etc.
// Sigue los lineamientos de FR: fondo negro, texto hueso, dorado solo en el slogan
// y el rojo como acento (franja inferior), igual que el hero de inicio.

export const alt =
	"Lhopital FR — Equipo para bomberos: rescate técnico, HAZMAT, ventilación y protección personal en México";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#111111";
const BONE = "#F4F1EC";
const RED = "#B01F29";
const GOLD = "#C9A961";

// Escudo FR blanco y negro (el mismo del header), en PNG porque el generador no lee WebP.
const ESCUDO_URL =
	"https://res.cloudinary.com/lhopital-moto/image/upload/f_png,c_limit,h_440/escudo_bw_fr";

// Si Cloudinary no responde, la imagen se genera sin escudo en lugar de romper el build.
async function loadEscudo(): Promise<string | null> {
	try {
		const res = await fetch(ESCUDO_URL);
		if (!res.ok) return null;
		const buffer = Buffer.from(await res.arrayBuffer());
		return `data:image/png;base64,${buffer.toString("base64")}`;
	} catch {
		return null;
	}
}

export default async function Image() {
	const publicDir = join(process.cwd(), "public");
	const [almaq, rider, cormorant, escudo] = await Promise.all([
		readFile(join(publicDir, "Almaq-Refined.otf")),
		readFile(join(publicDir, "LhopitalRider-Regular.ttf")),
		readFile(join(publicDir, "fonts", "CormorantGaramond-MediumItalic.woff")),
		loadEscudo(),
	]);

	return new ImageResponse(
		(
			<div
				style={{
					width: size.width,
					height: size.height,
					display: "flex",
					position: "relative",
					background: INK,
					// border-box: sin esto el generador suma el padding al ancho y el escudo se sale.
					paddingLeft: 88,
					paddingRight: 88,
					boxSizing: "border-box",
					alignItems: "center",
					justifyContent: "space-between",
					fontFamily: "Almaq",
				}}
			>
				{/* Texto: misma jerarquía que el hero de inicio */}
				<div style={{ display: "flex", flexDirection: "column", width: 700, flexShrink: 0 }}>
					<div style={{ display: "flex", alignItems: "center" }}>
						<div style={{ width: 48, height: 2, background: GOLD, marginRight: 18 }} />
						<div style={{ color: GOLD, fontSize: 22, letterSpacing: 8, fontWeight: 700 }}>
							FIRE &amp; RESCUE
						</div>
					</div>

					<div
						style={{
							fontFamily: "Rider",
							color: BONE,
							fontSize: 156,
							lineHeight: 0.85,
							marginTop: 40,
						}}
					>
						WE ARE
					</div>
					<div
						style={{
							fontFamily: "Cormorant",
							fontStyle: "italic",
							color: GOLD,
							fontSize: 112,
							lineHeight: 1,
							marginTop: 6,
						}}
					>
						The Standard
					</div>

					<div
						style={{
							color: BONE,
							opacity: 0.7,
							fontSize: 18,
							letterSpacing: 5,
							fontWeight: 700,
							marginTop: 48,
						}}
					>
						RESCATE · HAZMAT · VENTILACIÓN · PROTECCIÓN PERSONAL
					</div>
				</div>

				{/* Escudo FR */}
				{/* Caja fija para que cualquier proporción del escudo quede dentro del margen */}
				{escudo && (
					<div
						style={{
							display: "flex",
							width: 300,
							height: 360,
							flexShrink: 0,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={escudo}
							alt=""
							width={300}
							height={360}
							style={{ width: "100%", height: "100%", objectFit: "contain", opacity: 0.95 }}
						/>
					</div>
				)}

				{/* Acento rojo FR: la misma franja que separa el footer */}
				<div
					style={{
						position: "absolute",
						left: 0,
						bottom: 0,
						width: size.width,
						height: 8,
						background: RED,
					}}
				/>
			</div>
		),
		{
			...size,
			fonts: [
				{ name: "Almaq", data: almaq, weight: 700, style: "normal" },
				{ name: "Rider", data: rider, weight: 700, style: "normal" },
				{ name: "Cormorant", data: cormorant, weight: 500, style: "italic" },
			],
		},
	);
}
