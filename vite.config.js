import { defineConfig, loadEnv } from "vite"
import { Liquid } from "liquidjs"
import indexConfig from "./index.config.js"



const liquid = new Liquid()
const envPrefix = "EXP_"



const wrapLinkTag =
  mode =>
  html =>
  mode === "development" 
  ? html.replace(
      "</head>",
      `<noscript id="index-css"><link rel="stylesheet" href="/src/index.css"></noscript>$&`
    )
  : html.replace(
      /<link(.*?)rel="stylesheet"(.*?)href="(.*?)\/index\.(.*?)css"(.*?)>/,
      `<noscript id="index-css">$&</noscript>`
    )



export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), envPrefix)
  const data = indexConfig(mode)

  let server = {}

  if (env[`${envPrefix}BROWSER`]) {
    process.env.BROWSER = env[`${envPrefix}BROWSER`]
    server.open = "/"
  }

  return defineConfig({
    envPrefix,
    server,
    plugins: [
      { name: "html-transform"
      , transformIndexHtml: 
          content =>
          liquid
          .parseAndRender(content.replace(/\s{1,}/g, " "), data)
          .then(wrapLinkTag(mode))
      }
    ]
  })
}