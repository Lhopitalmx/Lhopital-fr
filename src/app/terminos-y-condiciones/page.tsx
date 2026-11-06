"use client";

export default function TerminosYCondiciones() {
	return (
		<main className="bg-white text-black font-light">
			<div className="md:h-24 h-32 bg-black w-full" />

			<section className="max-w-4xl mx-auto px-6 py-20 text-sm md:text-base leading-relaxed">
				<h1 className="text-3xl font-bold mb-8 text-[#111111]">
					Términos y Condiciones
				</h1>

				<p className="mb-4">
					El presente documento regula los términos y condiciones generales (en
					adelante &quot;TÉRMINOS Y CONDICIONES&quot;) aplicables al uso de los
					contenidos, productos y servicios ofrecidos a través del sitio web{" "}
					<a
						href="https://www.lhopital-fr.mx"
						className="underline text-[#b01f29]"
					>
						www.lhopital-fr.mx
					</a>{" "}
					cuyo titular es LHOPITAL S.A. DE C.V.
				</p>

				<p className="mb-6">
					Toda persona que pretenda acceder al sitio web y los servicios
					ofrecidos en él, lo hará sujeto a los presentes TÉRMINOS Y
					CONDICIONES. Si no los acepta, deberá abstenerse de utilizar el sitio.
				</p>

				{[
					{
						title: "Primera. Alcance y condiciones de acceso.",
						content: [
							"Este sitio está disponible sin necesidad de registro y puede ser accedido libremente, salvo el costo de conexión a Internet.",
							"El sitio fue diseñado para usuarios residentes en México. Si un usuario reside fuera de México, accede bajo su propio riesgo.",
							"LHOPITAL puede modificar el contenido, diseño, y acceso al sitio en cualquier momento sin previo aviso.",
						],
					},
					{
						title: "Segunda. Usuario y utilización del sitio web.",
						content: [
							"El uso del sitio confiere la condición de USUARIO, quedando sujeto a los presentes TÉRMINOS Y CONDICIONES y sus futuras modificaciones.",
							"Está prohibido el uso de software automatizado, así como realizar actos que afecten a terceros o el funcionamiento del sitio.",
						],
					},
					{
						title: "Tercera. Acceso y navegación en el sitio web.",
						content: [
							"LHOPITAL no garantiza la disponibilidad del sitio ni la ausencia de errores o virus.",
							"El uso inadecuado del sitio es responsabilidad exclusiva del USUARIO.",
						],
					},
					{
						title: "Cuarta. Política de privacidad y protección de datos.",
						content: [
							"Los datos personales serán tratados conforme a la Ley Federal de Protección de Datos Personales.",
							"Se requerirá consentimiento para el tratamiento de datos sensibles o financieros.",
							"El uso de cookies es necesario para mejorar la experiencia del usuario.",
							"El aviso de privacidad completo está disponible en: https://lhopital-fr.mx/aviso-de-privacidad",
						],
					},
					{
						title: "Quinta. Enlaces y contenidos externos del sitio web.",
						content: [
							"Los enlaces a sitios externos no implican recomendación o respaldo por parte de LHOPITAL.",
							"No se asume responsabilidad sobre los contenidos de sitios de terceros.",
						],
					},
					{
						title: "Sexta. Propiedad intelectual e industrial.",
						content: [
							"El contenido del sitio está protegido por derechos de autor.",
							"Está prohibida su reproducción sin autorización expresa.",
						],
					},
					{
						title: "Séptima. Exención de responsabilidad.",
						content: [
							"LHOPITAL no será responsable por pérdidas o daños derivados del uso del sitio.",
							"El USUARIO asume toda la responsabilidad legal por el uso del sitio.",
						],
					},
					{
						title: "Octava. Prohibiciones de uso del sitio web.",
						content: [
							"Está prohibido: infringir leyes, acosar, transmitir virus, recolectar datos sin permiso, enviar spam, entre otros.",
							"El incumplimiento podrá causar la cancelación del acceso al sitio.",
						],
					},
					{
						title: "Novena. Limitación de responsabilidad.",
						content: [
							"LHOPITAL no se hace responsable por pérdidas o daños, directos o indirectos, causados por el uso del sitio.",
							"Algunas jurisdicciones pueden tener limitaciones sobre esta cláusula.",
						],
					},
					{
						title: "Décima. Legislación y jurisdicción.",
						content: [
							"Cualquier controversia se resolverá bajo las leyes de México, específicamente en la Ciudad de México.",
						],
					},
					{
						title: "Décima Primera. Actualizaciones.",
						content: [
							"Estos términos están sujetos a cambios. Se recomienda revisarlos periódicamente en el sitio web.",
						],
					},
				].map((section, idx) => (
					<section key={idx} className="mb-6">
						<h2 className="text-xl font-semibold mb-2 text-[#111111]">
							{section.title}
						</h2>
						{section.content.map((paragraph, pIdx) => (
							<p className="mb-2" key={pIdx}>
								{paragraph}
							</p>
						))}
					</section>
				))}

				<p className="text-xs italic text-neutral-500 mt-8">
					Última actualización: 07 de febrero 2025
				</p>
			</section>
		</main>
	);
}
