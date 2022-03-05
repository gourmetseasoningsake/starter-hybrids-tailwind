import { command } from "../utils/task.js"
import { isRunningFromCLI } from "../utils/cli.js"
import { envFrom } from "../utils/env.js"



export const run = command({
  title: "vite",
  cmd: "vite",
  stdout: true
})



if (isRunningFromCLI(process.argv[1], import.meta.url)) {
  const mode = process.argv[2]
  const env = envFrom(mode)
  run(env)
}