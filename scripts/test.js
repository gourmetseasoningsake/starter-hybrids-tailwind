import { isRunningFromCli, parseArgs } from "../utils/cli.js"
import { envFrom } from "../utils/env.js"
import * as ava from "./ava.js"



export const run = 
  env =>
  ava.run(env)
  .catch(_err => {
    process.exit(1)
  })



if (isRunningFromCli(process.argv[1], import.meta.url)) {
  const { mode, group } = parseArgs(process.argv)
  const env = { ...(envFrom(mode)), group }
  run(env)
}