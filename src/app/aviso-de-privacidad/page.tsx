"use client";

import type { ReactNode } from "react";

const link = "underline text-[#b01f29]";

function H2({ children }: { children: ReactNode }) {
	return (
		<h2 className="text-xl font-semibold mb-2 text-[#111111]">{children}</h2>
	);
}

function List({ items }: { items: ReactNode[] }) {
	return (
		<ul className="list-disc pl-6 mb-2 space-y-1">
			{items.map((item, i) => (
				<li key={i}>{item}</li>
			))}
		</ul>
	);
}

const Email = () => (
	<a href="mailto:contacto@lhopital.mx" className={link}>
		contacto@lhopital.mx
	</a>
);

export default function AvisoDePrivacidad() {
	return (
		<main className="bg-white text-black font-light">
			<div className="md:h-24 h-32 bg-black w-full" />

			<section className="max-w-4xl mx-auto px-6 py-20 text-sm md:text-base leading-relaxed">
				<h1 className="text-3xl font-bold mb-8 text-[#111111]">
					Aviso de Privacidad
				</h1>

				<section className="mb-6">
					<H2>Responsable</H2>
					<p>
						<strong>LHOPITAL, S.A. de C.V.</strong> (&quot;Lhopital&quot;), a
						través de su división Lhopital FR, con domicilio en Andador 5,
						5C-31, Col. Alianza Popular Revolucionaria, Alcaldía Coyoacán, C.P.
						04800, Ciudad de México, es responsable del tratamiento de tus datos
						personales conforme a la Ley Federal de Protección de Datos
						Personales en Posesión de los Particulares, publicada en el Diario
						Oficial de la Federación el 20 de marzo de 2025 (la
						&quot;Ley&quot;).
					</p>
				</section>

				<section className="mb-6">
					<H2>Datos que recabamos</H2>
					<p className="mb-2">
						Recabamos únicamente los datos necesarios para atender tu solicitud
						de información, cotización o compra, cuando nos los proporcionas a
						través del formulario de contacto de{" "}
						<a href="https://www.lhopital-fr.mx" className={link}>
							www.lhopital-fr.mx
						</a>
						, por correo electrónico o por teléfono:
					</p>
					<List
						items={[
							<>
								<strong>Identificación y contacto:</strong> nombre completo,
								correo electrónico y teléfono.
							</>,
							<>
								<strong>Datos laborales:</strong> institución, dependencia o
								empresa en la que trabajas, cargo, y ciudad o estado.
							</>,
							<>
								<strong>Solicitud:</strong> productos, marcas o servicios de tu
								interés y los detalles de tu requerimiento.
							</>,
							<>
								<strong>Facturación, solo si concretas una compra:</strong> RFC,
								nombre o razón social, régimen fiscal, código postal fiscal y
								Constancia de Situación Fiscal.
							</>,
							<>
								<strong>Entrega, solo si concretas una compra:</strong>{" "}
								domicilio de entrega y nombre de quien recibe.
							</>,
						]}
					/>
					<p className="mb-2">No recabamos datos personales sensibles.</p>
					<p>
						<strong>Sin ventas en línea.</strong> Este sitio es informativo: no
						se realizan ventas ni cobros a través de él. Las compras se
						formalizan directamente con nuestro equipo comercial mediante
						cotización.
					</p>
				</section>

				<section className="mb-6">
					<H2>Finalidades</H2>
					<p className="mb-2 font-semibold">
						Finalidades primarias (necesarias para la relación contigo):
					</p>
					<List
						items={[
							"Atender tus solicitudes de información, cotización o demostración de productos.",
							"Dar seguimiento comercial a las cotizaciones que solicites.",
							"Formalizar, facturar y entregar las compras que realices.",
							"Brindarte soporte técnico y atender garantías de los equipos adquiridos.",
							"Cumplir obligaciones legales, fiscales y requerimientos de autoridad.",
						]}
					/>
					<p className="mb-2 font-semibold">
						Finalidades secundarias (no son necesarias para atender tu
						solicitud):
					</p>
					<List
						items={[
							"Enviarte información sobre nuevos productos, capacitaciones, demostraciones y eventos.",
							"Realizar encuestas de satisfacción y estudios estadísticos internos.",
						]}
					/>
					<p>
						Si no deseas que usemos tus datos para las finalidades secundarias,
						escríbenos a <Email /> con el asunto &quot;No deseo
						publicidad&quot;, o usa el enlace para darte de baja que incluye
						cada correo informativo. Tu negativa no afecta la atención de tus
						solicitudes ni tus compras.
					</p>
				</section>

				<section className="mb-6">
					<H2>Con quién compartimos tus datos</H2>
					<p className="mb-2">
						No vendemos tus datos personales. Los compartimos solo en la medida
						necesaria con:
					</p>
					<List
						items={[
							"Proveedores tecnológicos de hospedaje web y de envío de correos, incluido el servicio que procesa el formulario de contacto del sitio, que tratan los datos por cuenta de Lhopital y pueden tener servidores fuera de México.",
							"Empresas de paquetería, solo para entregar las compras que realices.",
							"Fabricantes de las marcas que distribuimos, que pueden estar fuera de México, solo cuando sea necesario para atender una garantía o soporte técnico de un equipo que adquiriste.",
							"Autoridades competentes, cuando la ley lo exija.",
						]}
					/>
				</section>

				<section className="mb-6">
					<H2>Derechos ARCO y revocación del consentimiento</H2>
					<p className="mb-2">
						Puedes acceder, rectificar, cancelar u oponerte al tratamiento de
						tus datos (derechos ARCO), revocar tu consentimiento o limitar su
						uso y divulgación, enviando una solicitud a <Email /> que incluya:
						tu nombre, un medio para responderte, copia de una identificación
						oficial (o los documentos que acrediten la representación) y la
						descripción clara de los datos y del derecho que quieres ejercer.
						Responderemos dentro de los plazos que establece la Ley. El
						ejercicio de estos derechos es gratuito.
					</p>
					<p>
						Si consideras que tu derecho a la protección de datos personales fue
						vulnerado, puedes acudir ante la Secretaría Anticorrupción y Buen
						Gobierno, autoridad competente en la materia.
					</p>
				</section>

				<section className="mb-6">
					<H2>Cookies y herramientas de medición</H2>
					<p className="mb-2">
						Este sitio no utiliza cookies de analítica, publicidad ni
						seguimiento. Solo puede usar el almacenamiento técnico indispensable
						para su funcionamiento.
					</p>
					<p className="mb-2">
						Utilizamos Google Search Console, un servicio de Google que nos
						muestra información agregada sobre cómo aparece este sitio en los
						resultados de búsqueda de Google, como búsquedas, clics e
						impresiones. Esta herramienta no instala cookies en tu navegador ni
						nos permite identificarte.
					</p>
					<p>
						Si incorporamos herramientas de analítica o de publicidad,
						actualizaremos este aviso.
					</p>
				</section>

				<section className="mb-6">
					<H2>Seguridad</H2>
					<p>
						Aplicamos medidas administrativas, técnicas y físicas para proteger
						tus datos contra daño, pérdida, alteración o acceso no autorizado.
						Solo el personal que los necesita para las finalidades descritas
						tiene acceso a ellos.
					</p>
				</section>

				<section className="mb-6">
					<H2>Consentimiento</H2>
					<p>
						Si nos proporcionas tus datos por cualquiera de los medios descritos
						después de haber tenido a tu disposición este aviso, consientes su
						tratamiento para las finalidades primarias. Puedes oponerte a las
						finalidades secundarias en cualquier momento, como se indica arriba.
					</p>
				</section>

				<section className="mb-6">
					<H2>Cambios a este aviso</H2>
					<p>
						Cualquier cambio se publicará en{" "}
						<a
							href="https://www.lhopital-fr.mx/aviso-de-privacidad"
							className={link}
						>
							www.lhopital-fr.mx/aviso-de-privacidad
						</a>{" "}
						con su fecha de actualización.
					</p>
				</section>

				<section className="mb-6">
					<H2>Contacto</H2>
					<p>
						<Email /> ·{" "}
						<a href="tel:+525594621951" className={link}>
							+52 (55) 9462 1951
						</a>
					</p>
					<p className="mt-2">
						Lunes a viernes 11:00–14:00 y 16:00–19:00 · Sábado 11:00–14:00
					</p>
				</section>

				<p className="mt-8 text-xs italic text-neutral-500">
					Última actualización: 9 de noviembre de 2026
				</p>
			</section>
		</main>
	);
}
