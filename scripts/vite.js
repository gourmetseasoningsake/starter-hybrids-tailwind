import { command } from "../utils/task.js"
import { isRunningFromCli, parseArgs } from "../utils/cli.js"
import { envFrom } from "../utils/env.js"



export const run = command({
  title: "vite",
  color: "yellow",
  cmd: "vite",
  stdout: true
})



if (isRunningFromCli(process.argv[1], import.meta.url)) {
  const { mode } = parseArgs(process.argv)
  const env = envFrom(mode)
  run(env)
}