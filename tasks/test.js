import { execa } from "execa"
import { envFrom } from "../vite.config.js"


const mode = process.argv[2]
const env = envFrom(mode)


new Promise(
  res => 
  execa(
    "json-server", 
    [ "./json-server/db.json",
      "--port", env.var("API_PORT")
    ],
    { env: { FORCE_COLOR: "true" }}
  ).stdout.on(
    "data",
    data => (
      //console.log(data.toString()),
      data.toString().includes("Done") && res()
    )
  )
).then(() => {
  execa(
    "ava", 
    [ "--config", "./ava/config.js",
      "./src/elements/a-link.spec.js"
    ], 
    { env: { FORCE_COLOR: "true" }}
  ).stdout.pipe(process.stdout)
})

