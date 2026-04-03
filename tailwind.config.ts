import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        volo: {
          bg: '#FAF9F7',
          surface: '#FFFFFF',
          text: '#1A1A1B',
          muted: '#71717A',
          accent: '#D97706',
          'accent-hover': '#B45309',
          'accent-light': '#FFFBEB',
          info: '#2563EB',
          success: '#16A34A',
          error: '#DC2626',
          border: '#E4E4E7',
          'border-strong': '#D4D4D8',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      boxShadow: {
        'volo-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
        'volo-md': '0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
        'volo-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -5px rgba(0, 0, 0, 0.04)',
        'volo-xl': '0 20px 40px -10px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
