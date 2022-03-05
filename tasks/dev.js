import { isRunningFromCLI } from "../utils/task.js"
import { envFrom } from "../utils/env.js"
import * as db from "./db.js"
import * as vite from "./vite.js"



export const run = 
  env => 
  db.run(env)
  .then(() => vite.run(env))



if (isRunningFromCLI(process.argv[1], import.meta.url)) {
  const mode = process.argv[2]
  const env = envFrom(mode)
  run(env)
}