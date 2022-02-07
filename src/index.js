import "./index.css"
import { define, router, html, store } from "hybrids"
import { historyPush, beforeNavigate } from "./Navigation.bs.js"



/* Models */

import { Menu } from "./views/model-page.js"



/* Views */

import PageHome from "./views/page-home.js"
import PageOther from "./views/page-other.js"



/* Elements */

import "./elements/a-link.js"



define({
  tag: "the-app",
  menu: store(Menu),
  views: router([PageHome, PageOther], { url: "/" }),
  content: ({ menu, views }) => html`
    <header>
      <nav class="flex">
        <a-link
          href=${router.url(PageHome, { stack: true, page: 1 })}
          active=${router.active(PageHome)}
          onclick=${beforeNavigate(historyPush)}>
          Home
        </a-link>
        <a-link
          href=${router.url(PageOther, { stack: true, page: 2, path: "other1" })}
          active=${router.active(PageOther)}
          onclick=${beforeNavigate(historyPush)}>
          Other1
        </a-link>
        <a-link
          href=${router.url(PageOther, { stack: true, page: 3, path: "other2" })}
          active=${router.active(PageOther)}
          onclick=${beforeNavigate(historyPush)}>
          Other2
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
