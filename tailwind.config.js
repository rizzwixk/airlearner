/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/renderer/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        dark: {
          100: '#1e1e2e',
          200: '#181825',
          300: '#11111b',
          400: '#0c0c14',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
