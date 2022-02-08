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



/* Config */

if (import.meta.env.EXP_ROUTER_DEBUG) router.debug()
if (import.meta.hot) {
  import.meta.hot.accept(_ => {
    if (import.meta.env.EXP_HMR_FORCE_RELOAD) import.meta.hot.invalidate()
  })
}



/* Parent */

define({
  tag: "the-app",
  menu: store(Menu),
  views: descCombine(router([PageHome, PageOther]), {
    observe:
      (_, val) =>
      store.resolve(val[0].page).then(page => {
        document.title =
          import.meta.env.PROD 
          ? page.title
          : `${(import.meta.env.MODE).toUpperCase()} ${page.title}`.trim()

        //... update lang, links, meta content, etc.
      })
  }),
  content: ({ menu, views }) => html`
    <header>
      <nav class="flex">
        <a-link
          href=${router.url(PageHome)}
          active=${router.active(PageHome, { stack: true })}
          onclick=${beforeNavigate(historyPush)}>
          Home
        </a-link>
        <a-link
          href=${router.url(PageOther, { slug: "other1" })}
          active=${router.active(PageOther, { stack: true }) && views[0].slug === "other1"}
          onclick=${beforeNavigate(historyPush)}>
          Other1
        </a-link>
        <a-link
          href=${router.url(PageOther, { slug: "other2" })}
          active=${router.active(PageOther, { stack: true }) && views[0].slug === "other2"}
          onclick=${beforeNavigate(historyPush)}>
          Other2
        </a-link>
      </nav>
    </header>

    <main>${views}</main>
  `
})


/* Helpers */

function descCombine (da, db) {
  return Object.keys(db).reduce(
    (a, b) =>
    ({
      ...a, 
      [b]: (...args) => (
        db[b](...args)
      , da[b] && da[b](...args)
      )
    }),
    da
  )
}
