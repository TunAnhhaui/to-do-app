/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        1480: "1480px",
        modal: "578px",
      },
      width: {
        "calc-width": "calc((100% - 192px)/4)",
      },
      colors: {
        grayDark: "#00000098",
      },
    },
  },
  plugins: [],
};
