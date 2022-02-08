import { define, router, store, html } from "hybrids"



/* Models */

import { Page } from "./model-page.js"



export default define({
  [router.connect]: { url: "/page/:slug" },
  tag: "page-other",
  page: store(Page, { id: ({ slug }) => slug }),
  slug: "",
  content: ({ page }) => html`
    ${store.ready(page) && html`
      <h1 class="text-xl">${page.title}</h1> 
    `}
  `
})