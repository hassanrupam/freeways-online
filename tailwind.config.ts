import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'google-logo': "url('/assets/images/google.png')",
        'landing-bg': "url('/assets/images/landing_bg.png')",
        'landing-bg-mobile': "url('/assets/images/landing_bg_square.png')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        barlow: ['barlow', 'sans-serif'], // Custom font name
      },
    },
  },
  plugins: [],
} satisfies Config;
