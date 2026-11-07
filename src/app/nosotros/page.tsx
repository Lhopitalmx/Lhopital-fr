"use client";

import CTAButton from "@/components/CTAButton";
import HeroContainer from "@/components/HeroContainer";
import Modal from "@/components/Modal";
import ContactForm from "@/components/ContactForm";
import {
	ShieldCheck,
	Handshake,
	HeartHandshake,
	Lock,
	Users,
	Cpu,
} from "lucide-react";
import Image from "next/image";
import { cld } from "@/lib/cloudinary";
import { useState } from "react";

export default function NosotrosPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const valores = [
		{ label: "Honestidad", icon: ShieldCheck },
		{ label: "Compromiso", icon: Handshake },
		{ label: "Servicio", icon: HeartHandshake },
		{ label: "Confianza", icon: Lock },
		{ label: "Respeto", icon: Users },
		{ label: "Innovación", icon: Cpu },
	];
	return (
		<>
			<HeroContainer title="Nosotros" imageSrc={cld("nosotros1", "c_limit,w_2400")}>
				<p className="mb-4">
					<strong>Lhopital FR</strong> se dedica a ofrecer soluciones integrales para profesionales 
					en Protección Civil, Bomberos y Rescate en México, con el objetivo de facilitar las tareas
					diarias de las corporaciones dedicadas a proteger la integridad de la sociedad y su infraestructura.
				</p>
				<p className="mb-4">
					Somos proveedores de empresas nacionales e internacionales en todo el país, así como en las tres 
					instancias de gobierno (Municipal, Estatal y Federal).
				</p>
				<p className="mb-12">
					Nuestro equipo de profesionales está calificado para asesorar 
					a todas las corporaciones dedicadas al rescate, lucha contra incendios, protección civil 					
					ofreciendo equipos de última generación para desempeñar su labor de manera segura.
				</p>
			</HeroContainer>

			<section className="bg-white px-6 py-20">
				<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
					{/* Misión */}
					<div className="flex flex-col items-center">
						<h2 className="text-[#111111] text-4xl font-semibold mb-4 text-center">
							Misión
						</h2>
						<div className="bg-black text-white p-8 w-full h-full">
							<p className="text-base leading-relaxed text-left">
								Proveer el mejor equipamiento de manera eficiente e integral a
								las corporaciones dedicadas a la Protección Civil, Rescate y
								respuesta a emergencias de cualquier índole.
							</p>
						</div>
					</div>

					{/* Visión */}
					<div className="flex flex-col items-center">
						<h2 className="text-[#111111] text-4xl font-semibold mb-4 text-center">
							Visión
						</h2>
						<div className="bg-black text-white p-8 w-full h-full">
							<p className="text-base leading-relaxed text-left">
								Ser el principal facilitador de soluciones y equipo para
								bomberos, rescatistas, brigadistas y personal de emergencias de
								todo el país, cuidando su salud e integridad.
							</p>
						</div>
					</div>
				</div>
			</section>

		<section className="relative text-white px-6 py-20 overflow-hidden">
			{/* Background image + red overlay */}
		<div className="absolute inset-0 -z-10">
			<Image
				src={cld("burntBrickWall")}
				alt="Fondo de valores"
				fill
				unoptimized
				className="object-cover"
				priority
			/>
			<div className="absolute inset-0 bg-black/60" />
		</div>            {/* Content */}
				<div className="max-w-6xl mx-auto relative z-10">
					<h2 className="text-3xl font-bold text-center mb-12">Valores</h2>

					<div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
						{valores.map(({ label, icon: Icon }, i) => (
							<div
								key={i}
								className="flex flex-col items-center justify-center gap-4"
							>
								<Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
								<p className="text-lg font-medium">{label}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="bg-[#FAF9F6] px-6 py-20 text-center text-black">
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
				<ContactForm />
			</Modal>
		</>
	);
}
