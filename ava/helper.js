import { JSDOM } from "jsdom"



export const domSetup = () => {
  const window = (new JSDOM(
    `<!DOCTYPE html><html><head><noscript id="index-css"></noscript></head></html>`, 
    { pretendToBeVisual: true }
  )).window

  globalThis.window = window;
  [ "document", 
    "customElements",
    "HTMLElement",
    "SVGElement",
    "requestAnimationFrame",
    "Node",
    "NodeFilter"
  ].forEach(api => globalThis[api] = window[api])
}



const elmentPromiseSlotChanges =
  slots =>
  Promise.all(slots.map(
    slot =>
    new Promise((res, _) => {
      const resolve = () => {
        slot.removeEventListener("slotchange", resolve)
        res({ 
          slot,
          name: slot.name,
          nodes: slot.assignedNodes(),
          elements: slot.assignedElements()
        })
      }
      slot.addEventListener("slotchange", resolve)
      setTimeout(() => {
        slot.removeEventListener("slotchange", resolve)
        return res({ slot, name: slot.name })
      }, 10)
    })
  ))



const elementApplyValues =
  kv =>
  element =>
  (Object.entries(kv).forEach(([k, v]) => element[k] = v), element)



const elementRender = element => element.render()



export const elementRenderWith =
  (element, kv) => 
  element
  .map(elementApplyValues(kv))
  .map(elementRender)
  .map(async target => {
    let slots = await elmentPromiseSlotChanges([...target.querySelectorAll("slot")])
    let result = { target, slots }
    slots.forEach(slot => {
      if (slot.name) result[slot.name] = slot
    })
    return result
  })[0]



export const elementFromImport =
  path =>
  import(path).then(
    ({ default: component }) =>
    [new (customElements.get(component.tag))()]
  )