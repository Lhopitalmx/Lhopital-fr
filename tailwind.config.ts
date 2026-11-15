import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Paleta Lhopital FR (diseno-lhopital-fr.md). Usar estos tokens en lugar de hex sueltos.
        "fr-red": "#B01F29",
        bone: "#F4F1EC",
        ink: "#111111",
        gold: "#C9A961", // dorado de la familia Lhopital; solo en el hero de inicio
        ivory: "#FAF9F6",
      },
    },
  },
  plugins: [],
} satisfies Config;
