import { defineConfig, loadEnv } from 'vite'



const envPrefix = "EXP_"



export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), envPrefix)

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
          html => {
            let newHtml =
              html.replace(/.*({{\s*([^\?\s]*)\s*(\?{0,2})}}).*\n?/g, (ln, tag, key, rm) => {
                if (env[key]) return ln.replace(tag, env[key])
                if (rm === "?") return ln.replace(tag, "")
                if (rm === "??") return ""
                return ln
              })

            if (mode === "development") {
              return newHtml.replace(
                "</head>",
                `  <noscript id="index-css"><link rel="stylesheet" href="/src/index.css"></noscript>\n$&`
              )
            }
            
            return newHtml.replace(
              `<link(.*?)rel="stylesheet"(.*?)href="(.*?)/index\.(.*?)css"(.*?)>`,
              `<noscript id="index-css">$&</noscript>`
            )
          }
      }
    ]
  })
}
