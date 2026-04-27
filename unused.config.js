/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          mint: "#EAFBF8",
          aqua: "#CFF7F3",
          teal: "#69D8CF",
          deep: "#123B3A",
          yellow: "#F4D35E",
          yellowHover: "#E9C94A",
          border: "#BDEBE5",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(18, 59, 58, 0.08)",
        glow: "0 16px 40px rgba(105, 216, 207, 0.22)",
      },
      backgroundImage: {
        "brand-radial":
          "radial-gradient(circle at top, rgba(207,247,243,0.9), rgba(234,251,248,0.7) 40%, white 100%)",
      },
    },
  },
  plugins: [],
}