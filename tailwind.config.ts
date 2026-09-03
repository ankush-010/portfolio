import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme surfaces
        'dark-base': '#0d1117',
        'dark-surface': '#161b22',
        'dark-surface-2': '#21262d',
        'dark-border': '#30363d',
        'dark-text': '#e6edf3',
        'dark-muted': '#8b949e',
        // Light theme surfaces
        'light-base': '#ffffff',
        'light-surface': '#f6f8fa',
        'light-surface-2': '#eaecef',
        'light-border': '#d0d7de',
        'light-text': '#1f2328',
        'light-muted': '#57606a',
        // Accent
        accent: '#3b82f6',
        'accent-hover': '#2563eb',
        'accent-light': '#dbeafe',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          '"Fira Code"',
          '"Cascadia Code"',
          'Consolas',
          'monospace',
        ],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
