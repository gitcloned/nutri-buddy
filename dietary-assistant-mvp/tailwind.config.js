/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#4CAF50",
          secondary: "#8BC34A",
          background: "#F9F9F9",
          "chat-bg": "#E0F7FA",
          "chat-user": "#E8F5E9",
        }
      },
    },
    plugins: [],
  }