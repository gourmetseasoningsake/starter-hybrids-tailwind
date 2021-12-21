export default {
  mount: {
    src: "/_dist",
    public: "/",
  },
  devOptions: {
    tailwindConfig: "./tailwind.config.js",
  },
  plugins: [
    "@snowpack/plugin-postcss",
    [
      "@snowpack/plugin-run-script",
      {
        cmd: "rescript build -w",
        watch: "$1 -w",
      },
    ],
  ],
}