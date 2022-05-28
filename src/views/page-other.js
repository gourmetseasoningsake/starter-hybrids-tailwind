import { define, router, store, html } from "hybrids"



/* Models */

import { Page, contentFrom } from "./Page.js"



export default define({
  [router.connect]: { url: "/page/:slug" },
  tag: "page-other",
  page: store(Page, { id: ({ slug }) => slug }),
  slug: "",
  content: ({ page }) => html`
    ${store.ready(page) && html`
      <h1 class="font-extrabold uppercase text-6xl leading-none mb-8">${page.title}</h1>
      ${page.contents && page.contents.map(contentFrom)}
    `}
  `
})