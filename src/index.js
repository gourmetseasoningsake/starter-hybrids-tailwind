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

    <footer></footer>
    
  `
})



export const styled = (
  href =>
  href ? {
    html: (parts, ...args) => html(
      [
        '<link rel="stylesheet" type="text/css" href="',
        '" />' + parts[0],
        ...(parts.slice(1))
      ],
      href, ...args
    )
  } : { html }
)(document.styleSheets[0]?.href)