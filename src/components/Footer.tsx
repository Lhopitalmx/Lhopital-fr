"use client";

import Link from "next/link";
import Image from "next/image";
import { cld, CLD } from "@/lib/cloudinary";

// Mismo acomodo que el footer de Lhopital-moto: logo | contacto | redes,
// y abajo una franja con el copyright y los enlaces legales.

const iconProps = {
	width: 22,
	height: 22,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round" as const,
	strokeLinejoin: "round" as const,
};

const socialLinks = [
	{
		href: "https://www.instagram.com/lhopitalfr/",
		label: "Instagram de Lhopital FR",
		icon: (
			<svg {...iconProps}>
				<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
				<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
				<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
			</svg>
		),
	},
	{
		href: "https://www.facebook.com/lhopitalfr",
		label: "Facebook de Lhopital FR",
		icon: (
			<svg {...iconProps}>
				<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
			</svg>
		),
	},
	{
		href: "https://www.youtube.com/@LhopitalFR",
		label: "YouTube de Lhopital FR",
		icon: (
			<svg {...iconProps}>
				<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.92 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
				<polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
			</svg>
		),
	},
	{
		href: "https://www.linkedin.com/company/lhopital-fr/posts/?feedView=all",
		label: "LinkedIn de Lhopital FR",
		icon: (
			<svg {...iconProps}>
				<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
				<rect x="2" y="9" width="4" height="12" />
				<circle cx="4" cy="4" r="2" />
			</svg>
		),
	},
];

const Footer = () => {
	return (
		<footer className="bg-black border-t border-[#b01f29] text-white text-sm py-8 px-4">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
					{/* Logo */}
					<div className="flex justify-center md:justify-start">
						<Image
							src={cld(CLD.logoHorizOscuroBw, "w_400")}
							alt="Lhopital Logo"
							width={200}
							height={40}
							className="h-auto"
							unoptimized
							priority
						/>
					</div>

					{/* Contacto y Corporativo */}
					<div className="flex flex-col gap-1 items-center">
						<p>CDMX, MX</p>
						<a href="tel:+525594621951" className="hover:underline">
							+52 (55) 9462 1951
						</a>
						<a
							href="mailto:contacto@lhopital-fr.mx"
							className="hover:underline"
						>
							contacto@lhopital-fr.mx
						</a>
						<a
							href="https://www.lhopitalcorp.mx"
							target="_blank"
							rel="noopener noreferrer"
							className="mt-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-[#b01f29] transition-colors"
						>
							Corporativo
						</a>
					</div>

					{/* Redes sociales */}
					<div className="flex gap-5 justify-center md:justify-end">
						{socialLinks.map((social) => (
							<a
								key={social.href}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={social.label}
								className="text-white hover:text-[#b01f29] transition-colors"
							>
								{social.icon}
							</a>
						))}
					</div>
				</div>

				{/* Franja legal: copyright a la izquierda, enlaces a la derecha */}
				<div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs uppercase tracking-[0.15em] text-white/60">
					<p>Lhopital © Todos los derechos reservados</p>
					<nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
						<Link
							href="/aviso-de-privacidad"
							className="hover:text-white hover:underline"
						>
							Aviso de privacidad
						</Link>
						<Link
							href="/terminos-y-condiciones"
							className="hover:text-white hover:underline"
						>
							Términos y condiciones
						</Link>
					</nav>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
