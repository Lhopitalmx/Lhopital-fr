// Imágenes en Cloudinary (cuenta lhopital-moto, compartida con Corporate y Moto).
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "lhopital-moto";

// Arma la URL de un public ID con f_auto,q_auto. `transforms` agrega transformaciones propias
// (p. ej. "e_trim" o "w_400").
export function cld(publicId: string, transforms?: string): string {
	const t = ["f_auto,q_auto", transforms].filter(Boolean).join("/");
	return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${t}/${publicId}`;
}

// URL de un video. `format` elige el archivo que entrega Cloudinary (webm, mp4 o jpg para la portada).
export function cldVideo(publicId: string, format: "webm" | "mp4" | "jpg", transforms = "q_auto,c_limit,w_1920"): string {
	return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transforms}/${publicId}.${format}`;
}

// Public IDs en Cloudinary (carpeta raíz).
export const CLD = {
	escudoBw: "escudo_bw_fr",
	escudoColor: "escudo_color_fr",
	logoHorizClaroBw: "horiz_claro_bw",
	logoHorizClaroColor: "horiz_claro_color",
	logoHorizOscuroBw: "horiz_oscuro_bw",
	logoHorizOscuroColor: "horiz_oscuro_color",
} as const;
