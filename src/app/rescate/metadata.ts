import { Metadata } from 'next';
import { generateSEOMetadata } from '@/components/SEO';

export const metadata: Metadata = generateSEOMetadata({
    title: "Equipo de Rescate Técnico — Res-Q-Jack, Trelleborg y SAVA en México",
    description: "Sistemas de estabilización Res-Q-Jack (distribuidor exclusivo) para rescate vehicular y en zanjas; colchones neumáticos Trelleborg - SAVA para estructuras colapsadas, espacios confinados y levantamiento de vehículos pesados en México.",
    keywords: "rescate vehicular México, Res-Q-Jack México, estabilización de vehículos, rescate técnico, Trelleborg México, SAVA México, extracción vehicular, rescate pesado, espacios confinados, levantamiento de vehículos pesados, colchones neumáticos",
    canonical: "/rescate",
});

