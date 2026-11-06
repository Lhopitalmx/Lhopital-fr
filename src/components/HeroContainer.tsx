import Image from "next/image";
import { ReactNode } from "react";

type HeroContainerProps = {
	title: string;
	// Sin imagen queda el fondo oscuro liso.
	imageSrc?: string;
	// Qué parte de la foto se conserva al recortarla (clase de Tailwind, p. ej. "object-top").
	imagePosition?: string;
	children?: ReactNode;
};

export default function HeroContainer({
	title,
	imageSrc,
	imagePosition = "object-center",
	children,
}: HeroContainerProps) {
	return (
		<section className="relative w-full h-screen bg-[#272828] overflow-hidden flex items-center justify-center px-8 md:px-20">
			{/* Background image */}
			{imageSrc && (
				<div className="absolute inset-0 z-0">
					<Image
						src={imageSrc}
						alt={title}
						fill
						unoptimized
						className={`object-cover w-full h-full ${imagePosition}`}
					/>
				</div>
			)}

			{/* Sombra neutra para que el texto blanco se lea sobre la foto */}
			<div className="absolute inset-0 bg-black/40 z-0" />

			<div className="relative z-20 w-full flex flex-col md:flex-row items-center justify-between h-full">
				{/* Empty left spacer */}
				<div className="w-full md:w-1/2 h-full flex items-center justify-start" />

				{/* Right-side content */}
				<div className="w-full md:w-1/2 h-full flex flex-col justify-center text-left text-white">
					<h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
					<div className="text-lg md:text-2xl font-light max-w-xl">
						{children}
					</div>
				</div>
			</div>
		</section>
	);
}
