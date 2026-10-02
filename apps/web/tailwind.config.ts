import type { Config } from 'tailwindcss';

/**
 * Palette drawn from the Western Indian Ocean coastline:
 * abyss (deep water), lagoon (shallows), shoal (sand-bar glass), chalk (surf), coral (alerts).
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        abyss: { DEFAULT: '#0B2B35', 700: '#123C49', 600: '#1A4E5E' },
        lagoon: { DEFAULT: '#12707E', 600: '#0E5C68', 100: '#D4EBEE', 50: '#EAF5F6' },
        shoal: '#DCEEF0',
        chalk: '#F6F9F9',
        ink: { DEFAULT: '#14272D', muted: '#58707A' },
        coral: { DEFAULT: '#D8573B', 100: '#FBE5DF' },
        kelp: { DEFAULT: '#2F7D57', 100: '#DDF0E5' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: { panel: '0.875rem' },
    },
  },
  plugins: [],
};
export default config;
