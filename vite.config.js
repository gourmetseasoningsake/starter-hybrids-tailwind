import { defineConfig, loadEnv } from 'vite'


export default ({ mode }) => {
  const envPrefix = "EXP_"
  const env = loadEnv(mode, process.cwd(), envPrefix)

  let server = {}

  if (env[`${envPrefix}BROWSER`]) {
    process.env.BROWSER = env[`${envPrefix}BROWSER`]
    server.open = "/index.html"
  }

  return defineConfig({
    envPrefix,
    server,
    plugins: [
      { name: "html-transform"
      , transformIndexHtml:
          html => {
            let newHtml = html.replace(/{{\s*(.*?)\s*}}/g, (m, c) => env[c] ?? m)
            if (mode === "development") {
              return newHtml.replace(
                "</head>",
                `  <noscript id="index-css"><link rel="stylesheet" href="/src/index.css"></noscript>\n</head>`
              )
            }
            return newHtml.replace(
              /<link(.*?)rel="stylesheet"(.*?)href="(.*?)index\.(.*?)\.css"(.*?)>/,
              `<noscript id="index-css">$&</noscript>`
            )
          }
      }
    ]
  })
}
