"use client";

import Image from "next/image";
import Link from "next/link";
import CTAButton from "./CTAButton";
import Modal from "./Modal";
import ContactForm from "./ContactForm";
import { useState } from "react";

interface FeatureIntroProps {
	title: string;
	subtitle: string;
	imageSrc: string;
	alt?: string;
	// Optional second action shown under SOLICITAR INFORMACIÓN (e.g. the V-MAX calculator).
	secondary?: { href: string; label: string };
}

export default function FeatureIntro({
	title,
	subtitle,
	imageSrc,
	alt = "",
	secondary,
}: FeatureIntroProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleClick = () => {
		setIsModalOpen(true);
	};

	const secondaryLink = secondary && (
		<Link
			href={secondary.href}
			className="inline-flex items-center justify-center px-7 py-3 font-[almaq] text-xs font-bold tracking-[0.2em] uppercase border border-ink text-ink hover:bg-fr-red hover:border-fr-red hover:text-bone transition-colors duration-300"
		>
			{secondary.label}
		</Link>
	);

	return (
		<section className="w-full bg-ivory py-16 px-6 md:px-20">
			<div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 items-center">
				{/* Left: Text + Desktop Buttons */}
				<div className="flex flex-col items-start text-left max-w-xl w-full">
					<h2 className="text-3xl md:text-5xl font-bold text-ink mb-4">
						{title}
					</h2>
					<p className="text-lg md:text-xl text-[#333] font-light leading-relaxed mb-6">
						{subtitle}
					</p>

					{/* Desktop Button */}
					<div className="hidden md:flex flex-col items-start gap-3">
						<CTAButton onClick={handleClick}>
							SOLICITAR INFORMACIÓN
						</CTAButton>
						{secondaryLink}
					</div>
				</div>

			{/* Right: Image */}
			<div className="w-full">
				<Image
					src={imageSrc}
					alt={alt}
					width={600}
					height={400}
					unoptimized
					className="w-full h-auto object-cover"
				/>
			</div>				{/* Mobile Button */}
				<div className="flex md:hidden flex-col items-center w-full mt-4 gap-3">
					<CTAButton onClick={handleClick}>
						SOLICITAR INFORMACIÓN
					</CTAButton>
					{secondaryLink}
				</div>
			</div>

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<ContactForm />
			</Modal>
		</section>
	);
}
