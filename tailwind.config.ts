
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
         nunito: ['var(--font-nunito)'],
      
      },
      backgroundImage: {
       'maldives': "url('/images/maldives_new.jpeg')",
       'amalfi': "url('/images/Amalfi.jpeg')",
       'mauritiusBanner':  "url('/images/mauritiusBanner.jpeg')",
      }
    }
  }
} 
