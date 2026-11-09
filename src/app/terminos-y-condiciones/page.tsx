"use client";

type Section = {
	title: string;
	content: string[];
	list?: string[];
	after?: string[];
};

const sections: Section[] = [
	{
		title: "Primera. Naturaleza del sitio web y condiciones de acceso.",
		content: [
			"El SITIO WEB es un sitio informativo sobre los productos y servicios que el TITULAR comercializa en materia de rescate, emergencia, protección personal y combate de incendios. A través del SITIO WEB no se realizan ventas, cobros ni contrataciones en línea.",
			"El TITULAR podrá modificar en cualquier momento y sin previo aviso la presentación, los contenidos, la funcionalidad y la configuración del SITIO WEB, así como interrumpir, desactivar o cancelar cualquiera de sus elementos o el acceso a ellos.",
			"El acceso al SITIO WEB es libre y gratuito, y no requiere suscripción ni registro. El único costo para el USUARIO es el de la conexión a internet que tenga contratada.",
			"El SITIO WEB está dirigido principalmente a instituciones, dependencias, empresas y profesionales de los sectores de bomberos, rescate, protección civil y seguridad industrial. Su consulta es libre; sin embargo, el formulario de contacto y las solicitudes de cotización deberán ser realizados por personas mayores de edad.",
			"El SITIO WEB está diseñado para USUARIOS en territorio mexicano. El TITULAR no garantiza que cumpla con la legislación de otros países; quien acceda desde el extranjero lo hace bajo su propia responsabilidad y deberá asegurarse de cumplir con las leyes que le sean aplicables.",
			"El TITULAR podrá administrar el SITIO WEB directamente o a través de terceros autorizados, sin que ello modifique los presentes TÉRMINOS Y CONDICIONES.",
		],
	},
	{
		title: "Segunda. Uso del sitio web.",
		content: [
			"El USUARIO se compromete a utilizar el SITIO WEB y sus contenidos de manera lícita, conforme a su finalidad, a los presentes TÉRMINOS Y CONDICIONES, a la moral y al orden público, y a abstenerse de cualquier acto que afecte los derechos de terceros o el correcto funcionamiento del SITIO WEB.",
			"Queda prohibido utilizar software o mecanismos automatizados para extraer o descargar de forma masiva los contenidos del SITIO WEB, salvo los rastreadores de motores de búsqueda que indexan el sitio públicamente.",
			"El acceso al SITIO WEB no crea por sí mismo ninguna relación comercial, laboral ni de otro tipo entre el TITULAR y el USUARIO.",
		],
	},
	{
		title: "Tercera. Cotizaciones y ventas.",
		content: [
			"La información publicada en el SITIO WEB no constituye una oferta de venta. Los precios, la disponibilidad, los tiempos y condiciones de entrega, las garantías y las demás condiciones comerciales se establecen únicamente en la cotización formal que emita el TITULAR y, en su caso, en el pedido, orden de compra o contrato correspondiente, los cuales prevalecerán sobre cualquier información del SITIO WEB.",
			"El envío de una solicitud a través del formulario de contacto no genera obligación de compra para el USUARIO ni obligación de venta para el TITULAR.",
		],
	},
	{
		title: "Cuarta. Información técnica y uso de los equipos.",
		content: [
			"Las descripciones, fichas técnicas, imágenes y especificaciones publicadas en el SITIO WEB tienen carácter informativo y pueden cambiar por decisión de los fabricantes sin previo aviso. Antes de adquirir un equipo, el USUARIO deberá confirmar con el TITULAR las especificaciones vigentes.",
			"El SITIO WEB puede contener ocasionalmente errores tipográficos, inexactitudes u omisiones. El TITULAR se reserva el derecho de corregirlos y de actualizar la información en cualquier momento y sin previo aviso, sin estar obligado a hacerlo salvo cuando lo exija la ley.",
			"Los equipos de rescate, emergencia, protección personal y combate de incendios deben ser utilizados únicamente por personal capacitado, conforme a las instrucciones del fabricante y a la normatividad aplicable. La información del SITIO WEB no sustituye la capacitación, los manuales del fabricante ni los procedimientos operativos de cada institución.",
		],
	},
	{
		title: "Quinta. Disponibilidad y seguridad del sitio web.",
		content: [
			"El TITULAR procurará mantener el SITIO WEB en funcionamiento adecuado, pero no garantiza su continuidad o disponibilidad permanente, ni que esté libre de errores o de software malicioso que pueda afectar el equipo del USUARIO.",
			"Cualquier uso indebido del SITIO WEB, o contrario a los presentes TÉRMINOS Y CONDICIONES o a la normatividad vigente, será responsabilidad exclusiva del USUARIO.",
		],
	},
	{
		title: "Sexta. Privacidad y protección de datos personales.",
		content: [
			"El tratamiento de los datos personales que el USUARIO proporcione a través del SITIO WEB, incluido el formulario de contacto, se rige por el Aviso de Privacidad disponible en www.lhopital-fr.mx/aviso-de-privacidad, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.",
			"El SITIO WEB no utiliza cookies de analítica, publicidad ni seguimiento. Cualquier cambio en el uso de cookies o de herramientas de medición se informará en el Aviso de Privacidad.",
		],
	},
	{
		title: "Séptima. Enlaces y contenidos de terceros.",
		content: [
			"El SITIO WEB puede incluir enlaces, contenidos o funciones de sitios propiedad de terceros, como fabricantes, redes sociales o servicios de mapas. Su inclusión busca mejorar la experiencia del USUARIO y no constituye una recomendación de dichos sitios.",
			"El TITULAR no revisa ni controla esos sitios, por lo que no garantiza su disponibilidad, exactitud o legalidad, ni es responsable de los daños derivados de su uso ni de la información que el USUARIO les proporcione, la cual se rige por sus propias políticas de privacidad.",
			"Cualquier persona puede enlazar al SITIO WEB siempre que no reproduzca sus contenidos sin autorización expresa del TITULAR ni haga manifestaciones falsas, inexactas o incorrectas sobre el SITIO WEB o sus contenidos. Un enlace hacia el SITIO WEB no implica relación alguna entre el TITULAR y el titular del sitio que enlaza.",
		],
	},
	{
		title: "Octava. Propiedad intelectual e industrial.",
		content: [
			"El SITIO WEB, incluyendo su código fuente, textos, imágenes, videos, logotipos, combinaciones de colores, estructura, diseño y demás elementos distintivos, es propiedad del TITULAR o le ha sido debidamente licenciado, y está protegido por la legislación mexicana e internacional en materia de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución o difusión con fines comerciales, por cualquier medio, sin autorización expresa del TITULAR.",
			"Las marcas y logotipos de los fabricantes que aparecen en el SITIO WEB pertenecen a sus respectivos titulares y se utilizan únicamente para identificar los productos que el TITULAR distribuye.",
			"El USUARIO se obliga a no suprimir, alterar o manipular ningún elemento del SITIO WEB, ni a realizar acciones que pongan en riesgo la seguridad de sus archivos o bases de datos.",
			"Si el USUARIO o un tercero considera que algún contenido del SITIO WEB vulnera sus derechos de propiedad intelectual o industrial, deberá comunicarlo de inmediato al TITULAR a través de contacto@lhopital-fr.mx.",
		],
	},
	{
		title: "Novena. Prohibiciones de uso.",
		content: [
			"Además de las restricciones previstas en los presentes TÉRMINOS Y CONDICIONES, queda prohibido utilizar el SITIO WEB o sus contenidos para:",
		],
		list: [
			"a) Infringir cualquier ley, reglamento o norma local, estatal, federal o internacional, o solicitar a otros que participen en actos ilícitos.",
			"b) Vulnerar los derechos de propiedad intelectual o industrial del TITULAR o de terceros.",
			"c) Acosar, insultar, difamar, intimidar o discriminar a cualquier persona por motivos de género, orientación sexual, religión, origen étnico, edad, nacionalidad, discapacidad o cualquier otro.",
			"d) Enviar información falsa o engañosa, o presentar solicitudes a nombre de una institución, dependencia o empresa sin estar autorizado para ello.",
			"e) Cargar o transmitir virus o cualquier código dañino que afecte el funcionamiento del SITIO WEB o de otros sitios.",
			"f) Recopilar o rastrear información personal de terceros sin su consentimiento.",
			"g) Interferir con las medidas de seguridad del SITIO WEB o eludirlas.",
			"h) Enviar correos no deseados o realizar prácticas como phishing, pharming, pretexting o extracción no autorizada de información.",
		],
		after: [
			"En caso de incumplimiento, el TITULAR podrá restringir el acceso del USUARIO al SITIO WEB sin previo aviso, sin perjuicio de las acciones legales que procedan.",
		],
	},
	{
		title: "Décima. Limitación de responsabilidad.",
		content: [
			"En la medida máxima permitida por la legislación aplicable, el TITULAR, sus directivos, empleados, proveedores y licenciantes no serán responsables por daños directos o indirectos, pérdida de ingresos, de datos u otros perjuicios derivados del acceso o uso del SITIO WEB o de sus contenidos, o de la imposibilidad de utilizarlos.",
			"Nada en los presentes TÉRMINOS Y CONDICIONES limita los derechos que la legislación aplicable otorgue al USUARIO y que no puedan ser objeto de renuncia.",
			"El USUARIO se compromete a sacar en paz y a salvo al TITULAR frente a cualquier reclamación de terceros derivada del incumplimiento de los presentes TÉRMINOS Y CONDICIONES por parte del USUARIO.",
		],
	},
	{
		title: "Décima Primera. Legislación y jurisdicción.",
		content: [
			"Los presentes TÉRMINOS Y CONDICIONES se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia sobre su interpretación o cumplimiento, las partes se someten a la jurisdicción de los tribunales competentes de la Ciudad de México, renunciando a cualquier otro fuero que pudiera corresponderles.",
		],
	},
	{
		title: "Décima Segunda. Modificaciones y contacto.",
		content: [
			"El TITULAR podrá modificar los presentes TÉRMINOS Y CONDICIONES en cualquier momento. Las modificaciones entrarán en vigor a partir de su publicación en el SITIO WEB con su fecha de actualización, por lo que se recomienda revisarlos periódicamente.",
			"Para cualquier duda sobre los presentes TÉRMINOS Y CONDICIONES: contacto@lhopital-fr.mx · +52 (55) 9462 1951 · Lunes a viernes 11:00–14:00 y 16:00–19:00 · Sábado 11:00–14:00.",
		],
	},
];

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
					adelante, los &quot;TÉRMINOS Y CONDICIONES&quot;) aplicables al uso
					del sitio web{" "}
					<a
						href="https://www.lhopital-fr.mx"
						className="underline text-[#b01f29]"
					>
						www.lhopital-fr.mx
					</a>{" "}
					y de sus contenidos (en adelante, el &quot;SITIO WEB&quot;), cuyo
					titular es LHOPITAL, S.A. de C.V. (en adelante, el
					&quot;TITULAR&quot;), que lo opera a través de su división Lhopital
					FR, con domicilio en Andador 5, 5C-31, Col. Alianza Popular
					Revolucionaria, Alcaldía Coyoacán, C.P. 04800, Ciudad de México.
				</p>

				<p className="mb-6">
					Toda persona que acceda al SITIO WEB o lo utilice (en adelante, el
					&quot;USUARIO&quot;) queda sujeta a los presentes TÉRMINOS Y
					CONDICIONES desde el momento de su acceso. Quien no los acepte deberá
					abstenerse de utilizar el SITIO WEB.
				</p>

				{sections.map((section, idx) => (
					<section key={idx} className="mb-6">
						<h2 className="text-xl font-semibold mb-2 text-[#111111]">
							{section.title}
						</h2>
						{section.content.map((paragraph, pIdx) => (
							<p className="mb-2" key={pIdx}>
								{paragraph}
							</p>
						))}
						{section.list && (
							<ul className="mb-2 pl-6 space-y-1">
								{section.list.map((item, lIdx) => (
									<li key={lIdx}>{item}</li>
								))}
							</ul>
						)}
						{section.after?.map((paragraph, aIdx) => (
							<p className="mb-2" key={aIdx}>
								{paragraph}
							</p>
						))}
					</section>
				))}

				<p className="text-xs italic text-neutral-500 mt-8">
					Última actualización: 7 de noviembre de 2026
				</p>
			</section>
		</main>
	);
}
