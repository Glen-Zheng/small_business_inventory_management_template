import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "turqoise": "#00a5b8",
      },
      fontFamily: {
        merriweather: ["Merriweather", "serif"],
      },
      fontSize: {
        '2xs': "0.4rem",
      },
      animation: {
        shimmer: 'shimmer 1s infinite',
        'bounce-down': 'bounce-down 0.3s ease-in-out',

      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
    variants: {
    extend: {
      animation: ['group-hover', 'group-active'],
    },
  },
};
export default config;
