import { define, router, store, html } from "hybrids"



/* Models */

import { Page, contentFrom } from "../models/Page.js"



export default define({
  [router.connect]: { url: "/" },
  tag: "page-home",
  page: store(Page, { id: ({ id }) => id }),
  id: "home",
  content: ({ page }) => html`
    ${store.ready(page) && html`
      <h1 class="font-extrabold uppercase text-6xl leading-none mb-8">${page.title}</h1>
      ${page.contents && page.contents.map(contentFrom)}
    `}
  `
})



/* Config */

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    if (import.meta.env.EXP_HMR_FORCE_RELOAD) {
      import.meta.hot.invalidate()
    }
  })
}