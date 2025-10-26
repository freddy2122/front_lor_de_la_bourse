/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Définir votre palette de couleurs personnalisée
      colors: {
        'brand-blue': '#052E4F',   // Votre bleu nuit principal
        'brand-gold': '#C8A646',   // Votre couleur or/accent
        'brand-cream': '#f8f4e4',  // Votre fond clair/off-white
        'brand-light-gray': '#E2E8F0', // Une couleur neutre pour les bordures
      },
      // 2. Définir vos polices personnalisées
      fontFamily: {
        // 'sans' est la police par défaut pour le corps du texte
        'sans': ['Poppins', 'sans-serif'],
        // 'serif' peut être utilisé pour les titres si vous le souhaitez
        'serif': ['Arimo', 'serif'],
        // 'display' est une police pour les éléments très visibles (ex: grands titres)
        'display': ['Manrope', 'sans-serif'],
      },
     
    },
  },
  plugins: [
    require('@tailwindcss/typography'),

  ],
}
