/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: "#FDF8F3",
          100: "#F5E6D3",
          200: "#E6CBA8",
          300: "#D4A574",
          400: "#C4864C",
          500: "#8B5A2B",
          600: "#6F4E37",
          700: "#5C4033",
          800: "#3E2723",
          900: "#1C1210",
        },
        cream: {
          50: "#FFFEF7",
          100: "#FFFDD0",
          200: "#FFF8DC",
        },
        espresso: "#3C1810",
        caramel: "#FFD59A",
        mocha: "#967259",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
    },
  },
  plugins: [],
};
