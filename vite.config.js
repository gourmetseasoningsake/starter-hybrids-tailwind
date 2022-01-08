import { defineConfig, loadEnv } from 'vite'


export default ({ mode }) => {
  const envPrefix = "EXP_"
  const env = loadEnv(mode, process.cwd(), envPrefix)

  let server = {}

  if (env.EXP_BROWSER) {
    process.env.BROWSER = env.EXP_BROWSER
    server.open = "/index.html"
  }

  return defineConfig({
    envPrefix,
    server,
    plugins: [
      { name: "html-transform"
      , transformIndexHtml:
          html => {
            if (mode === "development") {
              return html.replace(
                "</head>",
                `  <noscript id="index-css"><link rel="stylesheet" href="/src/index.css"></noscript>\n</head>`
              )
            }
            return html.replace(
              /<link(.*?)rel="stylesheet"(.*?)href="(.*?)index\.(.*?)\.css"(.*?)>/,
              `<noscript id="index-css">$&</noscript>`
            )
          }
      }
    ]
  })
}
