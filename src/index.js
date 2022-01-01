import env from "./env.js"
import styles from "./index.css"
import { define, router, html } from "hybrids"



/* Views */

import MainHome from "./views/main-home.js"
import MainOther from "./views/main-other.js"



/* Elements */

import "./elements/a-link.js"



if (env.EXP_HMR) import.meta.hot.accept()
if (env.EXP_ROUTER_DEBUG) router.debug()



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
    const tag = noscript?.textContent

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



define({
  tag: "the-app",
  views: router([MainHome, MainOther]),
  content: ({ views }) => html`

    <header>
      <nav>
        <a-link
          class="inline-block"
          href=${router.url(MainHome)}
          active=${router.active(MainHome, { stack: true })}>
          Home
        </a-link>
        <a-link
          class="inline-block"
          href=${router.url(MainOther)}
          active=${router.active(MainOther, { stack: true })}>
          Other
        </a-link>
      </nav>
    </header>

    <main>${views}</main>
    
  `
})