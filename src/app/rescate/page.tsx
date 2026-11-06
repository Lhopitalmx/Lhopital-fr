'use client'

import ContactoForm from "@/components/ContactForm";
import CTAButton from "@/components/CTAButton";
import FeatureAnimated from "@/components/FeatureAnimated";
import FeatureIntro from "@/components/FeatureIntro";
import HeroContainer from "@/components/HeroContainer";
import Modal from "@/components/Modal";
import { useState } from "react";
import Image from "next/image";

const brandLogos = [
    {
        name: "Res-Q-Jack",
        src: "/partners/resqjay-logo.webp",
        invert: true,
		size: "h-16 md:h-20 w-52 md:w-60",
    },
    {
        name: "Trelleborg",
        src: "/partners/trelleborg-logo.webp",
        invert: true,
    },
    {
        name: "Sava",
        src: "/partners/Sava.png",
        invert: false,
    },
    {
        name: "Génesis",
        src: "/partners/gsr_hrz_logomark_white_red.png",
        invert: true,
    },
];

export default function Rescue() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	// const catalogOptions = [
	// 	{ label: "Catálogo Rescate", file: "/catalogues/rescue-catalog.pdf" },
	// ];

	return (
		<>
			<HeroContainer title="Rescate Técnico" imageSrc="/banners/rescate.webp">
				<p>
					Contamos con equipos para las diferentes especialidades que atienden
					los profesionales. Equipos para rescate vehicular liviano y pesado,
					rescate en estructuras colapsadas (USAR) y recuperación de vehículos
					pesados y comerciales.
				</p>
                {/* Marcas distribuidas */}
                <div className="grid grid-cols-2 gap-x-10 gap-y-6 mt-8 max-w-md items-center">
                    {brandLogos.map((brand) => (
                        <div
                            key={brand.name}
                            className={`relative ${brand.size ?? "h-14 md:h-16 w-40 md:w-44"}`}
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
				title="Todos nuestros equipos cuentan con las certificaciones más importantes a nivel mundial"
				subtitle="como NFPA y EN que garantizan el buen funcionamiento y rendimiento de los equipos aún en los escenarios más complejos."
			imageSrc="/items/rescate.webp"
			alt="Rescate Item"
				// catalogOption={catalogOptions}
			/>
			<section className="w-full bg-white text-red-600 py-20 px-6 md:px-20 ">
				<h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
					EQUIPOS ESPECIALIZADOS EN RESCATE TÉCNICO:
				</h1>
				<FeatureAnimated
					direction="left"
					title="Equipo diseñado con enfoque especializado"
					description="de acuerdo con las necesidades de los usuarios y de las operaciones de rescate, 
						fabricados con alta tecnología bajo los requerimientos de NFPA 1960, EN 13731, EN 13204, EN16471 y EN16473."
					imageSrc="/features/rescate1.webp"
				/>

				<FeatureAnimated
					direction="right"
					title="Sistemas de estabilización"
					description="primaria y secundaria para rescate en estructuras colapsadas, trincheras y espacios confinados"
					imageSrc="/features/stabilization-new.webp"
				/>

				<FeatureAnimated
					direction="left"
					title="Equipos para recuperación"
					description="de vehículos comerciales, vehículos de transporte y todo lo referente a rescate vehicular"
					imageSrc="/features/rescate2.webp"
				/>
			</section>
			<section className="bg-[#FAF9F6] px-6 py-10 text-center text-black">
				<div className="max-w-xl mx-auto">
					<p className="text-lg md:text-xl leading-relaxed mb-8 text-justify">
						Le invitamos a conocer más sobre nuestros servicios y soluciones
						contactando a nuestros especialistas que con gusto atenderán su
						petición.
					</p>
					<CTAButton onClick={() => setIsModalOpen(true)} hovered>
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
