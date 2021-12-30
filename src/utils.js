import { router, html } from "hybrids"
import styles from "./index.css"



export const styled = (
  (hasASS, isDev) => {
    if (hasASS || isDev) {
      return {
        html: 
          (parts, ...args) =>
          html(parts, ...args).style(styles)
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
)( "replace" in CSSStyleSheet.prototype, 
   import.meta.env.MODE === "development"
)



/*
  TODO:
  https://developer.mozilla.org/en-US/docs/Web/API/AbortController
  https://stackoverflow.com/questions/29478751/cancel-a-vanilla-ecmascript-6-promise-chain#answer-59999584
*/
export const beforeNavigate = 
  fn =>
  (host, e) =>
  router.resolve(e, fn(host, e))