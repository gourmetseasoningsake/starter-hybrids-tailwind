/** @typedef {import('./object.js').pojo} pojo */
/** @typedef {import('./env.js').env} env */
import { execa } from "execa"
import { omitProp } from "./object.js"



const colors = 
  color =>
  ({
    reset: "\u001b[0m",
    black: "\u001b[30m",
    white: "\u001b[37m",
    red: "\u001b[31m",
    green: "\u001b[32m",
    yellow: "\u001b[33m",
    blue: "\u001b[34m",
    magenta: "\u001b[35m",
    cyan: "\u001b[36m"
  }[color] || "reset") 




/** @type {(line: string, title: string) => string} */
export const prependTitleToLine =
  (line, title) => line.replace(/.*?\n/g, `${title}$&`)



/** 
@typedef {(_: {
  title?: string,
  content?: string,
  log?: (content: string, cb?: (err?: Error) => void) => void,
  res?: (otherValues?: pojo) => void,
  rej?: (reason?: *) => void
} & {
  values: values
}) => PromiseLike<pojo>} commandStdoutFn
*/



/** 
@type {(_: {
  cmd: string,
  title?: string,
  color?: string,
  args?: string[] | ((env?: env) => string[])
  stdout?: boolean | commandStdoutFn,
  wait?: boolean,
  options?: pojo | ((env?: env) => pojo)
}) => (env: env, prevValues: pojo) => Promise<pojo>} 
*/
export const command =
  ({ cmd, title = cmd, color = "reset", args, stdout, wait = true, options = {} }) => 
  (env, prevValues = {}) => {
    const args_ = typeof args === "function" ? args(env) : args
    const options_ = typeof options === "function" ? options(env) : options
    const title_ = `${colors(color)}[${title}]\u001b[0m${" ".repeat(Math.max(2, 8 - title.length))}`

    const subprocess = execa(cmd, args_, {
      env: { FORCE_COLOR: true, ...options_.env },
      ...(omitProp(options_, "env"))
    })

    /**
    @type {{
      env: env,
      subprocess: ExecaChildProcess<string>,
      kill: ((_: { termination?: number | NodeJS.Signals, forceKillAfterTimeout?: number | boolean }) => void)   
    } & {prevValues: prevValues}}
    */
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
        log: (content, cb) => process.stdout.write(content, cb),
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