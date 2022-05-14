import { Liquid } from "liquidjs"


// TODO: this specific thingy mustn't be here
const wrapLinkTagByMode =
  mode =>
  html => 
  mode === "development" 
  ? html.replace(
      "</head>",
      `<noscript id="index-css"><link rel="stylesheet" href="/src/index.css"></noscript>$&`
    )
  : html.replace(
      /<link rel="stylesheet"(.*?)href="(.*?)\/index\.(.*?)css">/,
      `<noscript id="index-css">$&</noscript>`
    )


const subst_ = 
  (parts, ...args) =>
  parts.map((x, i) => args[i] ? x + args[i] : x).join("")



export const createEngineLiquid = ({ subst = { placeholder: "%" }}) => {
  const engine = new Liquid()
  engine.registerFilter("subst", (str, ...args) => subst_(str.split(subst.placeholder), ...args))
  return engine
} 



export const transformPluginFrom = 
  ({ mode, data, engine, render }) => 
  ({ 
    name: "html-transform",
    transformIndexHtml: 
      content =>
      render({ engine, content, data }).then(wrapLinkTagByMode(mode))
  })