import { define } from "hybrids"
import { styled } from "../utils.js"



export default define({
  tag: "a-link",
  href: "",
  active: false,
  render: ({ href, active }) => styled.html`
  
    <a
      href=${href}
      class=${{
        "text-green-400": true,
        "underline": active
      }}>
      <slot></slot>
    </a>

  `
})