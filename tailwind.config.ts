import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: { 50:'#E8F5F5', 100:'#C5E8E8', 200:'#8ACECE', 400:'#2A9494', 600:'#1A6B6B', 700:'#145555', 800:'#0D4040', 900:'#072A2A' },
        gold: { 100:'#F9EDCC', 200:'#F0D997', 300:'#F0D080', 400:'#D4A943', 500:'#C9A84C', 600:'#A88930', 700:'#9A7530', 800:'#7A5C20' },
        cream: { DEFAULT:'#FDFAF4', dark:'#F5EFE0' },
      },
      fontFamily: {
        display: ["'Playfair Display'", 'Georgia', 'serif'],
        sans: ["'Inter'", 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-10px)' } },
        shimmer: { '0%':{ backgroundPosition:'-1000px 0' }, '100%':{ backgroundPosition:'1000px 0' } },
        pulse2: { '0%,100%':{ opacity:'1' }, '50%':{ opacity:'0.5' } },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        pulse2: 'pulse2 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
