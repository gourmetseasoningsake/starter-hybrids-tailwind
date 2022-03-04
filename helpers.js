import { resolve } from "path"
import { fileURLToPath } from "url"
import { execa } from "execa"
import { loadEnv } from "vite"
import { envPrefixes } from "./vite.config.js"



export const omitProp = 
  (o, k) => {
    const { [k]: _, ...rest } = o
    return rest
  }



export const envFrom = 
  (mode, prefixes = envPrefixes) => {
    const entries = loadEnv(mode, process.cwd(), prefixes)
    const fn = p => k => entries[`${p}${k}`]

    return prefixes.reduce((a, b) => {
      const prefix = 
        b.toLowerCase()
        .replace(/_+([a-z0-9])/g, (_, c) => c.toUpperCase())
        .replace("_", "")

      return {...a, [prefix]: fn(b)}
    }, { 
      mode, 
      entries, 
      var: fn(prefixes[0]) 
    })
  }



export const isRunningFromCLI = 
  (nodePath, modulePath) =>
  resolve(nodePath) === resolve(fileURLToPath(modulePath))


/* 
TODO: actually wait for the subprocess to finish (option), wtf... 
right no it just works by chance
*/
export const command = 
  ({ cmd, args, stdout, options = {} }) => 
  (env, prevValues = {}) =>
  new Promise((res, rej) => {
    const args_ = typeof args === "function" ? args(env) : args
    const options_ = typeof options === "function" ? options(env) : options

    const subprocess = execa(cmd, args_, {
      env: { FORCE_COLOR: true, ...options_.env },
      ...(omitProp(options_, "env"))
    })

    const values = {
      env,
      subprocess,
      kill: (options = {}) => !subprocess.killed && subprocess.kill(
        options.termination || "SIGTERM", 
        { forceKillAfterTimeout: 3000, ...(omitProp(options, "termination")) }
      ),
      ...prevValues
    }

    if (typeof stdout === "function") {
      subprocess.stdout.on("data", buffer => stdout({
        content: buffer.toString(),
        res: (otherValues = {}) => res({ ...values, ...otherValues }),
        rej,
        ...values
      }))

    } else if (Boolean(stdout)) {
      subprocess.stdout.pipe(process.stdout)
      res(values)

    } else {
      res(values)
    }
  })



// const __dirname = 
//   import.meta.url
//   .split(process.cwd())
//   .reduce((a, b) => b.includes(":/") ? a : join(".", dirname(b), "db.json"), "")
