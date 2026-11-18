"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import Modal from "@/components/Modal";
import ContactoForm from "@/components/ContactForm";
import { cld } from "@/lib/cloudinary";
import {
	FANS,
	SIZES,
	MODE_LABEL,
	TARGET_CHANGES,
	type Dims,
	type FanMode,
	type FanSize,
	volume,
	ventilate,
	compareAll,
	fmtNum,
	fmtTime,
	splitTime,
} from "@/lib/ventilacion";

const PRESETS: { label: string; d: Dims }[] = [
	{ label: "Habitación", d: { L: 4, W: 4, H: 2.5 } },
	{ label: "Casa", d: { L: 10, W: 8, H: 2.6 } },
	{ label: "Bodega", d: { L: 30, W: 20, H: 6 } },
	{ label: "Estacionamiento", d: { L: 50, W: 30, H: 3 } },
];

// Number ≥ 0 in a sensible range, or null while the user is still typing.
const parse = (v: string, max = 500) => {
	const n = parseFloat(v.replace(",", "."));
	return Number.isFinite(n) && n >= 0 ? Math.min(n, max) : null;
};

const segBtn = (on: boolean) =>
	`flex-1 min-h-[48px] px-3 font-[almaq] text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
		on ? "bg-bone text-ink" : "bg-transparent text-bone hover:bg-fr-red"
	}`;

/* ---------- Picture: the space drawn to scale in isometric ---------- */
function Room({ d }: { d: Dims }) {
	const ref = useRef<HTMLDivElement>(null);
	const [box, setBox] = useState({ w: 0, h: 0 });
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const ro = new ResizeObserver(() => setBox({ w: el.clientWidth, h: el.clientHeight }));
		ro.observe(el);
		return () => ro.disconnect();
	}, []);

	const svg = useMemo(() => {
		const { w, h } = box;
		if (!w) return null;
		const mx = Math.max(d.L, d.W, d.H * 2.2);
		const k = (Math.min(w, h * 1.35) * 0.5) / mx;
		const c = Math.cos(Math.PI / 6);
		const P = (x: number, y: number, z: number) => [(x - y) * c * k, (x + y) * 0.5 * k - z * k];
		const pts = [
			[0, 0, 0], [d.L, 0, 0], [d.L, d.W, 0], [0, d.W, 0],
			[0, 0, d.H], [d.L, 0, d.H], [d.L, d.W, d.H], [0, d.W, d.H],
		].map(([x, y, z]) => P(x, y, z));
		const xs = pts.map((p) => p[0]);
		const ys = pts.map((p) => p[1]);
		const ox = w / 2 - (Math.min(...xs) + Math.max(...xs)) / 2;
		const oy = (h - 24) / 2 - (Math.min(...ys) + Math.max(...ys)) / 2;
		const q = (i: number) => `${(pts[i][0] + ox).toFixed(1)},${(pts[i][1] + oy).toFixed(1)}`;
		const face = (ids: number[], fill: string, o: number) => (
			<polygon points={ids.map(q).join(" ")} fill={fill} stroke="#F4F1EC" strokeOpacity={o} strokeWidth={1} />
		);
		const e = P(d.L * 0.5, 0, d.H * 0.35);
		const ex = e[0] + ox, ey = e[1] + oy;
		const ax = ex - 46 * c, ay = ey - 46 * 0.5;
		const label = (i: number, j: number, t: string, dx: number, dy: number, anchor: "start" | "end" | "middle") => (
			<text
				x={(pts[i][0] + pts[j][0]) / 2 + ox + dx}
				y={(pts[i][1] + pts[j][1]) / 2 + oy + dy}
				fill="#F4F1EC" fillOpacity={0.8} fontSize={13} textAnchor={anchor}
			>
				{t}
			</text>
		);
		return (
			<svg width={w} height={h} className="absolute inset-0">
				{face([0, 1, 2, 3], "rgba(244,241,236,.04)", 0.25)}
				{face([1, 2, 6, 5], "rgba(244,241,236,.10)", 0.6)}
				{face([0, 1, 5, 4], "rgba(244,241,236,.16)", 0.6)}
				{face([4, 5, 6, 7], "rgba(244,241,236,.06)", 0.9)}
				{[0, 1, 2].map((i) => (
					<line
						key={i}
						x1={ax - 18 * c} y1={ay - 9 + i * 9 - 9}
						x2={ex - 6 * c} y2={ey - 3 + i * 9 - 9}
						stroke="#B01F29" strokeWidth={2} className="vent-flow"
						style={{ animationDelay: `${i * 0.25}s` }}
					/>
				))}
				{w > 300 && (
					<>
						{label(0, 1, `${fmtNum(d.L, 1)} m`, -14, 22, "end")}
						{label(1, 2, `${fmtNum(d.W, 1)} m`, 14, 22, "start")}
						{label(1, 5, `${fmtNum(d.H, 1)} m`, 10, 0, "start")}
					</>
				)}
				<text x={w / 2} y={h - 6} fill="#F4F1EC" fillOpacity={0.55} fontSize={13} textAnchor="middle">
					Largo × ancho × alto · la flecha roja es la entrada de aire
				</text>
			</svg>
		);
	}, [box, d]);

	return (
		<div ref={ref} className="relative w-full min-h-[260px] md:min-h-[340px]" role="img" aria-label="Dibujo del espacio a escala">
			{svg}
		</div>
	);
}

