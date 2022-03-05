import { proxyLiteralsByKey } from "./object.js"



export const configFrom = 
  ({ mode, modes, config }) => 
  proxyLiteralsByKey({ key: mode, keys: modes, obj: {mode, ...config} })
