import { dirname, join } from "path"
import jsonServer from "json-server"
import run from "json-server/lib/cli/run.js"
import { envFrom } from "../vite.config.js"


const mode = process.argv[2]
const env = envFrom(mode)

console.log(mode)

const dbPathname = 
  import.meta.url
  .split(process.cwd())
  .reduce((a, b) => b.includes(":/") ? a : join(".", dirname(b), "db.json"), "")


// const server = jsonServer.create()
// const router = jsonServer.router(dbPathname)
// const middlewares = jsonServer.defaults()



// server.use(middlewares)
// server.use(router)
// server.listen(env.var("API_PORT"), () => {
//   console.log("JSON Server is running")
// })


run({
  _: [ dbPathname ],
  watch: true,
  port: env.var("API_PORT"),
  host: "localhost",
  snapshots: ".",
  id: "id",
  foreignKeySuffix: "Id"
})

