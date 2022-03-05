import { JSDOM } from "jsdom"
import puppeteer from "puppeteer"
import { preview } from "vite"



export const domSetup = _ => {
  const dom = (new JSDOM(
    `<!DOCTYPE html><head><noscript id="index-css"></noscript></head>`, 
    { pretendToBeVisual: true }
  ))
  
  globalThis.window = dom.window;
  [ "document", 
    "customElements",
    "HTMLElement",
    "SVGElement",
    "requestAnimationFrame",
    "Node",
    "NodeFilter"
  ].forEach(api => globalThis[api] = dom.window[api])
}



const elementSlotChanges =
  target =>
  Promise.all([...target.querySelectorAll("slot")].map(
    slot =>
    new Promise((res, _) => {
      let to
      const slotName = slot.name || undefined
      const resolve = e => {
        clearTimeout(to)
        slot.removeEventListener("slotchange", resolve)
        res({ 
          slot,
          slotName,
          nodes: slot.assignedNodes(),
          elements: slot.assignedElements(),
          ...e
        })
      }
      slot.addEventListener("slotchange", resolve)
      to = setTimeout(() => {
        slot.removeEventListener("slotchange", resolve)
        return res({ slot, slotName })
      }, 10)
    })
  ))



const elementSet =
  kv =>
  element =>
  ( Object.entries(kv).forEach(([k, v]) => element[k] = v)
  , element
  )



const elementRender = element => element.render()



const elementSnap = 
  async target => 
  ( target.assigned = (await elementSlotChanges(target)).reduce(
      (a, change) =>
      ({ [change.slotName ?? "unnamed"]: change, ...a }),
      {}
    )
  , target
  )



export const elementRenderWith =
  (element, kv) => 
  element
  .map(elementSet(kv))
  .map(elementRender)
  .map(elementSnap)
  [0]



export const elementFromImport =
  path =>
  import(path).then(
    ({ default: component }) =>
    [new (customElements.get(component.tag))()]
  )



const resolveURL =
  ({ address, port }) =>
  `http://${
    ["127.0.0.1", "0.0.0.0", "::", undefined]
    .includes(address) ? "localhost" : address
  }${ port ? `:${port}` : "" }`
  


export const withPage = 
  (t, run) =>
  puppeteer.launch()
  .then(browser => Promise.all([
    browser.newPage(),
    browser,
    preview({ preview: { port: 8080 } })
  ]))
  .then(([page, browser, server]) => Promise.all([
    run(t, page, resolveURL(server.httpServer.address())),
    page,
    browser
  ])
  .then(([_, page, browser]) => {
    page.close()
    browser.close()
  }))