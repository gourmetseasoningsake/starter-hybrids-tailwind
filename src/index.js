import "./index.css"
import { define, router, html } from "hybrids"



import PageHome from "./pages/home.js"



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
  class: "contents",
  view: router([PageHome]),
  content: ({ view }) => html`
    ${view}
  `
})