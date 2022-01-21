import { loadEnv } from "vite"
import { envPrefix } from "../vite.config.js"



const env = loadEnv("test", process.cwd(), envPrefix)
const envar = key => env[`${envPrefix}${key}`]



const TEST_VERBOSE = !!envar("AVA_VERBOSE")



export default {
  verbose: TEST_VERBOSE, // NB: has no effect yet. see ava docs
  nodeArguments: [
    "--experimental-loader=./ava/loader.js",
    ...(TEST_VERBOSE ? [] : ["--no-warnings"]),
  ],
}