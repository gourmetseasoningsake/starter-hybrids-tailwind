import { define, router, html } from "hybrids"



export default define({
  [router.connect]: { url: "/other" },
  tag: "main-other",
  content: () => html`

    <h1 class="text-xl">Other</h1>

  `
})