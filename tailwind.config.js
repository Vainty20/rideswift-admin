import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0084FF",
          secondary: "#707070",
          accent: "#191919",
          neutral: "#707070",
          "base-100": "#F4F4F4",
          info: "#0084FF",
          success: "#5cb85c",
          warning: "#ffa600",
          error: "#de002c",
        },
      },
    ],
  },
};
