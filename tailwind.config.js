/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Le fond du site Spinn en version claire est un gris très doux
        'spinn-bg': '#f5f5f7', 
        // Texte noir profond pour un contraste maximal
        'spinn-black': '#121212',
        // Cartes blanches ou gris très clair pour l'effet de relief
        'spinn-card': '#ffffff',
        // Bordures fines et discrètes
        'spinn-border': '#e5e7eb',
        // Gris pour les textes secondaires
        'spinn-muted': '#6b7280',
        
        // Couleur d'accent (Bleu Acier ou Indigo léger)
        'spinn-accent': {
          DEFAULT: '#6366f1',
          light: '#818cf8',
        },
      },
      animation: {
        'blob': 'blob 10s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)', opacity: 0.2 },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)', opacity: 0.4 },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)', opacity: 0.2 },
          '100%': { transform: 'translate(0px, 0px) scale(1)', opacity: 0.2 },
        }
      }
    },
  },
  plugins: [],
};