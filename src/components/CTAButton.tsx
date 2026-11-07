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
	solid: "bg-[#111111] text-[#F4F1EC] border border-[#111111] hover:bg-[#B01F29] hover:border-[#B01F29]",
	light: "bg-[#F4F1EC] text-[#111111] border border-[#F4F1EC] hover:bg-[#B01F29] hover:border-[#B01F29] hover:text-[#F4F1EC]",
	outline: "bg-transparent text-[#F4F1EC] border border-[#F4F1EC]/60 hover:bg-[#B01F29] hover:border-[#B01F29]",
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
