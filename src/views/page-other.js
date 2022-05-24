import { define, router, store, html } from "hybrids"



/* Models */

import { Page } from "./Page.js"



export default define({
  [router.connect]: { url: "/page/:slug" },
  tag: "page-other",
  page: store(Page, { id: ({ slug }) => slug }),
  slug: "",
  content: ({ page }) => html`
    ${store.ready(page) && html`
      <h1>${page.title}</h1> 
    `}
  `
})