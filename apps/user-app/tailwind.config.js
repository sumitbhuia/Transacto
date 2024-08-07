/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // user-app has "app" folder where tailwind should look for files
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}" // ui package has "src" folder where tailwind should look for files

  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

