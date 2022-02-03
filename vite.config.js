import { defineConfig, loadEnv } from "vite"
import createReScriptPlugin from "@jihchi/vite-plugin-rescript"
import minifyHTML from "rollup-plugin-minify-html-literals"
import { Liquid } from "liquidjs"
import postcssConfig from "./postcss.config.js"
import indexConfig from "./index.config.js"



export const envPrefix = "EXP_"
const liquid = new Liquid()



const wrapLinkTag =
  mode =>
  html =>
  mode === "development" 
  ? html.replace(
      "</head>",
      `<noscript id="index-css"><link rel="stylesheet" href="/src/index.css"></noscript>$&`
    )
  : html.replace(
      /<link rel="stylesheet"(.*?)href="(.*?)\/index\.(.*?)css">/,
      `<noscript id="index-css">$&</noscript>`
    )



export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), envPrefix)
  const envar = key => env[`${envPrefix}${key}`]
  const data = indexConfig(mode)

  let server = {}

  if (envar("BROWSER")) {
    process.env.BROWSER = envar("BROWSER")
    server.open = "/"
  }

  return defineConfig({
    envPrefix,
    server,
    css: { postcss: postcssConfig },
    build: {
      minify: !!envar("BUILD_MINIFY"),
      rollupOptions: {
        plugins: [
          ...(envar("BUILD_MINIFY") ? [ minifyHTML.default() ] : [])
        ]
      }
    },
    plugins: [
      { name: "html-transform"
      , transformIndexHtml: 
          content =>
          liquid
          .parseAndRender(content, data)
          .then(wrapLinkTag(mode))
      },
      createReScriptPlugin.default(),
    ]
  })
}