/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', 'system-ui', 'sans-serif'],
  			mono: ['JetBrains Mono', 'monospace']
  		},
  		colors: {
  			background: '#020617', // slate-950
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: '#06b6d4', // brand-cyan
  				foreground: '#ffffff'
  			},
        brand: {
          cyan: '#06b6d4',
          purple: '#8b5cf6',
          slate: '#0f172a'
        },
  			border: 'rgba(255, 255, 255, 0.1)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
  			muted: {
  				DEFAULT: 'rgba(255, 255, 255, 0.05)',
  				foreground: '#94a3b8'
  			},
  			card: {
  				DEFAULT: 'rgba(15, 23, 42, 0.6)',
  				foreground: '#f8fafc'
  			}
  		},
  		boxShadow: {
  			glow: '0 0 20px -5px rgba(6, 182, 212, 0.5)',
  			'glow-purple': '0 0 20px -5px rgba(139, 92, 246, 0.5)',
  			glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
  		},
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'forge-grid': 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)'
      }
  	}
  },
  plugins: [require("tailwindcss-animate")]
}