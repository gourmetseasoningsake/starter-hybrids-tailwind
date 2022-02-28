import { envFrom } from "../vite.config.js"



const env = envFrom("test")
const verbose = !!env.var("AVA_VERBOSE")



export default {
  verbose, // NB: has no effect yet. see ava docs
  nodeArguments: [
    "--experimental-loader=./ava/loader.js",
    ...(verbose ? [] : ["--no-warnings"]),
  ],
}