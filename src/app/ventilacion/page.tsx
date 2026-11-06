"use client";

import FeatureAnimated from "@/components/FeatureAnimated";
import HeroContainer from "@/components/HeroContainer";
import CTAButton from "@/components/CTAButton";
import Modal from "@/components/Modal";
import { useState } from "react";
import ContactoForm from "@/components/ContactForm";
import Image from "next/image";
import { cld } from "@/lib/cloudinary";

// TODO: faltan la foto del hero y las fotos de cada recuadro (imageSrc).
export default function Ventilacion() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<HeroContainer title="Ventilación">
				<p className="text-lg md:text-2xl font-light max-w-xl">
					Equipos de ventilación de presión positiva, negativa, ventilación
					para espacios confinados, ventilación industrial.
				</p>

				{/* Marca distribuida */}
				<div className="relative h-14 md:h-16 w-56 md:w-64 mt-8">
					<Image
						src={cld("supervac", "e_trim/w_600")}
						alt="SUPERVAC"
						fill
						unoptimized
						className="object-contain object-left brightness-0 invert opacity-90"
					/>
				</div>
			</HeroContainer>

			<section className="w-full bg-white py-20 px-6 md:px-20">
				<h1 className="text-3xl md:text-5xl text-red-600 font-bold text-center mb-10">
					EQUIPOS DE VENTILACIÓN ESPECIALIZADOS EN:
				</h1>
				<FeatureAnimated
					direction="left"
					title="Ventilación positiva, negativa y espacios confinados"
					description="SUPERVAC® para bomberos profesionales, eléctricos y de gasolina con certificación AMCA 240-22."
				/>

				<FeatureAnimated
					direction="right"
					title="Ventilación de grado industrial"
					description="SUPERVAC® con motores TEAO (Totally Enclosed Air Over – Totalmente cerrados, refrigerados por aire externo) de velocidad variable, motores eléctricos para atmósferas peligrosas, neumáticos o de motor a gasolina."
				/>

				<FeatureAnimated
					direction="left"
					title="Ventiladores a gran escala"
					description="SUPERVAC® para ventilación de terminales aeroportuarias, grandes bodegas, estructuras comerciales y edificios de gran altura."
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
