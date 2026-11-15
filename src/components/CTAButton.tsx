"use client";

import React from "react";

// Botón de la familia Lhopital: recto, sin degradado, mayúsculas espaciadas.
// El rojo FR solo aparece al pasar el cursor (Moto usa dorado en ese momento).
// - "solid": para fondos claros (negro con letras hueso).
// - "light": para fondos oscuros (hueso con letras negras).
// - "outline": contorno fino hueso, para el encabezado.
type Variant = "solid" | "light" | "outline";

interface CTAButtonProps {
	onClick?: () => void;
	children: React.ReactNode;
	variant?: Variant;
	className?: string;
}

const VARIANTS: Record<Variant, string> = {
	solid: "bg-ink text-bone border border-ink hover:bg-fr-red hover:border-fr-red",
	light: "bg-bone text-ink border border-bone hover:bg-fr-red hover:border-fr-red hover:text-bone",
	outline: "bg-transparent text-bone border border-bone/60 hover:bg-fr-red hover:border-fr-red",
};

export default function CTAButton({
	onClick,
	children,
	variant = "solid",
	className = "",
}: CTAButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`inline-flex items-center justify-center px-7 py-3 font-[almaq] text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${VARIANTS[variant]} ${className}`}
		>
			{children}
		</button>
	);
}
