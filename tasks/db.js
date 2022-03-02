//import { dirname, join } from "path"
import jsonServer from "json-server"
import { envFrom, isRunningFromCLI } from "../vite.config.js"



export const run = env => new Promise(res => {
  const server = jsonServer.create()
  const router = jsonServer.router(env.var("DB_PATH"))
  const middlewares = jsonServer.defaults()

  server.use(middlewares)
  server.use(router)

  const listener = server.listen(env.var("API_PORT"), env.var("API_HOST"), () => res(listener))
  return listener
})



if (isRunningFromCLI(process.argv[1], import.meta.url)) {
  const mode = process.argv[2]
  const env = envFrom(mode)
  run(env).then(listener => console.log(listener.address()))
}





// const dbPathname = 
//   import.meta.url
//   .split(process.cwd())
//   .reduce((a, b) => b.includes(":/") ? a : join(".", dirname(b), "db.json"), "")

