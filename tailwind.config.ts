import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal Arabian brand colors
        'ra-navy': '#1C355E',
        'ra-orange': '#C46A3B',
        'ra-gold': '#D0AF21',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      keyframes: { 'subtle-zoom': { '0%': { transform: 'scale(1)' }, '100%': { transform: 'scale(1.04)' } } },
      animation: { 'subtle-zoom': 'subtle-zoom 12s ease-out both' },
    },
  },
  plugins: [],
};

export default config;
