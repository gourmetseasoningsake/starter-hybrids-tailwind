import { command } from "../utils/task.js"
import { isRunningFromCli, parseArgs } from "../utils/cli.js"
import { envFrom } from "../utils/env.js"



export const run = command({
  title: "ava",
  color: "magenta",
  cmd: "ava",
  args: [ "--config", "./ava/config.js" ],
  stdout: true,
  options: 
    env => ({ 
      env: {
        MODE: env.mode,
        GROUP: env.group,
        VERBOSE: env.var("TEST_VERBOSE")
      }
    })
})



if (isRunningFromCli(process.argv[1], import.meta.url)) {
  const { mode, group } = parseArgs(process.argv)
  const env = { ...(envFrom(mode)), group }
  run(env)
}