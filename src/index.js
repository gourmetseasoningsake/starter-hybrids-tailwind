import "./index.css"
import { define, router, html, store } from "hybrids"
import { historyPush, beforeNavigate } from "./Navigation.bs.js"



/* Models */

import { Menu } from "./views/model-page.js"



/* Views */

const Pages = import.meta.globEager('./views/page-*.js')



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
  menu: store([Menu], { id: () => true }),
  views: descCombine(router(Object.values(Pages).map(o => o.default)), {
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
        ${store.ready(menu) && menu.map(item => html`
          <a-link
            href=${router.url(getView(Pages, item.view), (item.params.slug ? item.params : {}))}
            active=${router.active(getView(Pages, item.view), { stack: true }) && (item.params.slug ? item.params.slug === views[0].slug : true)}
            onclick=${beforeNavigate(historyPush)}>
            ${item.text}
          </a-link>
        `)}
      </nav>
    </header>

    <main>${views}</main>
  `
})



/* Helpers */

function getView (o, basename) {
  return o[`./views/${basename}.js`].default
}


function descCombine (oa, ob) {
  return Object.keys(ob).reduce(
    (a, k) =>
    ({
      ...a, 
      [k]: (...args) => (
        ob[k](...args)
      , oa[k] && oa[k](...args)
      )
    }),
    oa
  )
}
