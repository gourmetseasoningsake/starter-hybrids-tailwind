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



export const transformPluginFrom = 
  ({ mode, data, engine, render }) => 
  ({ 
    name: "html-transform",
    transformIndexHtml: 
      content =>
      render({ engine, content, data }).then(wrapLinkTagByMode(mode))
  })