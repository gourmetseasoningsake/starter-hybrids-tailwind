import "./index.css"
import { define, router, html, store } from "hybrids"



import PageHome from "./pages/home.js"
import PageNext from "./pages/next.js"



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
  class: "block",
  // view: view(pages, { onChange: (host, page) => {
  //   host.menuActive = false

  //   document.title =
  //     !(import.meta.env.MODE === "production")
  //     ? `${(import.meta.env.MODE).toUpperCase()} ${page.title}`.trim()
  //     : page.title

  //   // adjust other head content here...
  // }}),
  view: router([PageHome, PageNext]),
  content: ({ view }) => html`
    ${view}
  `
})