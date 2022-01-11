import styles from "./index.css"
import { define, router, html } from "hybrids"
import { beforeNavigate } from "./Router.bs.js"



/* Views */

import MainHome from "./views/main-home.js"
import MainOther from "./views/main-other.js"
import MainMore from "./views/main-more.js"



/* Elements */

import "./elements/a-link.js"



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

    try {
      const noscript = document.head.querySelector("#index-css")
      const tag = noscript?.textContent
      noscript.outerHTML = tag

      return {
        html: 
          ([first, ...rest], ...args) =>
          html([tag + first, ...rest], ...args)
      }
    } catch (err) {
      console.log(err)
    }
    
    return { html }
  }
)("replaceSync" in CSSStyleSheet.prototype)



const historyPush = () => Promise.resolve(history.pushState(history.state, ""))



define({
  tag: "the-app",
  views: router([MainHome, MainOther, MainMore]),
  content: ({ views }) => html`

    <header>
      <nav>
        <a-link
          class="inline-block"
          href=${router.url(MainHome, { stack: true })}
          active=${router.active(MainHome)}
          onclick=${beforeNavigate(historyPush)}>
          Home
        </a-link>
        <a-link
          class="inline-block"
          href=${router.url(MainOther, { stack: true })}
          active=${router.active(MainOther)}
          onclick=${beforeNavigate(historyPush)}>
          Other
        </a-link>
        <a-link
          class="inline-block"
          href=${router.url(MainMore, { stack: true })}
          active=${router.active(MainMore)}
          onclick=${beforeNavigate(historyPush)}>
          More
        </a-link>
      </nav>
    </header>

    <main>${views}</main>
    
  `
})



/* Config */

if (import.meta.env.EXP_ROUTER_DEBUG) router.debug()
if (import.meta.hot) {
  import.meta.hot.accept(_ => {
    if (import.meta.env.EXP_HMR_FORCE_RELOAD) import.meta.hot.invalidate()
  })
}
