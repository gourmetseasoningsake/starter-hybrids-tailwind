import { router, html } from "hybrids"
import styles from "./index.css"



export const styled = (
  hasASS => {
    if (hasASS) {
      const stylesheet = new CSSStyleSheet()
      
      stylesheet.replaceSync(styles)
      document.adoptedStyleSheets = [ stylesheet ]

      return {
        html: 
          (parts, ...args) =>
          html(parts, ...args).style(stylesheet)
      }
    }

    const noscript = document.head.querySelector("#index-css")
    const tag = noscript?.innerHTML

    if (tag) {
      noscript.outerHTML = tag // NB: throws if tag is an invalid html string
      return {
        html: 
          ([first, ...rest], ...args) =>
          html([tag + first, ...rest], ...args)
      }
    }

    return { html }
  }
)("replaceSync" in CSSStyleSheet.prototype)



/*
  TODO:
  https://developer.mozilla.org/en-US/docs/Web/API/AbortController
  https://stackoverflow.com/questions/29478751/cancel-a-vanilla-ecmascript-6-promise-chain#answer-59999584
*/
export const beforeNavigate = 
  fn =>
  (host, e) =>
  router.resolve(e, fn(host, e))