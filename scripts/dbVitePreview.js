import { isRunningFromCli, parseArgs } from "../utils/cli.js"
import { envFrom } from "../utils/env.js"
import * as db from "./db.js"
import * as vitePreview from "./vitePreview.js"



export const run = 
  env =>
  db.run(env)
  .then(() => vitePreview.run(env))
  .catch(console.log)



if (isRunningFromCli(process.argv[1], import.meta.url)) {
  const { mode } = parseArgs(process.argv)
  const env = envFrom(mode)
  run(env)
}