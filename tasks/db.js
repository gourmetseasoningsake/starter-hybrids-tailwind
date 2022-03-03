import { command, envFrom, isRunningFromCLI } from "../helpers.js"



export const run = command({
  cmd: "json-server",
  args: 
    env => [
      env.var("DB_PATH"),
      "--host", env.var("API_HOST"),
      "--port", env.var("API_PORT"),
      ...(env.mode === "development" ? ["--watch"] : [])
    ],
  stdout:
    ({ env, content, resolve, kill }) => {
      const match = content.includes(env.var("API_URL"))
      if (match || /(GET|POST|PUT|PATCH|DELETE)/.test(content)) console.log(content)
      if (match) resolve({ kill })
    }
})



if (isRunningFromCLI(process.argv[1], import.meta.url)) {
  const mode = process.argv[2]
  const env = envFrom(mode)
  run(env)
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
