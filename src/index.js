import { define, router, html } from "hybrids"



/* Views */

import MainHome from "./views/main-home.js"
import MainOther from "./views/main-other.js"



/* Elements */

import "./elements/a-link.js"



if (import.meta.env.MODE === "development") router.debug()



/* NB: this is just a placeholder fn for an animation */
const gsapVomit = (_host, _e) => new Promise(res => setTimeout(res, 2000))



define({
  tag: "the-app",
  views: router([MainHome, MainOther]),
  content: ({ views }) => html`

    <header>
      <nav>
        <a-link
          class="inline-block"
          href=${router.url(MainHome)}
          active=${router.active(MainHome, { stack: true })}
          onclick=${beforeNav(gsapVomit)}>
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



export const styled = (
  tag =>
  tag ? {
    html: 
      ([first, ...rest], ...args) =>
      html([tag + first, ...rest], ...args)
  }
  : { html }
)(document.styleSheets[0]?.ownerNode?.outerHTML)



export const beforeNav = 
  fn =>
  (host, e) =>
  router.resolve(e, fn(host, e))
