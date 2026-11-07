import { Metadata } from 'next';
import { generateSEOMetadata } from '@/components/SEO';

export const metadata: Metadata = generateSEOMetadata({
	title: "Términos y Condiciones",
	description: "Términos y condiciones de uso del sitio de Lhopital FR, distribuidor de equipo para bomberos y rescate en México.",
	canonical: "/terminos-y-condiciones",
});
