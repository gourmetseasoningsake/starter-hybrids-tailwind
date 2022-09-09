import { html } from "hybrids"
import styles from "../src/index.css?inline"



const tryStylesFromLink = () => {
  const nos = document.querySelector("noscript#index-css")
  if (nos == null) return { html }

  const tag = nos.textContent
  if (tag == null ) return { html }

  if (!import.meta.env.DEV) {
    try {
      nos.outerHTML = tag
    } catch (e) {
      console.log(e)
    }
  }

  return {
    html: 
      ([first, ...rest], ...args) => 
      html([tag + first, ...rest], ...args)
  }
}



const tryStylesFromAss = styles => {
  if (!("replaceSync" in CSSStyleSheet.prototype)) return tryStylesFromLink()

  const stylesheet = new CSSStyleSheet()

  stylesheet.replaceSync(styles)
  document.adoptedStyleSheets = [stylesheet]

  return {
    html: 
      (parts, ...args) =>
      html(parts, ...args).style(stylesheet)
  }
}



export const styled = 
  import.meta.env.EXP_ASS_DISABLE 
  ? tryStylesFromLink() 
  : tryStylesFromAss(styles)



if (import.meta.hot) {
  import.meta.hot.accept(() => {
    if (import.meta.env.EXP_HMR_FORCE_RELOAD) {
      import.meta.hot.invalidate()
    }
  })
}