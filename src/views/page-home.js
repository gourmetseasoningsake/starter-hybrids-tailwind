import { define, router, store, html } from "hybrids"



/* Models */

import { Page } from "./Page.js"



export default define({
  [router.connect]: { url: "/" },
  tag: "page-home",
  page: store(Page, { id: ({ id }) => id }),
  id: "home",
  content: ({ page }) => html`
    ${store.ready(page) && html`
      <h1>${page.title}</h1> 
    `}
  `
})