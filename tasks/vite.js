import { command, envFrom, isRunningFromCLI } from "../helpers.js"



export const run = command({
  cmd: "vite",
  stdout: true
})



if (isRunningFromCLI(process.argv[1], import.meta.url)) {
  const mode = process.argv[2]
  const env = envFrom(mode)
  run(env)
}