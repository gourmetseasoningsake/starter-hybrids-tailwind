import { proxyLiteralsByKey } from "./object.js"



/** @type {configFrom} */
export const configFrom = 
  ({ mode, modes, config }) => 
  proxyLiteralsByKey({ key: mode, keys: modes, obj: {mode, ...config} })
