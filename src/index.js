import "./index.css"
import { define, router, html, store } from "hybrids"
import { view } from "./common/HybridsDescriptor.bs.js"
import { getMenu } from "./services/CmsService.bs.js"



/* Components */

import { TheNav } from "./components/the-nav.js"



/* Views */

const pages = import.meta.globEager('./views/page-*.js')

console.log(pages)

/* Models */

const Menu = {
  id: true,
  items: [{
    view: "",
    text: "",
    params: { slug: "" }
  }],
  [store.connect]: { 
    get: id => 
      getMenu(id)
      .then(resp => resp.json())
      .catch(console.log)
  }
}



const TheApp = {
  tag: "the-app",
  menu: store(Menu, { id: () => 1 }),
  view: view(pages, { onChange: page => {
    document.title =
      !(import.meta.env.MODE === "production")
      ? `${(import.meta.env.MODE).toUpperCase()} ${page.title}`.trim()
      : page.title

    // adjust other head content here...
  }}),
  content: ({ menu, view }) => html`
    <header class="flex">
      ${store.ready(menu) && html`
        <the-nav menu=${menu.items} currentUrl=${router.currentUrl()}></the-nav>
      `}
    </header>
    <main>${view}</main>
  `
}



/* Config */

if (import.meta.env.EXP_ROUTER_DEBUG) router.debug()
if (import.meta.hot) {
  import.meta.hot.accept(_ => {
    if (import.meta.env.EXP_HMR_FORCE_RELOAD) import.meta.hot.invalidate()
  })
}



/* Run */

define({ ...TheNav, pages: { get: () => pages }})
define(TheApp)