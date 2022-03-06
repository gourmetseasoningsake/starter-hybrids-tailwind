import { resolve } from "path"
import { fileURLToPath } from "url"



/** @type {isRunningFromCli} */
export const isRunningFromCli = 
  (nodePath, modulePath) =>
  resolve(nodePath) === resolve(fileURLToPath(modulePath))


  
/** @type {parseArgs} */
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
