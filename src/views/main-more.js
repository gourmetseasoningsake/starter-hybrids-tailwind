import { define, router, html } from "hybrids"



export default define({
  [router.connect]: { url: "/more" },
  tag: "main-more",
  content: () => html`

    <h1 class="text-xl">More</h1>

  `
})