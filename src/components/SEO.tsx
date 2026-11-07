import { Metadata } from 'next';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function generateSEOMetadata({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  noindex = false,
}: SEOProps): Metadata {
  const baseUrl = 'https://www.lhopital-fr.mx';
  const fullTitle = `${title} | Lhopital FR`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords:
      keywords ||
      'equipo de rescate, HAZMAT, ventilación, protección personal bomberos, Trelleborg México, Res-Q-Jack México, HexArmor, LION, SUPERVAC, distribuidor equipo bomberos México',
    robots: noindex ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      title: fullTitle,
      description,
      url: canonical ? `${baseUrl}${canonical}` : baseUrl,
      siteName: 'Lhopital FR',
      locale: 'es_MX',
      type: 'website',
      // Sin "images": Next.js usa automáticamente opengraph-image.tsx.
      // Solo se agrega si la página pasa una imagen propia (ogImage).
      ...(ogImage && {
        images: [
          {
            url: ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      ...(ogImage && {
        images: [ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`],
      }),
    },
    alternates: {
      canonical: canonical ? `${baseUrl}${canonical}` : baseUrl,
    },
  };

  return metadata;
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Lhopital FR',
    description:
      'Distribuidor de equipo especializado para rescate técnico, materiales peligrosos (HAZMAT), ventilación y protección personal en México. Distribuidores exclusivos de Trelleborg, Res-Q-Jack y HexArmor, y distribuidores de LION y SUPERVAC.',
    url: 'https://www.lhopital-fr.mx/',
    telephone: '+52-55-9470-5028',
    email: 'contacto@lhopital-fr.mx',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ciudad de México',
      addressRegion: 'CDMX',
      addressCountry: 'MX',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.320772,
      longitude: -99.180272,
    },
    openingHours: 'Mo-Fr 08:00-18:00',
    sameAs: [
      'https://www.instagram.com/lhopitalfr/',
      'https://www.facebook.com/lhopitalfr',
      'https://www.youtube.com/@LhopitalFR',
      // Verifica que esta página de LinkedIn exista; si no, elimina la línea:
      'https://www.linkedin.com/company/lhopital-fr',
    ],
    brand: [
      { '@type': 'Brand', name: 'Trelleborg' },
      { '@type': 'Brand', name: 'Res-Q-Jack' },
      { '@type': 'Brand', name: 'HexArmor' },
      { '@type': 'Brand', name: 'LION' },
      { '@type': 'Brand', name: 'SAVA' },
      { '@type': 'Brand', name: 'SUPERVAC' },
      { '@type': 'Brand', name: 'Turtle Plastics' },
    ],
    serviceArea: {
      '@type': 'Country',
      name: 'México',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Equipo de Rescate y Emergencias',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'ProductGroup',
            name: 'Equipos de Rescate Técnico',
            description:
              'Sistemas de estabilización Res-Q-Jack y colchones neumáticos Trelleborg - SAVA para rescate vehicular, estructuras colapsadas y espacios confinados',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'ProductGroup',
            name: 'Protección Personal',
            description:
              'Equipo LION y guantes HexArmor para bomberos y personal de emergencias, con certificaciones NFPA y EN',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'ProductGroup',
            name: 'Materiales Peligrosos (HAZMAT)',
            description:
              'Equipos Trelleborg para sellado, contención y manejo de materiales peligrosos',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'ProductGroup',
            name: 'Ventilación',
            description:
              'Ventiladores SUPERVAC de presión positiva y negativa, para espacios confinados, uso industrial y gran escala',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
