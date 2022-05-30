import { define, router, html } from "hybrids"
import { styled } from "../common/Styled.bs.js"
import { historyPush, beforeNavigate } from "../common/Navigation.bs.js"
import { omitProp } from "../../utils/object.js"



/* Components */

import "./a-link.js"



export default define({
  tag: "the-nav",
  role: "navigation",
  ariaLabel: "Main",
  pages: undefined,
  currentUrl: undefined,
  menu: {
    get: (host, value = []) => value.map(item => {
      const url = router.url(
        host.pages[`./views/${item.view}.js`]?.default,
        item.params.slug !== "" ? item.params : omitProp(item.params, "slug")
      )
      return {
        ...item,
        href: url,
        active: host.currentUrl.pathname === url.pathname 
      }
    }),
    set: (_, value = []) => value
  },
  render: ({ menu }) => styled.html`
    <ul class="sticky top-0">
      ${menu.map(({ href, title, active, text }) => html`
        <li class="py-1">
          <a-link
            href=${href}
            title=${title}
            active=${active}
            onclick=${beforeNavigate(historyPush)}>
            ${text}
          </a-link>
        </li>
      `)}
    </ul>
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