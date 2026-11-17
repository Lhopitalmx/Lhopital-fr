import { Metadata } from 'next';
import { generateSEOMetadata } from '@/components/SEO';

export const metadata: Metadata = generateSEOMetadata({
	title: "¿Qué ventilador necesito? — Calculadora de ventilación SUPERVAC V-MAX",
	description: "Captura las medidas de tu espacio y calcula en cuánto tiempo cada ventilador SUPERVAC V-MAX de presión positiva renueva su atmósfera.",
	keywords: "calculadora de ventilación, ventilador presión positiva, SUPERVAC V-MAX, renovaciones de aire por hora, ventiladores bomberos México, AMCA 240",
	canonical: "/ventilacion/calculadora",
});
