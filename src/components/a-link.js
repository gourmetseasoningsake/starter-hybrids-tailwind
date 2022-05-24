import { define } from "hybrids"
import { styled } from "../common/Styled.bs.js"



export default define({
  tag: "a-link",
  href: "",
  active: false,
  render: ({ href, active }) => styled.html`
  
    <a
      href=${href}
      aria-current=${active && "page"}>
      <slot></slot>
    </a>

  `
})