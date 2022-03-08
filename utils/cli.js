import { resolve } from "path"
import { fileURLToPath } from "url"



/** @type {(nodePath: string, modulePath: string) => boolean} */
export const isRunningFromCli = 
  (nodePath, modulePath) =>
  resolve(nodePath) === resolve(fileURLToPath(modulePath))



/**
 * @type {(args: string[]) => { [key: string]: string | boolean }
 * @example 
 * parseArgs(["ignored", "ignored", "a", "--fa", "--fb", "b", "--fc", "c", "d"])
 * // { fa: true, fb: "b", fc: "c d" }
 * // Note: "a" is also ignored like everything ltr to the first double dash
 */
export const parseArgs =
  args => {
    const args_ = args.slice(2).join(" ").trim()
    if (!args_.includes("--")) return {}
    return Object.fromEntries(
      args_
      .replace(/^.*?--/, "--")
      .split("--")
      .filter(x => x)
      .map(x => {
        const [flag, ...values] = x.trim().split(" ")
        return [flag, values.join(" ") || true] 
      })
    )
  }