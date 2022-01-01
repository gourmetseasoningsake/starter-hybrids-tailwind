import env from './env'
import { define, router, html } from "hybrids"



/* Views */

import MainHome from "./views/main-home.js"
import MainOther from "./views/main-other.js"



/* Elements */

import "./elements/a-link.js"



if (env.EXP_HMR) import.meta.hot.accept()
if (env.EXP_ROUTER_DEBUG) router.debug()



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
