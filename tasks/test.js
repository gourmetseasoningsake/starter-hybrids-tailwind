import { envFrom, isRunningFromCLI } from "../vite.config.js"
import { db } from "./db.js"
import { ava } from "./ava.js"



export const test = 
  (env, group) =>
  db(env)
  .then(db => Promise.all([db, ava(env, group)]))
  .then(([ db ]) => db.close())



if (isRunningFromCLI(process.argv[1], import.meta.url)) {
  const mode = process.argv[2]
  const env = envFrom(mode)
  const group = process.argv[3]
  test(env, group)
}