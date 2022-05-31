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



const componentSlotChanges =
  slots =>
  Promise.all(slots.map(
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



const componentSetPropsFn =
  props =>
  props
  ? component => {
      Object.entries(props).forEach(([k, v]) => component[k] = v)
      return component
    }
  : x => x



const componentRender = 
  component =>
  component.content
  ? component.content()
  : component.render()



const componentSnapSlotsFn =
  component =>
  component.content
  ? x => x
  : async target => {
      const slots = target.querySelectorAll("slot")
      if (slots) {
        target.assigned = (await componentSlotChanges([...slots])).reduce(
          (a, change) =>
          ({ [change.slotName ?? "unnamed"]: change, ...a }),
          {}
        )
      }
      return target    
    }



export const componentCharge =
  ({ component, props }) =>
  component
  .map(componentSetPropsFn(props))
  .map(componentRender)
  .map(componentSnapSlotsFn(component))
  [0]



export const componentFromImport =
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