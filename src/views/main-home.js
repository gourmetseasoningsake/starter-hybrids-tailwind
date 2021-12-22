import { define, router, html } from "hybrids"



export default define({
  [router.connect]: { url: "/" },
  tag: "main-home",
  content: () => html`

    <h1 class="text-xl">Home</h1>

  `
})