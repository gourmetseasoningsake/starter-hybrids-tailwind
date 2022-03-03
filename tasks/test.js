import { envFrom, isRunningFromCLI } from "../helpers.js"
import * as db from "./db.js"
import * as ava from "./ava.js"



export const run = 
  env =>
  db.run(env)
  .then(db => Promise.all([db, ava.run(env)]))
  .then(([ db ]) => db.kill())



if (isRunningFromCLI(process.argv[1], import.meta.url)) {
  const mode = process.argv[2]
  const env = { ...(envFrom(mode)), group: process.argv[3] }
  run(env)
}