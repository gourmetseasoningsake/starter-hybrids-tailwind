import { defineConfig } from "vite"
import createReScriptPlugin from "@jihchi/vite-plugin-rescript"
import minifyHTML from "rollup-plugin-html-literals"
import { createEngineLiquid, transformPluginFrom as transformHtmlPluginFrom } from "./plugins/html.js"

import { envFrom, modes } from "./utils/env.js"
import { configFrom } from "./utils/config.js"

import { envPrefixes, indexConfigDefaults } from "./config.js"
import { defaults as postcssConfigDefaults } from "./postcss.config.js"



export default ({ mode }) => {
  const env = envFrom(mode)
  const indexConfig = configFrom({ mode, modes, config: indexConfigDefaults })

  let server = {}

  if (env.var("BROWSER")) {
    process.env.BROWSER = env.var("BROWSER")
    server.open = "/"
  }

  return defineConfig({
    envPrefix: envPrefixes,
    server,
    css: { postcss: postcssConfigDefaults },
    build: {
      minify: !!env.var("BUILD_MINIFY"),
      rollupOptions: {
        plugins: [
          ...(env.var("BUILD_MINIFY") ? [ minifyHTML() ] : [])
        ]
      }
    },
    plugins: [
      transformHtmlPluginFrom({ 
        mode,
        data: indexConfig,
        engine: createEngineLiquid({
          subst: { placeholder: "%" }
        }), 
        render: ({ engine, content, data }) => engine.parseAndRender(content, data)
      }),
      createReScriptPlugin.default(),
    ]
  })
}