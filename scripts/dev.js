import { isRunningFromCli, parseArgs } from "../utils/cli.js"
import { envFrom } from "../utils/env.js"
import * as db from "./db.js"
import * as vite from "./vite.js"



export const run = 
  env =>
  db.run(env)
  .then(() => vite.run(env))
  .catch(console.log)



if (isRunningFromCli(process.argv[1], import.meta.url)) {
  const { mode, force } = parseArgs(process.argv)
  const env = { ...(envFrom(mode)), force }
  run(env)
}