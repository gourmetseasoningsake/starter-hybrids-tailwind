/*
https://github.com/avajs/ava/issues/2038
https://ar.al/2021/05/27/make-anything-a-javascript-module-using-node.js-esm-module-loaders/
*/

import { Buffer } from "buffer"
import { extname } from "path"
import { URL, pathToFileURL } from "url"
import { loadEnv } from "vite"
import { envPrefix } from "../vite.config.js"



const envEntries = Object.entries(loadEnv("test", process.cwd(), envPrefix))
const baseURL = pathToFileURL(`${process.cwd()}/`).href



export const resolve = (specifier, context, defaultResolve) => {
  const { parentURL = baseURL } = context
  if (extname(specifier).startsWith(".css")) {
    return {
      url:  new URL(specifier, parentURL).href
    }
  }

  return defaultResolve(specifier, context, defaultResolve)
}



export const getFormat = (url, context, defaultGetFormat) => {
  if (extname(url).startsWith(".css")) {
    return {
      format: 'module'
    }
  }

  return defaultGetFormat(url, context, defaultGetFormat)
}



export const transformSource = (source, context, defaultGetSource) => {
  const { url } = context
  
  if (extname(url).startsWith(".css")) {
    return {
      source: 'export default ""'
    }
  }

  if (!url.includes("/node_modules/")) {

    const contents = 
      envEntries.reduce(
        (a, [k, v]) =>
        a.replaceAll(`import.meta.env.${k}`, v === "" ? false : v),
        source.toString("utf-8")
      ).replace(
        /import\.meta\.env\.(MODE|BASE_URL|PROD|DEV)/g, 
        (_, c) =>
        ({
          MODE: "production",
          BASE_URL: baseURL,
          PROD: true,
          DEV: false
        }[c])
      )
    
    const newSource = Buffer.from(contents, "utf-8")
    return defaultGetSource(newSource, context, defaultGetSource)
  }
  
  return defaultGetSource(source, context, defaultGetSource)
}