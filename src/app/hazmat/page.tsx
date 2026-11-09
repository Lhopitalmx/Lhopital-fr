'use client'

import FeatureIntro from "@/components/FeatureIntro";
import FeatureAnimated from "@/components/FeatureAnimated";
import HeroContainer from "@/components/HeroContainer";
import CTAButton from "@/components/CTAButton";
import Modal from "@/components/Modal";
import { useState } from "react";
import ContactoForm from "@/components/ContactForm";
import Image from "next/image";
import { cld } from "@/lib/cloudinary";

const brandLogos = [
	{
		name: "Trelleborg",
		src: cld("trelleborg-logo"),
		invert: true,
	},
	{
		name: "Sava",
		src: cld("Sava", "c_limit,w_600"),
		invert: false,
	},
];

export default function Hazmat() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<HeroContainer title="HazMat" imageSrc={cld("hazmat_hero", "c_limit,w_2400")}>
				<p className="text-lg md:text-2xl font-light max-w-xl">
					Diseñados específicamente para contención, recuperación y control de
					materiales peligrosos, descontaminación, derrames químicos y
					protección del medio ambiente.
				</p>
{/* Marcas distribuidas */}
				<div className="grid grid-cols-2 gap-x-10 mt-8 max-w-md items-center">
					{brandLogos.map((brand) => (
						<div
							key={brand.name}
							className="relative h-14 md:h-16 w-40 md:w-44"
						>
							<Image
								src={brand.src}
								alt={brand.name}
								fill
								unoptimized
								className={
									brand.invert
										? "object-contain brightness-0 invert opacity-90"
										: "object-contain"
								}
							/>
						</div>
					))}
				</div>

			</HeroContainer>
			<FeatureIntro
				title="La prioridad de nuestros equipos es proteger a los usuarios y prevenir situaciones de riesgo."
				subtitle=""
			imageSrc={cld("hazmat_items", "e_replace_color:FAF9F6:12:FFFFFF/c_limit,w_1200")}
			alt="Sava-bags"
				// catalogOption={catalogOption}
			/>
			<section className="w-full bg-white py-20 px-6 md:px-20 ">
				<h2 className="text-3xl md:text-5xl text-[#111111] font-bold text-center mb-10">
					EQUIPOS HAZMAT ESPECIALIZADOS EN:
				</h2>
				<FeatureAnimated
					direction="left"
					title="Equipos y soluciones"
					description="para la protección del medio ambiente personal de rescate y sociedad civil"
					imageSrc={cld("hazmat1", "c_limit,w_1200")}
				/>

				<FeatureAnimated
					direction="right"
					title="Equipo destinado a la fuga de sustancias"
					description="en vías y espacios públicos, así como en la industria del petróleo, química y gas líquido. Tiene aplicaciones para uso en establecimientos de procesamientos químicos, refinerías, establecimientos para el proceso de gas líquido, terminales de gas, plataformas de investigación, perforación, transporte intercontinental, ferroviario y tuberías. "
					imageSrc={cld("hazmat2")}
				/>

				<FeatureAnimated
					direction="left"
					title="Sellado de tanques perforados"
					description="kits para sellados de tuberías y bolsas de drenaje con vacío que se adosan al lugar de uso mediante la aplicación de vacío, creado por una fuente de aire comprimido."
					imageSrc={cld("hazmat3")}
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
