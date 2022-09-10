import { html, define } from "hybrids"



export default define({
  tag: "a-link",
  href: "",
  title: "",
  active: false,
  render: ({ href, title, active }) => html`
  
    <a
      class=${{ "underline": active }}
      href=${href}
      title=${title}
      aria-current=${active && "page"}>
      <slot></slot>
    </a>

  `
})