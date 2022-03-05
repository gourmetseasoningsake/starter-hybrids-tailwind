import { resolve } from "path"
import { fileURLToPath } from "url"



export const isRunningFromCLI = 
  (nodePath, modulePath) =>
  resolve(nodePath) === resolve(fileURLToPath(modulePath))