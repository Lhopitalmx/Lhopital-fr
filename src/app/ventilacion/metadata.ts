import { Metadata } from 'next';
import { generateSEOMetadata } from '@/components/SEO';

export const metadata: Metadata = generateSEOMetadata({
	title: "Equipos de Ventilación — Distribuidor SUPERVAC en México",
	description: "Ventiladores SUPERVAC de presión positiva y negativa, para espacios confinados, uso industrial y gran escala. Equipos para bomberos, industria y aeropuertos en México.",
	keywords: "ventiladores bomberos México, SUPERVAC México, ventilación presión positiva, ventilación espacios confinados, ventilación industrial, ventiladores AMCA 240",
	canonical: "/ventilacion",
});
