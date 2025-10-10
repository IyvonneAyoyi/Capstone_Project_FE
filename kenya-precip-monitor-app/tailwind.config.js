/** @type {import('tailwindcss').Config} */
export default{
  content: [
    "./index.html",
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // make sure this matches your source files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-gray-400"
],

};

