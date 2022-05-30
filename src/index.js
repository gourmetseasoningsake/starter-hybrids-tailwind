import "./index.css"
import { define, router, html, store } from "hybrids"
import { view } from "./common/HybridsDescriptor.bs.js"



/* Models */

import { Menu } from "./models/Menu.js"



/* Components */

import "./components/the-nav.js"



/* Views */

const pages = import.meta.globEager('./views/page-*.js')



/* Config */

if (import.meta.env.EXP_ROUTER_DEBUG) router.debug()
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    if (import.meta.env.EXP_HMR_FORCE_RELOAD) {
      import.meta.hot.invalidate()
    }
  })
}



define({
  tag: "the-app",
  class: "block flex min-h-screen p-8",
  menu: store(Menu, { id: () => 1 }),
  view: view(pages, { onChange: (host, page) => {
    host.menuActive = false

    document.title =
      !(import.meta.env.MODE === "production")
      ? `${(import.meta.env.MODE).toUpperCase()} ${page.title}`.trim()
      : page.title

    // adjust other head content here...
  }}),
  menuActive: false,
  content: ({ menu, view, menuActive }) => html`
    <header class="fixed w-full h-full top-0 bg-system-bg pt-24 pb-16 overflow-auto overscroll-none scroll-smooth scrollbar-hidden md:py-16 px-8 md:self-start md:sticky md:w-1/4 md:top-9 md:flex md:justify-end${menuActive ? " left-0" : " -left-full"}">
      ${store.ready(menu) && html`
        <the-nav
          class="block min-h-scroll md:min-h-0 md:text-right" 
          menu=${menu.items}
          pages=${pages}
          currentUrl=${router.currentUrl()}>
        </the-nav>
      `}
    </header>

    <main class="w-full md:w-3/4 py-16 md:pl-8">
      <div class="md:max-w-xl">${view}</div>
    </main>

    <button class="fixed top-0 left-0 w-12 h-12 p-2 md:hidden${menuActive ? " opacity-50" : " opacity-100"}" onclick=${host => host.menuActive = !host.menuActive}>
      <div class="h-full text-system-fg text-lg">\\\\</div>
    </button>
  `
})