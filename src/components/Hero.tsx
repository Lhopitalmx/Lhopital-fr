"use client";

import { Cormorant_Garamond } from "next/font/google";
import Modal from "./Modal";
import ContactForm from "./ContactForm";
import { useState } from "react";
import { cldVideo } from "@/lib/cloudinary";

// Video del hero en Cloudinary, armado con tres tramos del original para que pese menos:
// 0-10 s, 15-20 s y 25-29.9 s (en el segundo 30 empiezan logos de otras empresas).
// ac_none quita el audio porque se reproduce sin sonido.
const HERO_VIDEO = "TRELLEBORGXLHOPITAL";
const HERO_VIDEO_TRANSFORMS = [
	"so_0,eo_10",
	`l_video:${HERO_VIDEO},so_15,eo_20,fl_splice`,
	"fl_layer_apply",
	`l_video:${HERO_VIDEO},so_25,eo_29.9,fl_splice`,
	"fl_layer_apply",
	"ac_none,q_auto:eco,c_limit,w_1920",
].join("/");

// Misma cursiva que usa Moto para "The standard"
const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["500"],
	style: ["italic"],
});

export default function Hero() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleClick = () => {
		setIsModalOpen(true);
	};

	return (
		<section className="relative w-full h-screen overflow-hidden text-white">
			<video
				autoPlay
				muted
				loop
				playsInline
				poster={cldVideo(HERO_VIDEO, "jpg", "so_0,q_auto,c_limit,w_1920")}
				className="absolute top-0 left-0 w-full h-full object-cover z-0"
			>
				<source src={cldVideo(HERO_VIDEO, "webm", HERO_VIDEO_TRANSFORMS)} type="video/webm" />
				<source src={cldVideo(HERO_VIDEO, "mp4", HERO_VIDEO_TRANSFORMS)} type="video/mp4" />
			</video>

			{/* Overlay neutro (sin tinte azul): oscuro a la izquierda y abajo para que el texto respire */}
			<div
				aria-hidden="true"
				className="absolute inset-0 z-0 bg-gradient-to-r from-[#111111]/75 via-[#111111]/35 to-transparent"
			/>
			<div
				aria-hidden="true"
				className="absolute inset-0 z-0 bg-gradient-to-t from-[#111111]/70 via-transparent to-transparent"
			/>

			{/* Hero content: centrado vertical, alineado a la izquierda (estilo Moto) */}
			<div className="relative z-10 w-full max-w-[1440px] mx-auto h-full px-6 sm:px-10 lg:px-16 flex items-center pt-24">
				<div className="max-w-3xl">
					{/* Título principal (H1 para Google) con estilo de etiqueta */}
					<div className="flex items-center gap-3 mb-8">
						<span aria-hidden="true" className="block w-10 h-px bg-[#C9A961]" />
						<h1 className="font-[almaq] text-[#C9A961] text-xs sm:text-sm font-bold tracking-[0.35em] uppercase">
							Fire &amp; Rescue
						</h1>
					</div>

					{/* Slogan */}
					<p className="font-[rider] text-[#F4F1EC] leading-[0.85] tracking-tight mb-6">
						<span className="block text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold uppercase">
							We are
						</span>
						<span
							className={`${cormorant.className} block italic font-medium text-[#C9A961] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-wide mt-1`}
						>
							The Standard
						</span>
					</p>

					{/* Subtítulo */}
					<p className="font-[almaq] text-[#F4F1EC]/70 text-sm sm:text-base font-semibold tracking-[0.3em] uppercase mb-10">
						Est. 2021 &middot; CDMX, México
					</p>

					{/* CTA */}
					<button
						onClick={handleClick}
						className="bg-[#F4F1EC] text-[#111111] px-7 py-3 font-[almaq] text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#B01F29] hover:text-[#F4F1EC] transition-colors duration-300"
					>
						Contáctanos
					</button>
				</div>
			</div>

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<ContactForm />
			</Modal>
		</section>
	);
}
