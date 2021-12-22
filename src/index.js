import { define, router, html } from "hybrids"



/* Main */

import MainHome from "./views/main-home.js"
import MainOther from "./views/main-other.js"



/* Elements */

import ALink from "./elements/a-link.js"



if (import.meta.env.MODE === "development") router.debug()



define({
  tag: "the-app",
  views: router([MainHome, MainOther]),
  content: ({ views }) => html`

    <header>
      <nav>
        <a-link 
          href=${router.url(MainHome)}
          active=${router.active(MainHome, { stack: true })}
          text="Home">
        </a-link>
        <a-link 
          href=${router.url(MainOther)}
          active=${router.active(MainOther, { stack: true })}
          text="Other">
        </a-link>
      </nav>
    </header>

    <main>${views}</main>

    <footer></footer>
    
  `
}, ALink)