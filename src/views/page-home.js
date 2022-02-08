import { define, router, store, html } from "hybrids"



/* Models */

import { Page } from "./model-page.js"



export default define({
  [router.connect]: { url: "/" },
  tag: "page-home",
  page: store(Page, { id: ({ slug }) => slug }),
  slug: "home",
  content: ({ page }) => html`
    ${store.ready(page) && html`
      <h1 class="text-xl">${page.title}</h1> 
    `}
  `
})