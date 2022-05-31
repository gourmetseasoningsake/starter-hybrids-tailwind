import { command } from "../utils/task.js"
import { isRunningFromCli, parseArgs } from "../utils/cli.js"
import { envFrom } from "../utils/env.js"
import { prependTitleToLine } from "../utils/task.js"



export const run = command({
  title: "db",
  color: "blue",
  cmd: "json-server",
  args: 
    env => [
      env.var("DB_PATH"),
      "--host", env.var("API_HOST"),
      "--port", env.var("API_PORT"),
      ...(env.mode === "development" ? ["--watch"] : [])
    ],
  stdout:
    ({ env, title, content, log, res }) => {
      const match = content.includes(env.var("API_URL"))
      if (match || /(GET|POST|PUT|PATCH|DELETE|Error)/.test(content)) {
        log(prependTitleToLine(content, title))
      }
      if (match) res()
    }
})



if (isRunningFromCli(process.argv[1], import.meta.url)) {
  const { mode } = parseArgs(process.argv)
  const env = envFrom(mode)
  run(env)
}
