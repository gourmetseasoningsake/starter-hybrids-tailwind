import { loadEnv as viteLoadEnv } from "vite"
import { envPrefixes } from "../config.js"



export const loadEnv = viteLoadEnv



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



// const __dirname = 
//   import.meta.url
//   .split(process.cwd())
//   .reduce((a, b) => b.includes(":/") ? a : join(".", dirname(b), "db.json"), "")
