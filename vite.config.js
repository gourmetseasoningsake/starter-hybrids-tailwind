import { defineConfig } from 'vite'



export default defineConfig({
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