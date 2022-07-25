import { define, html, router } from "hybrids"



export default define({
  [router.connect]: { url: "/" },
  tag: "page-home",
  content: () => html`
    <h1>hybrids + tailwind</h1>
  `,
})