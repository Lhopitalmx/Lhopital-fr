"use client";

import Image from "next/image";
import Link from "next/link";
import { cld } from "@/lib/cloudinary";

// Pinta de negro lo blanco de los logos "reverse" (hechos para fondo oscuro en Corporate).
const BLACK_ON_LIGHT = "e_replace_color:000000:60:FFFFFF";

// Mismo peso visual para todos los logos (igual que en LhopitalCorp): todos ocupan la misma área,
// así que un logo alargado queda más ancho y bajo, y uno compacto más angosto y alto.
const LOGO_AREA = 7000; // px², ~170×42 para un logo de proporción 4:1

function logoBox(aspect: number) {
	const width = Math.round(Math.sqrt(LOGO_AREA * aspect));
	return { width: `min(${width}px, 100%)`, aspectRatio: String(aspect) };
}

type Partner = {
	name: string;
	// Public ID en Cloudinary (los mismos logos que usa LhopitalCorp). Se recorta el margen con e_trim.
	logo: string;
	// Proporción ancho/alto del logo ya recortado.
	aspect: number;
	transforms?: string;
	// Sin href el logo no es enlace (aún no hay página para esa marca).
	href?: string;
};

// El orden de este arreglo es el orden en pantalla.
const partners: Partner[] = [
	{ name: "Res-Q-Jack®", logo: "2021_RQJ_Logo-with_tag-light_BG", aspect: 6.9, href: "/rescate" },
	{ name: "Trelleborg®", logo: "trelleborg", aspect: 2.39, transforms: BLACK_ON_LIGHT, href: "/hazmat" },
	{ name: "SUPERVAC®", logo: "supervac", aspect: 5.72, href: "/ventilacion" },
	{ name: "LION®", logo: "LIONLogo_stamp_red_tagline", aspect: 2.35, href: "/proteccion-personal" },
	{ name: "HexArmor®", logo: "HexArmor_navy", aspect: 4.25, href: "/proteccion-personal" },
];

export default function Partners() {
	return (
		<section className="py-12 px-4 bg-[#FAF9F6] text-[#111111]">
			<h2 className="text-3xl font-semibold text-center mb-10">
				Nuestros Socios
			</h2>
			<ul className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-10 items-center">
				{partners.map((partner) => {
					const logo = (
						<div className="relative" style={logoBox(partner.aspect)}>
							<Image
								src={cld(partner.logo, ["e_trim", partner.transforms, "w_480"].filter(Boolean).join("/"))}
								alt={partner.name}
								fill
								unoptimized
								className="object-contain"
							/>
						</div>
					);
					return (
						<li
							key={partner.name}
							className="flex h-20 items-center justify-center last:col-span-2 sm:last:col-span-1"
						>
							{partner.href ? (
								<Link href={partner.href} className="flex w-full justify-center">
									{logo}
								</Link>
							) : (
								logo
							)}
						</li>
					);
				})}
			</ul>
		</section>
	);
}
