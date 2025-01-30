/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4B5563", // Dark gray (previously blue)
        primaryDark: "#374151", // Darker gray (previously darker blue)
        accent: "#F59E0B",
      },
      boxShadow: {
        "custom-light": "0 2px 4px rgba(0, 0, 0, 0.1)", // Define shadow-custom-light
        "custom-dark": "0 4px 6px rgba(0, 0, 0, 0.2)", // Optional dark shadow
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Use Inter for a modern look
      },
    },
  },
  plugins: [],
};
