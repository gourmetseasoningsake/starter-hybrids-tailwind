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
    ({ env, content, res }) => {
      const match = content.includes(env.var("API_URL"))
      if (match || /(GET|POST|PUT|PATCH|DELETE)/.test(content)) console.log(content)
      if (match) res()
    }
})



if (isRunningFromCLI(process.argv[1], import.meta.url)) {
  const mode = process.argv[2]
  const env = envFrom(mode)
  run(env)
}