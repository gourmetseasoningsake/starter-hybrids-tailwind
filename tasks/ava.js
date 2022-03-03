import { command, envFrom, isRunningFromCLI } from "../helpers.js"



export const run = command({
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



if (isRunningFromCLI(process.argv[1], import.meta.url)) {
  const mode = process.argv[2]
  const env = { ...(envFrom(mode)), group: process.argv[3] }
  run(env)
}