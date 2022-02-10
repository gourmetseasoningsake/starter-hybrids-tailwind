import "./index.css"
import { define, router, html, store } from "hybrids"
import { historyPush, beforeNavigate } from "./Navigation.bs.js"
import { descCombineWithRouter } from "./Helpers.bs.js"



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
  views: descCombineWithRouter(Pages, {
    observe: (_, val) =>
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
        ${store.ready(menu) && menu.map(item => {
          const viewFromModules = getView(Pages, item.view)
          const paramsFromItem = getPropOr(item, "params", {})
          return html`
            <a-link
              href=${router.url(viewFromModules, paramsFromItem.slug ? paramsFromItem : {})}
              active=${
                router.active(viewFromModules, { stack: true }) &&
                isNotInactiveMultiView(paramsFromItem, views)
              }
              onclick=${beforeNavigate(historyPush)}>
              ${item.text}
            </a-link>
          `
        })}
      </nav>
    </header>

    <main>${views}</main>
  `
})



/* Helpers */

function getView (modules, basename) {
  return modules[`./views/${basename}.js`].default
}


function getPropOr (o, k, dv) {
  return o[k] || dv
}


function isNotInactiveMultiView (params, views) {
  return params?.slug ? params.slug === views[0]?.slug : true
}
