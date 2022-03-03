import { defineConfig } from "vite"
import createReScriptPlugin from "@jihchi/vite-plugin-rescript"
import minifyHTML from "rollup-plugin-minify-html-literals"
import { Liquid } from "liquidjs"
import { envFrom } from "./helpers.js"
import postcssConfig from "./postcss.config.js"
import indexConfigFrom from "./index.config.js"



export const envPrefixes = ["EXP_"]



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
  const env = envFrom(mode)
  const indexConfig = indexConfigFrom(mode)
  const liquid = new Liquid()

  let server = {}

  if (env.var("BROWSER")) {
    process.env.BROWSER = env.var("BROWSER")
    server.open = "/"
  }

  return defineConfig({
    envPrefix: envPrefixes[0],
    server,
    css: { postcss: postcssConfig },
    build: {
      minify: !!env.var("BUILD_MINIFY"),
      rollupOptions: {
        plugins: [
          ...(env.var("BUILD_MINIFY") ? [ minifyHTML.default() ] : [])
        ]
      }
    },
    plugins: [
      { name: "html-transform"
      , transformIndexHtml: 
          content =>
          liquid
          .parseAndRender(content, indexConfig)
          .then(wrapLinkTag(mode))
      },
      createReScriptPlugin.default(),
    ]
  })
}