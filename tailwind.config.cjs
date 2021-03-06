module.exports = {
  content: ["./index.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        "system-bg": "var(--system-bg)",
        "system-fg": "var(--system-fg)",
      },
      minHeight: {
        "scroll": "calc(100% + 1px)"
      }
    }
  },
  plugins: [],
}