import { command } from "../utils/task.js"
import { isRunningFromCli, parseArgs } from "../utils/cli.js"
import { envFrom } from "../utils/env.js"



export const run = command({
  title: "vite",
  color: "yellow",
  cmd: "vite",
  args: env => [ "--mode", env.mode, ...(env.force ? ["--force"] : []) ],
  stdout: true
})



if (isRunningFromCli(process.argv[1], import.meta.url)) {
  const { mode, force } = parseArgs(process.argv)
  const env = { ...(envFrom(mode)), force }
  run(env)
}