"use client";

import Image from "next/image";
import ContactoForm from "@/components/ContactForm";
import CTAButton from "@/components/CTAButton";
import FeatureAnimated from "@/components/FeatureAnimated";
import FeatureIntro from "@/components/FeatureIntro";
import HeroContainer from "@/components/HeroContainer";
import Modal from "@/components/Modal";
import { useState } from "react";
import { cld } from "@/lib/cloudinary";

const brandLogos = [
	{
		name: "LION",
		src: "/partners/lion_corporate_logo_tagline_reverse.png",
	},
	{
		name: "HexArmor",
		src: "/partners/EXT-2.png",
	},
];

export default function PersonalProtection() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	// const catalogOptions = [
	// 	{
	// 		label: "Catálogo BarriAire-Carbon",
	// 		file: "/catalogues/pgi-hood-carbon.pdf",
	// 	},
	// 	{ label: "Catálogo BarriAire-Gold", file: "/catalogues/pgi-hood-gold.pdf" },
	// 	{ label: "Catálogo PGI-Fireline-Suits", file: "/catalogues/pgi-suits.pdf" },
	// 	{ label: "Catálogo HexArmor", file: "/catalogues/HEXARMOR-F&R.pdf" },
	// ];

	return (
		<>
			<HeroContainer
				title="Protección Personal"
				imageSrc={cld("proteccion-personal1", "c_limit,w_2400")}
				imagePosition="object-[20%_0%]"
			>
				<p className="text-lg md:text-2xl font-light max-w-xl">
					El equipo de protección personal es la parte más importante para
					salvaguardar la integridad de bomberos y rescatistas, por eso contamos
					con los equipos de protección personal más ergonómicos y seguros para
					los profesionales.
				</p>

				{/* Marcas distribuidas */}
				<div className="flex items-center gap-8 md:gap-10 mt-8 flex-wrap">
					{brandLogos.map((brand) => (
						<div key={brand.name} className="relative h-12 md:h-14 w-32 md:w-40">
							<Image
								src={brand.src}
								alt={brand.name}
								fill
								unoptimized
								className="object-contain brightness-0 invert opacity-90"
							/>
						</div>
					))}
				</div>
			</HeroContainer>
			<FeatureIntro
				title="Todos nuestros equipos cuentan con certificación NFPA "
				subtitle="(National Fire Protection Association), garantizando la seguridad y calidad de los equipos."
				imageSrc={cld("pp1", "e_replace_color:FAF9F6:12:FFFFFF/c_limit,w_1200")}
				alt="Protección Personal item"
				// catalogOption={catalogOptions}
			/>
			<section className="w-full bg-white text-[#111111] py-20 px-6 md:px-20 ">
				<h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
					EQUIPOS DE PROTECCIÓN PERSONAL ESPECIALIZADOS EN:
				</h1>
				<FeatureAnimated
					direction="left"
					title="EPP LION®"
					description="Líder mundial en equipos de protección personal para bomberos y rescatistas profesionales con certificación NFPA y EN."
					imageSrc={cld("proteccion1v", "c_limit,w_1200")}
				/>

				<FeatureAnimated
					direction="right"
					title="EPP HexArmor®"
					description="Los mejores guantes para rescate técnico."
					imageSrc={cld("proteccion2h", "c_pad,ar_3:2,b_white,w_1200")}
				/>

				<FeatureAnimated
					direction="left"
					title="Equipos personalizados"
					description="desarrollados y fabricados de acuerdo a las necesidades específicas de los cuerpos de rescate y emergencias"
					imageSrc={cld("proteccion3", "c_crop,g_north_west,x_0,y_380,w_3280,h_2460/c_limit,w_1200")}
				/>
			</section>
			<section className="bg-[#FAF9F6] px-6 py-10 text-center text-black">
				<div className="max-w-xl mx-auto">
					<p className="text-lg md:text-xl leading-relaxed mb-8 text-center">
						Le invitamos a conocer más sobre nuestros servicios y soluciones
						contactando a nuestros especialistas que con gusto atenderán su
						petición.
					</p>
					<CTAButton onClick={() => setIsModalOpen(true)}>
						CONTÁCTANOS
					</CTAButton>
				</div>
			</section>

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<ContactoForm />
			</Modal>
		</>
	);
}
