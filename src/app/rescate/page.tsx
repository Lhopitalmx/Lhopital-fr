'use client'

import ContactoForm from "@/components/ContactForm";
import CTAButton from "@/components/CTAButton";
import FeatureAnimated from "@/components/FeatureAnimated";
import FeatureIntro from "@/components/FeatureIntro";
import HeroContainer from "@/components/HeroContainer";
import Modal from "@/components/Modal";
import { useState } from "react";
import { cld } from "@/lib/cloudinary";
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
			imageSrc={cld("rescate_items", "e_replace_color:FAF9F6:12:FFFFFF/c_limit,w_1200")}
			alt="Rescate Item"
				// catalogOption={catalogOptions}
			/>
			<section className="w-full bg-white text-[#111111] py-20 px-6 md:px-20 ">
				<h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
					EQUIPOS ESPECIALIZADOS EN RESCATE TÉCNICO:
				</h1>
				<FeatureAnimated
					direction="left"
					title="Trelleborg® Sistemas de levantamiento y estabilización"
					description="Ya sea para levantamiento de estructuras colapsadas, operaciones USAR o rescate vehicular pesado.
					Los sistemas SAVA de Trelleborg están diseñados para el trabajo pesado y cuentan con certificación EN."
					imageSrc={cld("rescate1", "c_limit,w_1800")}
					square
					imagePosition="object-[15%_50%]"
				/>

				<FeatureAnimated
					direction="right"
					title="Res-Q-Jack® Sistemas de estabilización"
					description="Para rescate en Zanjas o Rescate vehicular liviano y pesado. Los equipos de Res-Q-Jack® son la 
					mejor opción para estabilizar los escenarios más complejos y trabajar de manera segura."
					imageSrc={cld("estabilizacion", "c_crop,g_north_west,x_0,y_820,w_3213,h_3213/c_limit,w_1200")}
					square
				/>

				<FeatureAnimated
					direction="left"
					title="Trelleborg® Equipos para recuperación"
					description="Para vehículos comerciales, de transporte o muy voluminosos, los equipos de baja presión 
					de SAVA de Trelleborg® son la mejor opción para recuperar carga de manera segura sin aumentar el daño de esta"
					imageSrc={cld("rescate2")}
					square
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
