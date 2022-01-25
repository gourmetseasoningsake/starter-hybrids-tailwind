import "./index.css"
import styles from "./index.css?inline"
import { define, router, html } from "hybrids"
import { historyPush, beforeNavigate } from "./Navigation.bs.js"
import { maybeStyledFromLink } from "./Styled.bs.js"



/* Views */

import MainHome from "./views/main-home.js"
import MainOther from "./views/main-other.js"
import MainMore from "./views/main-more.js"



/* Elements */

import "./elements/a-link.js"



// const maybeStyledFromLink = 
//   () => {
//     const noscript = document.head.querySelector("#index-css")
//     if (!noscript) return { html }
    
//     const tag = noscript.textContent
//     if (!import.meta.env.DEV) {
//       try {
//         noscript.outerHTML = tag
//       } catch (err) {
//         console.log(err)
//       }
//     }

//     return {
//       html: 
//         ([first, ...rest], ...args) =>
//         html([tag + first, ...rest], ...args)
//     }
//   }



const maybeStyledFromASS =
  () => {
    if ("replaceSync" in CSSStyleSheet.prototype) {
      const stylesheet = new CSSStyleSheet()   
      stylesheet.replaceSync(styles)
      document.adoptedStyleSheets = [ stylesheet ]

      return {
        html: 
          (parts, ...args) =>
          html(parts, ...args).style(stylesheet)
      }
    }
    return maybeStyledFromLink()
  }



export const styled = 
  import.meta.env.EXP_ASS_DISABLE
  ? maybeStyledFromLink()
  : maybeStyledFromASS()



define({
  tag: "the-app",
  views: router([MainHome, MainOther, MainMore]),
  content: ({ views }) => html`

    <header>
      <nav class="flex">
        <a-link
          href=${router.url(MainHome, { stack: true })}
          active=${router.active(MainHome)}
          onclick=${beforeNavigate(historyPush)}>
          Home
        </a-link>
        <a-link
          href=${router.url(MainOther, { stack: true })}
          active=${router.active(MainOther)}
          onclick=${beforeNavigate(historyPush)}>
          Other
        </a-link>
        <a-link
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
