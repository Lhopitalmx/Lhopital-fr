import { Metadata } from 'next';
import { generateSEOMetadata } from '@/components/SEO';

export const metadata: Metadata = generateSEOMetadata({
	title: "Aviso de Privacidad",
	description: "Aviso de privacidad de Lhopital FR: cómo recabamos, usamos y protegemos tus datos personales.",
	canonical: "/aviso-de-privacidad",
});
