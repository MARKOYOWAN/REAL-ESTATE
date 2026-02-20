/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1", // Brand
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },

        brand: {
          gold: '#D3BE6D',
          goldLight: '#E6DDA0',
          black: '#161616',
          blackLight: '#2A2A2A',
        },

        app: {
          bg: "#f9fafb",        // main background
          surface: "#ffffff",   // cards
          muted: "#f3f4f6",     // sections
        },

        text: {
          primary: "#111827",    // main text
          secondary: "#4b5563",  // paragraph
          muted: "#6b7280",
          inverted: "#ffffff",
        },

        border: {
          DEFAULT: "#e5e7eb",
          strong: "#d1d5db",
        },

        success: "#10b981",
        danger: "#ef4444",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
      },

      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.05)",
        medium: "0 10px 40px rgba(0,0,0,0.08)",
        glass: "0 8px 32px rgba(0,0,0,0.08)",
      },

      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },

      screens: {
        'xs': '480px',
      },

      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg,#D3BE6D 0%,#E6DDA0 100%)',
        'gradient-login': 'linear-gradient(135deg,#0F0C29,#302b63,#24243e)',
      },

      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15%)" },
        },
      },
      animation: {
        "bounce-slow": "bounce-slow 1.5s infinite",
      },
    },
  },
  plugins: [],
};