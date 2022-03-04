import { envFrom, isRunningFromCLI } from "../helpers.js"
import * as db from "./db.js"
import * as ava from "./ava.js"



export const run = 
  env =>
  db.run(env)
  .then(db => ava.run(env, { db }))
  .then(({ db }) => db.kill())
  .catch(console.log)



if (isRunningFromCLI(process.argv[1], import.meta.url)) {
  const mode = process.argv[2]
  const env = { ...(envFrom(mode)), group: process.argv[3] }
  run(env)
}