import { router, html } from "hybrids"
import { styled } from "../common/Styled.bs.js"
import { historyPush, beforeNavigate } from "../common/Navigation.bs.js"



/* Elements */

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
    <ul class="flex">
      ${menu.map(({ href, active, text }) => html`
        <li>
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



/* Helpers */

function omitProp (o, k) {
  const { [k]: _, ...rest } = o
  return rest
}