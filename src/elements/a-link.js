import { define, html } from "hybrids"



export default define({
  tag: "a-link",
  href: "",
  active: false,
  text: "",
  content: ({ href, active, text }) => html`

    <a href=${href} class=${{ underline: active }}>${text}</a>

  `
})