"use client";

import Link from "next/link";
import Image from "next/image";
import { cld, CLD } from "@/lib/cloudinary";

const Footer = () => {
	return (
		<footer className="bg-black border-t border-[#b01f29] text-white text-sm py-8 px-4">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
				{/* Column 1: Logo */}
				<div className="flex flex-col items-center md:items-start">
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

				{/* Column 2: Contact info */}
				<div className="flex flex-col gap-1 items-center md:items-center">
					<p>CDMX, MX</p>
					<a href="tel:+525594705028" className="hover:underline">
						+52 (55) 9470 5028
					</a>
					<a href="mailto:contacto@lhopital-fr.mx" className="hover:underline">
						contacto@lhopital-fr.mx
					</a>

					{/* Redes sociales */}
					<div className="flex gap-5 mt-3">
						<a
							href="https://www.instagram.com/lhopitalfr/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Instagram de Lhopital FR"
							className="text-white hover:text-[#b01f29] transition-colors"
						>
							<svg
								width="22"
								height="22"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
								<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
								<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
							</svg>
						</a>
						<a
							href="https://www.facebook.com/lhopitalfr"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Facebook de Lhopital FR"
							className="text-white hover:text-[#b01f29] transition-colors"
						>
							<svg
								width="22"
								height="22"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
							</svg>
						</a>
						<a
							href="https://www.youtube.com/@LhopitalFR"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="YouTube de Lhopital FR"
							className="text-white hover:text-[#b01f29] transition-colors"
						>
							<svg
								width="22"
								height="22"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.92 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
								<polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
							</svg>
						</a>
					</div>
				</div>

				{/* Column 3: Legal */}
				<div className="flex flex-col gap-1 items-center md:items-end">
					<Link href="/aviso-de-privacidad" className="hover:underline">
						Aviso de privacidad
					</Link>
					<Link href="/terminos-y-condiciones" className="hover:underline">
						Términos y condiciones
					</Link>
					<p>Lhopital © Todos los derechos reservados</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
