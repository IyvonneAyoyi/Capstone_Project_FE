/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-green-500",
    "bg-yellow-400",
    "bg-red-500",
    "bg-gray-400",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
