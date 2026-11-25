import "../styles/globals.css";
import { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Medicion from "@/components/Medicion";
import CookieBanner from "@/components/CookieBanner";
import { LocalBusinessSchema } from "@/components/SEO";
import { Metadata } from "next";

export const metadata: Metadata = {
	metadataBase: new URL("https://www.lhopital-fr.mx"),
	title: "Lhopital FR | Equipo de bomberos, rescate, HAZMAT, Ventilación y Protección Personal en México",
	description:
		"Distribuidores exclusivos de Trelleborg, Res-Q-Jack y SUPERVAC en México, y distribuidores autorizados de LION y HexArmor. Equipo especializado para rescate técnico, materiales peligrosos, ventilación y protección personal de bomberos, con certificaciones NFPA y EN.",
	keywords:
		"equipo de rescate México, HAZMAT, protección personal bomberos, ventiladores bomberos, Trelleborg México, Res-Q-Jack México, HexArmor, LION, SUPERVAC, distribuidor equipo bomberos, protección civil",
	authors: [{ name: "Lhopital FR" }],
	creator: "Lhopital FR",
	publisher: "Lhopital FR",
	robots: "index,follow",
	openGraph: {
		title: "Lhopital FR | Equipo de bomberos, rescate, HAZMAT, Ventilación y Protección Personal en México",
		description:
			"Distribuidores exclusivos de Trelleborg, Res-Q-Jack y SUPERVAC en México, y distribuidores autorizados de LION y HexArmor. Equipo especializado para rescate técnico, HAZMAT, ventilación y protección personal de bomberos.",
		url: "https://www.lhopital-fr.mx",
		siteName: "Lhopital FR",
		locale: "es_MX",
		type: "website",
		// Sin "images": Next.js usa automáticamente src/app/opengraph-image.tsx
	},
	twitter: {
		card: "summary_large_image",
		title: "Lhopital FR | Equipo de bomberos, rescate, HAZMAT, Ventilación y Protección Personal en México",
		description:
			"Distribuidores exclusivos de Trelleborg, Res-Q-Jack y SUPERVAC en México, y distribuidores autorizados de LION y HexArmor.",
	},
	
	verification: {
	google: "TdzOZS0XJr1024DvLzy9wwsYMCjnMxmIkw0yEeKoghg",
	},
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="es" suppressHydrationWarning>
			<body className="flex flex-col bg-white font-[almaq] text-white">
				<LocalBusinessSchema />
				<Header />
				<main className="min-h-screen flex-1">{children}</main>
				<Footer />
				{/* Google Analytics, Microsoft Clarity y Meta Pixel: solo con consentimiento */}
				<Medicion />
				<CookieBanner />
			</body>
		</html>
	);
}
