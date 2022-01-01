import { defineConfig } from 'vite'


// https://stackoverflow.com/questions/66389043/how-can-i-use-vite-env-variables-in-vite-config-js
export default defineConfig({
  envPrefix: "EXP_",
  plugins: [
    { name: "html-transform"
    , transformIndexHtml:
        (html, ctx) => {
          if (ctx.server) { // QUESTION: is `!ctx.server.config?.isProduction` necessary?
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