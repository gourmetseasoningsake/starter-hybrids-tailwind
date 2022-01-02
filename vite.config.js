import { defineConfig, loadEnv } from 'vite'


const envPrefix = "EXP_"


export default ({ mode }) => {
 // const env = loadEnv(mode, process.cwd(), envPrefix)
  return defineConfig({
    envPrefix,
    // server: {
    //   hmr: env.EXP_HMR === "true"
    // },
    plugins: [
      { name: "html-transform"
      , transformIndexHtml:
          html => {
            if (mode === "development") {
              return html.replace(
                "</head>",
                `\t<noscript id="index-css"><link rel="stylesheet" href="/src/index.css"></noscript>\n</head>`
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
