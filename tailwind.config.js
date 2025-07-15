/** @type {import('tailwindcss').Config} */
export default {
   darkMode: "class", 
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    screens: {
      sm: "600px",
      md: "768px",
      lg: "984px",
      xl: "1240px",
      "2xl": "1400px",
    },

    extend: {
     
    },
  },
  plugins: [],
};
