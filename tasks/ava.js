import { execa } from "execa"
import { envFrom, isRunningFromCLI } from "../vite.config.js"



export const ava = 
  (env, group = "u") => {
    const subprocess = execa(
      "ava", 
      [ "--config", "./ava/config.js" ], 
      { env: { 
        FORCE_COLOR: "true", 
        MODE: env.mode,
        GROUP: group,
        VERBOSE: env.var("TEST_VERBOSE")
      }}
    )
    subprocess.stdout.pipe(process.stdout)
    return subprocess
  }



if (isRunningFromCLI(process.argv[1], import.meta.url)) {
  const mode = process.argv[2]
  const env = envFrom(mode)
  const group = process.argv[3]
  ava(env, group)
}