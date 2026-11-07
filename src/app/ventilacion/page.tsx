"use client";

import FeatureAnimated from "@/components/FeatureAnimated";
import FeatureIntro from "@/components/FeatureIntro";
import HeroContainer from "@/components/HeroContainer";
import CTAButton from "@/components/CTAButton";
import Modal from "@/components/Modal";
import { useState } from "react";
import ContactoForm from "@/components/ContactForm";
import Image from "next/image";
import { cld } from "@/lib/cloudinary";

export default function Ventilacion() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<HeroContainer
				title="Ventilación"
				// v-hero ampliada hacia la derecha (relleno generado por Cloudinary) para que el
				// ventilador quede completo en la mitad izquierda y el texto caiga sobre el fondo.
				imageSrc={cld("v-hero", "c_pad,ar_1.9,g_west,b_gen_fill/c_limit,w_2400")}
				imagePosition="object-[37%_50%] md:object-right"
			>
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
			<FeatureIntro
				title="Todos nuestros ventiladores cuentan con certificación AMCA"
				subtitle="(Air Movement and Control Association), garantizando el desempeño real de cada equipo."
				imageSrc={cld("ventilacion_items", "e_replace_color:FAF9F6:12:FFFFFF/c_limit,w_1200")}
				alt="Ventiladores SUPERVAC"
			/>

			<section className="w-full bg-white py-20 px-6 md:px-20">
				<h1 className="text-3xl md:text-5xl text-[#111111] font-bold text-center mb-10">
					EQUIPOS DE VENTILACIÓN ESPECIALIZADOS EN:
				</h1>
				<FeatureAnimated
					direction="left"
					title="Ventilación positiva, negativa y espacios confinados"
					description="SUPERVAC® para bomberos profesionales, eléctricos y de gasolina con certificación AMCA 240-22."
					imageSrc={cld("ventilacion1", "c_limit,w_1200")}
				/>

				<FeatureAnimated
					direction="right"
					title="Ventilación de grado industrial"
					description="SUPERVAC® con motores TEAO (Totally Enclosed Air Over – Totalmente cerrados, refrigerados por aire externo) de velocidad variable, motores eléctricos para atmósferas peligrosas, neumáticos o de motor a gasolina."
					imageSrc={cld("ventilacion2", "c_limit,w_1200")}
				/>

				<FeatureAnimated
					direction="left"
					title="Ventiladores a gran escala"
					description="SUPERVAC® para ventilación de terminales aeroportuarias, grandes bodegas, estructuras comerciales y edificios de gran altura."
					imageSrc={cld("ventilacion3", "c_limit,w_1200")}
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
