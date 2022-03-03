import { execa } from "execa"
import { envFrom, isRunningFromCLI } from "../vite.config.js"
import { db } from "./db.js"



export const dev = 
  env => 
  db(env).then(() => execa(
    "vite",
    { env: { FORCE_COLOR: "true" }}
  ).stdout.pipe(process.stdout))



if (isRunningFromCLI(process.argv[1], import.meta.url)) {
  const mode = process.argv[2]
  const env = envFrom(mode)
  dev(env)
}