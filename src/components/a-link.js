import { define } from "hybrids"
import { styled } from "../common/Styled.bs.js"



export default define({
  tag: "a-link",
  href: "",
  title: "",
  active: false,
  render: ({ href, title, active }) => styled.html`
  
    <a
      class="inline-block font-light leading-tight${active ? " opacity-100" : " opacity-50"}"
      href=${href}
      title=${title}
      aria-current=${active && "page"}>
      <slot></slot>
    </a>

  `
})



/* Config */

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    if (import.meta.env.EXP_HMR_FORCE_RELOAD) {
      import.meta.hot.invalidate()
    }
  })
}