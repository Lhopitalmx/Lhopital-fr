// Ventilation calculator logic for SUPERVAC® V-MAX fans (used by /ventilacion/calculadora).
//
// Source of the airflow figures: SUPERVAC V-MAX sell sheet (AMCA 240-22 certified output,
// 15 ft / 4.6 m setback, 10° angle) and Lhopital's internal "VENTILATION CALCULATOR.xlsx".
// We use the factory m³/h (cmh) values directly instead of converting CFM, so there is a
// single source. CFM is kept for reference only.

export type FanSize = 16 | 18 | 20;
export type FanMode = "hi" | "max";

export const FANS: Record<FanSize, Record<FanMode, { cmh: number; cfm: number }>> = {
	16: { hi: { cmh: 18843, cfm: 11091 }, max: { cmh: 20965, cfm: 12340 } },
	18: { hi: { cmh: 18887, cfm: 11117 }, max: { cmh: 22088, cfm: 13001 } },
	20: { hi: { cmh: 21623, cfm: 12727 }, max: { cmh: 22989, cfm: 13531 } },
};

export const SIZES: FanSize[] = [16, 18, 20];
export const MODE_LABEL: Record<FanMode, string> = { hi: "Alta velocidad", max: "MAX" };

// Generally accepted number of air changes to fully replace the atmosphere of a room.
export const TARGET_CHANGES = 10;

export type Dims = { L: number; W: number; H: number };

export const volume = ({ L, W, H }: Dims) => L * W * H;

// Direct calculation: how long a given fan takes to do TARGET_CHANGES air changes.
export function ventilate(d: Dims, size: FanSize, mode: FanMode) {
	const V = volume(d);
	const Q = FANS[size][mode].cmh;
	const achHour = Q / V; // air changes per hour
	const achMin = achHour / 60; // air changes per minute
	const minutes = TARGET_CHANGES / achMin; // minutes for TARGET_CHANGES
	return { V, Q, achHour, achMin, minutes };
}

// Inverse calculation: airflow (m³/h) needed to do TARGET_CHANGES in `targetMin` minutes,
// and which model/mode combinations reach it, ordered from smallest airflow to largest.
export function recommend(d: Dims, targetMin: number) {
	const V = volume(d);
	const required = (TARGET_CHANGES * V * 60) / targetMin;
	const options = SIZES.flatMap((size) =>
		(["hi", "max"] as FanMode[]).map((mode) => {
			const r = ventilate(d, size, mode);
			return { size, mode, ...r, ok: r.Q >= required };
		})
	).sort((a, b) => a.Q - b.Q);
	const best = options.find((o) => o.ok) ?? null;
	return { V, required, options, best };
}

// Formatting helpers (es-MX).
export const fmtNum = (n: number, d = 0) =>
	n.toLocaleString("es-MX", { minimumFractionDigits: d, maximumFractionDigits: d });

export function splitTime(min: number) {
	const s = Math.round(min * 60);
	return { h: Math.floor(s / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

export function fmtTime(min: number) {
	const { h, m, s } = splitTime(min);
	if (h) return `${h} h ${m} min`;
	if (m) return `${m} min ${s} s`;
	return `${s} s`;
}
