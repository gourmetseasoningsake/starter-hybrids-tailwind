
import { execa } from "execa"
import { omitProp } from "./object.js"



export const prependTitleToLine =
  (line, title) =>
  line.replace(/.*?\n/g, `${title}$&`)
  


  
export const command =
  ({ cmd, title = cmd, args, stdout, wait = true, options = {} }) => 
  (env, prevValues = {}) => {
    const args_ = typeof args === "function" ? args(env) : args
    const options_ = typeof options === "function" ? options(env) : options
    const title_ = `[${title}]${" ".repeat(Math.max(2, 8 - title.length))}`

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

    if (typeof stdout === "function") return new Promise((res, rej) => {
      subprocess.stdout.on("data", buffer => stdout({
        title: title_,
        content: buffer.toString(),
        log: content => process.stdout.write(content),
        res: (otherValues = {}) => res({ ...values, ...otherValues }),
        rej,
        ...values
      }))
    })

    if (Boolean(stdout)) {
      subprocess.stdout.on("data", buffer => {
        const content = prependTitleToLine(buffer.toString(), title_)
        process.stdout.write(content)
      })
    }

    if (wait) return subprocess.then(() => values)
    return Promise.resolve(values)
  }
