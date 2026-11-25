/**
 * Líneas de producto por página. Se usa para ViewContent (Meta) y
 * view_item_list (GA4) al entrar a cada línea, y como lista blanca en el
 * servidor: solo estas rutas generan ViewContent.
 */

export interface Linea {
	/** Nombre visible de la línea (content_category / item_list_name). */
	categoria: string;
	/** Qué se vio (content_name). */
	nombre: string;
	/** Identificador estable (content_ids / item_list_id). */
	id: string;
}

export const LINEAS: Record<string, Linea> = {
	"/rescate": { id: "rescate", categoria: "Rescate", nombre: "Rescate técnico" },
	"/hazmat": { id: "hazmat", categoria: "HAZMAT", nombre: "HAZMAT" },
	"/ventilacion": { id: "ventilacion", categoria: "Ventilación", nombre: "Ventilación" },
	"/ventilacion/calculadora": {
		id: "ventilacion-calculadora",
		categoria: "Ventilación",
		nombre: "Calculadora de ventilación",
	},
	"/proteccion-personal": {
		id: "proteccion-personal",
		categoria: "Protección personal",
		nombre: "Protección personal",
	},
};

export function lineaDeRuta(pathname: string): Linea | null {
	const limpia = pathname.replace(/\/+$/, "") || "/";
	return LINEAS[limpia] ?? null;
}
