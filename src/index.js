import "./index.css"
import { define, router, html, store } from "hybrids"
import { getJsonOr, descriptorCombineWithRouter } from "./Helpers.bs.js"



/* Elements */

import { TheNav } from "./elements/the-nav.js"



/* Views */

const pages = import.meta.globEager('./views/page-*.js')



/* Models */

const Menu = {
  id: true,
  items: [{
    view: "",
    text: "",
    params: { slug: "" }
  }],
  [store.connect]: {
    get: id => getJsonOr(`http://localhost:3001/menu/${id}`, {})
  }
}



/* Config */

if (import.meta.env.EXP_ROUTER_DEBUG) router.debug()
if (import.meta.hot) {
  import.meta.hot.accept(_ => {
    if (import.meta.env.EXP_HMR_FORCE_RELOAD) import.meta.hot.invalidate()
  })
}



define({ ...TheNav, pages: { get: () => pages }})
define({
  tag: "the-app",
  menu: store(Menu, { id: () => 1 }),
  view: descriptorCombineWithRouter(pages, {
    observe: (_, value) => store.resolve(value[0].page).then(page => {
      document.title =
        !(import.meta.env.MODE === "production")
        ? `${(import.meta.env.MODE).toUpperCase()} ${page.title}`.trim()
        : page.title

      //... update lang, links, meta content, etc.
    })
  }),
  content: ({ menu, view }) => html`
    <header class="flex">
      ${store.ready(menu) && html`
        <the-nav menu=${menu.items} currentUrl=${router.currentUrl()}></the-nav>
      `}
    </header>
    <main>${view}</main>
  `
})