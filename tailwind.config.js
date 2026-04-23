/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        editorial: ['var(--font-editorial)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
}
