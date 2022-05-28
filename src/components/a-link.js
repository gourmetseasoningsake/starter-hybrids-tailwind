import { define } from "hybrids"
import { styled } from "../common/Styled.bs.js"



export default define({
  tag: "a-link",
  href: "",
  active: false,
  render: ({ href, active }) => styled.html`
  
    <a
      class="inline-block font-light leading-tight${active ? " opacity-100" : " opacity-50"}"
      href=${href}
      aria-current=${active && "page"}>
      <slot></slot>
    </a>

  `
})