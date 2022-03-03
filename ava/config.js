const group = process.env.GROUP
const verbose = Boolean(process.env.VERBOSE)



export default {
  files: { 
    u: ["**/*.test.js"], 
    f: ["**/*.test-f.js"] 
  }[group],
  verbose, // NB: has no effect yet. see ava docs
  nodeArguments: [
    "--experimental-loader=./ava/loader.js",
    ...(verbose ? [] : ["--no-warnings"]),
  ],
}