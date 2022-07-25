import { define, html, router } from "hybrids"



export default define({
  [router.connect]: { url: "/next" },
  tag: "page-next",
  content: () => html`
    <h1>what next?</h1>
  `,
})