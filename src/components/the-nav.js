import { router, html } from "hybrids"
import { styled } from "../common/Styled.bs.js"
import { historyPush, beforeNavigate } from "../common/Navigation.bs.js"
import { omitProp } from "../../utils/object.js"



/* Components */

import "./a-link.js"



export const TheNav = {
  tag: "the-nav",
  role: "navigation",
  ariaLabel: "Main",
  pages: undefined,
  currentUrl: {
    get: (_, value = { pathname: undefined }) => value,
    set: (_, value = { pathname: undefined }) => value
  },
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
    <ul>
      ${menu.map(({ href, active, text }) => html`
        <li class="py-1">
          <a-link
            href=${href}
            active=${active}
            onclick=${beforeNavigate(historyPush)}>
            ${text}
          </a-link>
        </li>
      `)}
    </ul>
  `
}