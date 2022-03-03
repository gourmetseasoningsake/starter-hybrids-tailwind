import { execa } from "execa"
import { envFrom, isRunningFromCLI } from "../vite.config.js"



export const db = 
  env => 
  new Promise(res => {
    const subprocess = execa(
      "json-server", 
      [ env.var("DB_PATH"),
        "--host", env.var("API_HOST"),
        "--port", env.var("API_PORT"),
        ...(env.mode === "development" ? ["--watch"] : [])
      ],
      { env: { FORCE_COLOR: "true" }}
    )
    return subprocess.stdout.on("data", buffer => {
      const content = buffer.toString()
      const matchesApiUrl = content.includes(env.var("API_URL"))

      if (matchesApiUrl 
      || /(GET|POST|PUT|PATCH|DELETE)/.test(content)) {
        console.log(content)
      }

      if (matchesApiUrl) {
        res({ close: () => subprocess.kill("SIGTERM", { forceKillAfterTimeout: 1000 })})
      }
    })
  })



if (isRunningFromCLI(process.argv[1], import.meta.url)) {
  const mode = process.argv[2]
  const env = envFrom(mode)
  db(env)
}



// export const db = env => new Promise(res => {
//   const server = jsonServer.create()
//   const router = jsonServer.router(env.var("DB_PATH"))
//   const middlewares = jsonServer.defaults()

//   server.use(middlewares)
//   server.use(router)

//   const listener = server.listen(env.var("API_PORT"), env.var("API_HOST"), () => res(listener))
//   return listener
// })



// if (isRunningFromCLI(process.argv[1], import.meta.url)) {
//   const mode = process.argv[2]
//   const env = envFrom(mode)
//   run(env).then(listener => console.log(listener))
// }



// const dbPathname = 
//   import.meta.url
//   .split(process.cwd())
//   .reduce((a, b) => b.includes(":/") ? a : join(".", dirname(b), "db.json"), "")
