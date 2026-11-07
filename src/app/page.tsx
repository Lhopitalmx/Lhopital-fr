import Reveal from "@/components/Reveal";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import EquipmentShowcase from "@/components/EquipmentShowcase";
import ContactForm from "@/components/ContactForm";
import { metadata as homeMetadata } from "./metadata";

export const metadata = homeMetadata;

export default function Home() {
	return (
		<div className="">
			<Hero />
			<EquipmentShowcase />
			<Reveal>
				<Partners />
			</Reveal>
			<Reveal>
				<section className="bg-white px-6 py-20">
					<div className="max-w-2xl mx-auto text-center mb-12">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							Contáctanos
						</h2>
						<p className="text-lg text-gray-600 leading-relaxed">
							Estamos aquí para ayudarte. Completa el siguiente formulario y uno
							de nuestros especialistas te contactará a la brevedad.
						</p>
					</div>
					<ContactForm />
				</section>
			</Reveal>
		</div>
	);
}
