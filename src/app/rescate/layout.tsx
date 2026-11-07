import type { ReactNode } from "react";
import { metadata as pageMetadata } from "./metadata";

// La página es "use client" y no puede declarar su metadata; este layout la aplica
// (título, descripción y canonical propios de la página).
export const metadata = pageMetadata;

export default function Layout({ children }: { children: ReactNode }) {
	return children;
}
