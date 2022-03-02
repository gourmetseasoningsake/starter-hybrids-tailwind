import jsonServer from "json-server"
import { execa } from "execa"
import { envFrom } from "../vite.config.js"



const mode = process.argv[2]
const env = envFrom(mode)



// new Promise(
//   res => {
//     const subprocess = execa(
//       "json-server", 
//       [ "./json-server/db.json",
//         "--port", env.var("API_PORT")
//       ],
//       { env: { FORCE_COLOR: "true" }}
//     )
//     return subprocess.stdout.on(
//       "data",
//       buffer => (
//         console.log(buffer.toString()),
//         buffer.toString().includes("Done") && res({
//           kill: () => subprocess.kill("SIGTERM", { forceKillAfterTimeout: 1000 })
//         })
//       )
//     )
//   }
// )
// .then(async prevSubprocess => {
//   const subprocess = execa(
//     "ava", 
//     [ "--config", "./ava/config.js" ], 
//     { env: { FORCE_COLOR: "true", MODE: env.mode }}
//   )
//   subprocess.stdout.pipe(process.stdout)
//   await subprocess
//   prevSubprocess.kill()
// })