/* ---------- Air-change timeline ---------- */
function Timeline({ minutes }: { minutes: number }) {
	return (
		<div className="mt-8">
			<div className="flex justify-between text-xs text-gray-600 mb-2">
				<span>Renovación</span>
				<span>Tiempo acumulado</span>
			</div>
			<ol className="grid grid-cols-5 md:grid-cols-10 gap-px bg-gray-300 border border-gray-300">
				{Array.from({ length: TARGET_CHANGES }, (_, i) => i + 1).map((n) => (
					<li key={n} className={`px-2 py-3 ${n === TARGET_CHANGES ? "bg-fr-red text-bone" : "bg-white text-ink"}`}>
						<span className="block text-lg font-bold">{n}</span>
						<span className="block text-xs whitespace-nowrap tabular-nums">{fmtTime((minutes * n) / TARGET_CHANGES)}</span>
					</li>
				))}
			</ol>
		</div>
	);
}

export default function CalculadoraVentilacion() {
	// The space starts empty (0 × 0 × 0) so nobody reads a result for measurements they didn't enter.
	const [raw, setRaw] = useState({ L: "0", W: "0", H: "0" });
	const [d, setD] = useState<Dims>({ L: 0, W: 0, H: 0 });
	const [size, setSize] = useState<FanSize>(16);
	const [mode, setMode] = useState<FanMode>("hi");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [dock, setDock] = useState(false);
	const resultRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = resultRef.current;
		if (!el) return;
		const io = new IntersectionObserver(([e]) => setDock(!e.isIntersecting));
		io.observe(el);
		return () => io.disconnect();
	}, []);

	const setDim = (k: keyof Dims, v: string) => {
		setRaw((r) => ({ ...r, [k]: v }));
		const n = parse(v);
		if (n !== null) setD((p) => ({ ...p, [k]: n }));
	};
	const stepDim = (k: keyof Dims, delta: number) => {
		const n = Math.max(0, Math.round((d[k] + delta) * 10) / 10);
		setD((p) => ({ ...p, [k]: n }));
		setRaw((r) => ({ ...r, [k]: String(n) }));
	};
	const applyPreset = (p: Dims) => {
		setD(p);
		setRaw((r) => ({ ...r, L: String(p.L), W: String(p.W), H: String(p.H) }));
	};

	// Results only once largo, ancho and alto are all filled in.
	const valid = d.L > 0 && d.W > 0 && d.H > 0;
	const V = volume(d);
	const r = valid ? ventilate(d, size, mode) : null;
	const options = compareAll(d);
	const fanLabel = (s: FanSize, m: FanMode) => `V-MAX ${s}" · ${MODE_LABEL[m]}`;
	const maxQ = Math.max(...SIZES.map((s) => FANS[s].max.cmh));

	// The important number: time to renew the atmosphere, shown large.
	const BigTime = ({ min }: { min: number }) => {
		const { h, m, s } = splitTime(min);
		const u = (t: string) => <span className="text-[0.42em] font-light ml-1 text-bone/80">{t}</span>;
		return (
			<span className="whitespace-nowrap tabular-nums">
				{h ? (<>{h}{u("h")} {m}{u("min")}</>) : m ? (<>{m}{u("min")} {s}{u("s")}</>) : (<>{s}{u("s")}</>)}
			</span>
		);
	};

	const dimField = (k: keyof Dims, label: string) => (
		<label className="grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-3 font-bold">
			{label}
			<span className="flex border border-bone/40 bg-bone">
				<button type="button" aria-label={`Menos ${label.toLowerCase()}`} onClick={() => stepDim(k, k === "H" ? -0.1 : -1)}
					className="w-12 min-h-[48px] text-ink text-xl hover:bg-fr-red hover:text-bone transition-colors duration-300">−</button>
				<input
					inputMode="decimal" value={raw[k]} onChange={(e) => setDim(k, e.target.value)}
					className="flex-1 w-full text-center text-lg font-bold text-ink bg-white border-x border-gray-300 tabular-nums focus:outline-none focus:ring-2 focus:ring-fr-red"
				/>
				<span className="self-center px-2 text-sm text-gray-600 bg-white">m</span>
				<button type="button" aria-label={`Más ${label.toLowerCase()}`} onClick={() => stepDim(k, k === "H" ? 0.1 : 1)}
					className="w-12 min-h-[48px] text-ink text-xl hover:bg-fr-red hover:text-bone transition-colors duration-300">+</button>
			</span>
		</label>
	);

	return (
		<>
			<style>{`.vent-flow{stroke-dasharray:6 6;animation:ventflow 1.2s linear infinite}@keyframes ventflow{to{stroke-dashoffset:-24}}@media(prefers-reduced-motion:reduce){.vent-flow{animation:none}}`}</style>

			{/* Calculator */}
			<section className="bg-ink text-bone pt-36 md:pt-40 pb-16 md:pb-20">
				<div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
					<div className="w-10 h-[2px] bg-fr-red mb-5" />
					<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
						<div>
							<h1 className="text-4xl md:text-6xl font-bold">¿Qué ventilador necesito?</h1>
							<p className="text-lg md:text-xl font-light text-bone/70 mt-4 xl:whitespace-nowrap">
								Captura las medidas del espacio y descubre qué ventilador{" "}
								<span className="whitespace-nowrap">SUPERVAC® V-MAX</span> necesitas.
							</p>
						</div>
						<div className="flex items-center gap-4 shrink-0">
							<span className="text-[11px] tracking-[0.15em] uppercase text-bone/60 text-right leading-tight">
								Distribuidor<br />exclusivo
							</span>
							<div className="relative h-12 w-48">
								<Image src={cld("supervac", "e_trim/w_600")} alt="SUPERVAC" fill unoptimized
									className="object-contain object-right brightness-0 invert opacity-90" />
							</div>
						</div>
					</div>

					{/* Mobile: result headline → inputs → stats. Desktop: inputs left, headline + stats right. */}
					<div className="grid lg:grid-cols-2 lg:grid-rows-[auto_1fr] gap-10 lg:gap-x-16 lg:gap-y-8 mt-10 items-start">
						{/* Controls */}
						<div className="lg:col-start-1 lg:row-start-1 lg:row-span-2 space-y-8">
							<div>
								<h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-4">Medidas del espacio</h2>
								<div className="space-y-3">
									{dimField("L", "Largo")}
									{dimField("W", "Ancho")}
									{dimField("H", "Alto")}
								</div>
								<div className="flex flex-wrap gap-2 mt-4">
									{PRESETS.map((p) => (
										<button key={p.label} type="button" onClick={() => applyPreset(p.d)}
											className="min-h-[44px] px-4 border border-bone/40 text-sm hover:bg-fr-red hover:border-fr-red transition-colors duration-300">
											{p.label}
										</button>
									))}
								</div>
							</div>

							<div className="grid sm:grid-cols-2 gap-6">
									<div>
										<h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-4">Modelo</h2>
										<div className="flex border border-bone/60">
											{SIZES.map((s, i) => (
												<button key={s} type="button" aria-pressed={size === s} onClick={() => setSize(s)}
													className={`${segBtn(size === s)} ${i ? "border-l border-bone/60" : ""}`}>{s}&quot;</button>
											))}
										</div>
									</div>
									<div>
										<h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-4">Modo</h2>
										<div className="flex border border-bone/60">
											{(["hi", "max"] as FanMode[]).map((m, i) => (
												<button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)}
													className={`${segBtn(mode === m)} ${i ? "border-l border-bone/60" : ""}`}>{MODE_LABEL[m]}</button>
											))}
										</div>
									</div>
								</div>
						</div>

						{/* Result headline */}
						<div className="order-first lg:col-start-2 lg:row-start-1" ref={resultRef} aria-live="polite">
							{r ? (
								<>
									<p className="text-sm tracking-[0.2em] uppercase text-bone/60 font-bold">V-MAX {size}&quot;</p>
									<p className="text-6xl md:text-8xl font-bold leading-none mt-2"><BigTime min={r.minutes} /></p>
									<p className="text-lg text-bone/80 mt-3">
										En modo {mode === "max" ? MODE_LABEL.max : MODE_LABEL.hi.toLowerCase()}: se renueva la atmósfera en{" "}
										<strong className="text-bone">{fmtTime(r.minutes)}</strong>.
									</p>
								</>
							) : (
								<>
									<p className="text-4xl md:text-5xl font-bold leading-tight">Captura las medidas</p>
									<p className="text-lg text-bone/80 mt-3">
										Escribe el largo, ancho y alto del espacio para ver en cuánto tiempo se renueva la atmósfera.
									</p>
								</>
							)}
						</div>

						{/* Stats + picture */}
						<div className="lg:col-start-2 lg:row-start-2">
							<dl className="grid grid-cols-2 gap-px bg-bone/15 border border-bone/15">
								{[
									[valid ? `${fmtNum(V, V < 100 ? 1 : 0)} m³` : "—", "Volumen del espacio"],
									[`${fmtNum(FANS[size][mode].cmh)} m³/h`, "Caudal del ventilador"],
									[r ? fmtNum(r.achHour, r.achHour < 10 ? 2 : 1) : "—", "Renovaciones por hora"],
									[r ? fmtTime(r.minutes / TARGET_CHANGES) : "—", "Tiempo por renovación"],
								].map(([v, l]) => (
									<div key={l} className="bg-ink px-4 py-3">
										<dd className="text-2xl font-bold tabular-nums whitespace-nowrap">{v}</dd>
										<dt className="text-sm text-bone/60">{l}</dt>
									</div>
								))}
							</dl>
							{valid && <div className="mt-6"><Room d={d} /></div>}
						</div>
					</div>
				</div>
			</section>

			{/* Comparison */}
			<section className="bg-white text-ink py-16 md:py-20 px-6 sm:px-10 lg:px-16">
				<div className="max-w-6xl mx-auto">
					<div className="w-10 h-[2px] bg-fr-red mb-5" />
					<h2 className="text-3xl md:text-5xl font-bold">Los V-MAX en tu espacio</h2>
					<p className="text-lg font-light text-[#333] mt-3 max-w-3xl">
						Caudal de cada modelo y tiempo para renovar la atmósfera en el espacio que capturaste.
					</p>
					<div className="mt-8 space-y-3">
						{options.map((o) => {
							const on = o.size === size && o.mode === mode;
							return (
								<div key={`${o.size}${o.mode}`} className="grid grid-cols-[6.5rem_minmax(0,1fr)_6.5rem] md:grid-cols-[11rem_minmax(0,1fr)_8rem] items-center gap-3">
									<div className="text-sm md:text-base font-bold">
										{o.size}&quot; <span className="font-normal">{MODE_LABEL[o.mode]}</span>
									</div>
									<div className="relative h-8 bg-gray-100">
										<div className={`absolute inset-y-0 left-0 transition-[width] duration-500 ${on ? "bg-fr-red" : "bg-ink"}`}
											style={{ width: `${(o.Q / maxQ) * 100}%` }} />
									</div>
									<div className="text-right tabular-nums whitespace-nowrap">
										<span className="block font-bold">{valid ? fmtTime(o.minutes) : "—"}</span>
										<span className="block text-xs text-gray-600">{fmtNum(o.Q)} m³/h</span>
									</div>
								</div>
							);
						})}
					</div>
					{r && <Timeline minutes={r.minutes} />}
				</div>
			</section>

			{/* Method + caveat */}
			<section className="bg-ivory text-ink py-16 px-6 sm:px-10 lg:px-16">
				<div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
					<div>
						<div className="w-10 h-[2px] bg-fr-red mb-5" />
						<h2 className="text-2xl md:text-3xl font-bold">Cómo se calcula</h2>
						<div className="bg-white p-5 mt-5 leading-loose tabular-nums">
							Volumen = largo × ancho × alto<br />
							Renovaciones por hora = caudal (m³/h) ÷ volumen (m³)<br />
							Tiempo = {TARGET_CHANGES} renovaciones ÷ renovaciones por minuto
						</div>
						<p className="text-[#333] mt-5 leading-relaxed">
							Se considera generalmente aceptado que se requieren {TARGET_CHANGES} renovaciones para cambiar por completo
							la atmósfera de un espacio y eliminar el aire estancado de los rincones.
						</p>
					</div>
					<div className="border-t-2 border-fr-red pt-5">
						<h3 className="font-bold">Antes de usar el resultado</h3>
						<ul className="list-disc pl-5 mt-3 space-y-2 text-[#333]">
							<li>El caudal es el certificado por el fabricante bajo la norma AMCA 240-22, con el ventilador a 4.6 m de la entrada y a 10° de inclinación.</li>
							<li>Es un cálculo teórico. En operación real el desempeño cambia con el tamaño de la abertura de salida, los obstáculos, la distribución interior y el viento.</li>
							<li>Úsalo como referencia para comparar modelos, no como procedimiento de ventilación.</li>
						</ul>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="bg-white px-6 py-14 text-center text-black">
				<div className="max-w-xl mx-auto">
					<p className="text-lg md:text-xl leading-relaxed mb-8">
						¿Quieres ver el V-MAX funcionando? Uno de nuestros especialistas te ayuda a elegir el ventilador para tu operación
						y coordina una demostración.
					</p>
					<div className="flex flex-col sm:flex-row gap-3 justify-center">
						<CTAButton onClick={() => setIsModalOpen(true)}>CONTÁCTANOS</CTAButton>
						<Link href="/ventilacion"
							className="inline-flex items-center justify-center px-7 py-3 font-[almaq] text-xs font-bold tracking-[0.2em] uppercase border border-ink text-ink hover:bg-fr-red hover:border-fr-red hover:text-bone transition-colors duration-300">
							VOLVER A VENTILACIÓN
						</Link>
					</div>
				</div>
			</section>

			{/* Mobile result dock */}
			<div className={`md:hidden fixed inset-x-0 bottom-0 z-30 bg-ink text-bone border-t-2 border-fr-red px-4 py-3 flex items-center justify-between gap-3 transition-transform duration-300 ${dock ? "translate-y-0" : "translate-y-full"}`}>
				<div className="min-w-0">
					<span className="block text-xs text-bone/70 truncate">
						{fanLabel(size, mode)}
					</span>
					<span className="block text-xl font-bold tabular-nums whitespace-nowrap">{r ? fmtTime(r.minutes) : "—"}</span>
				</div>
				<CTAButton variant="light" onClick={() => setIsModalOpen(true)} className="px-4">CONTÁCTANOS</CTAButton>
			</div>

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<ContactoForm />
			</Modal>
		</>
	);
}
