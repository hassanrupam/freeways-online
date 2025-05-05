import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'bg-pan': 'bgPan 120s ease-in-out infinite',
        'spin-slower': 'spin 120s linear infinite',
        'spin-slow': 'spin 90s linear infinite',
        'spin-medium': 'spin 60s linear infinite',
        'spin-fast': 'spin 0.5s linear infinite',
      },
      backgroundImage: {
        'neon-circle': "url('/assets/images/neon-circle.png')",
        'google-logo': "url('/assets/images/google.png')",
        'controller-neon': "url('/assets/images/controller-neon.png')",
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
      keyframes: {
        bgPan: {
          '0%': { backgroundPosition: 'center center' },
          '25%': { backgroundPosition: 'center top' },
          '75%': { backgroundPosition: 'center bottom' },
          '100%': { backgroundPosition: 'center center' },
        },
      }
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
      addUtilities({
        ".delayed-transition": {
          transition: `background-color 1.5s ease-in-out,
           width 1.5s ease-in-out, 
           height 1.5s ease-in-out,
           font-size 1.5s ease-in-out,
           opacity 1.5s ease-in-out,
           visibility 1.5s ease-in-out,
           backdrop-filter 1.5s ease-in-out,
           filter 1.5s ease-in-out,
           scale 1.5s ease-in-out,
           transform 1.5s ease-in-out`
        },
        ".smooth-transition": {
          transition: `background-color 0.5s ease-in-out,
           width 0.5s ease-in-out, 
           height 0.5s ease-in-out,
           font-size 0.5s ease-in-out,
           opacity 0.5s ease-in-out,
           visibility 0.5s ease-in-out,
           backdrop-filter 0.5s ease-in-out,
           filter 0.5s ease-in-out,
           scale 0.5s ease-in-out,
           transform 0.5s ease-in-out`
        },
        ".quick-transition": {
          transition: `background-color 0.2s ease-in-out,
           width 0.2s ease-in-out, 
           height 0.2s ease-in-out,
           font-size 0.2s ease-in-out,
           opacity 0.2s ease-in-out,
           visibility 0.2s ease-in-out,
           backdrop-filter 0.2s ease-in-out,
           filter 0.2s ease-in-out,
           scale 0.2s ease-in-out,
           transform 0.2s ease-in-out`
        },
        ".collapse-hidden": {
          opacity: "0",
          visibility: "hidden",
          transition: "opacity 0.5s ease-in-out, visibility 0.5s ease-in-out",
        },
        ".collapse-visible": {
          opacity: "1",
          visibility: "visible",
          transition: "opacity 0.5s ease-in-out, visibility 0.5s ease-in-out",
        },
        '.text-glow': {
          textShadow: '0 0 1px rgba(255, 255, 255, 0.7), 0 0 4px rgba(255, 255, 255, 0.7)',
        },
      });
    },
  ],
} satisfies Config;
