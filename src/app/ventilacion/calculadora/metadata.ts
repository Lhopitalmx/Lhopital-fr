import { Metadata } from 'next';
import { generateSEOMetadata } from '@/components/SEO';

export const metadata: Metadata = generateSEOMetadata({
	title: "¿Qué ventilador necesito? — Calculadora de ventilación SUPERVAC V-MAX",
	description: "Captura las medidas de tu espacio y calcula en cuánto tiempo un ventilador SUPERVAC V-MAX de presión positiva renueva todo su aire, o qué modelo necesitas para lograrlo en el tiempo que buscas.",
	keywords: "calculadora de ventilación, ventilador presión positiva, SUPERVAC V-MAX, renovaciones de aire por hora, ventiladores bomberos México, AMCA 240",
	canonical: "/ventilacion/calculadora",
});
