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



const promiseSlotChanges =
  target =>
  Promise.all([...target.querySelectorAll("slot")].map(
    slot =>
    new Promise((res, _) => {
      const resolve = () => {
        slot.removeEventListener("slotchange", resolve)
        res({ 
          $: slot,
          name: slot.name,
          nodes: slot.assignedNodes(),
          elements: slot.assignedElements()
        })
      }
      slot.addEventListener("slotchange", resolve)
      setTimeout(() => {
        slot.removeEventListener("slotchange", resolve)
        return res({ $: slot, name: slot.name })
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
    let slots = await promiseSlotChanges(target)
    let result = { target }
    result.slot = slots.filter(slot => {
      if (!slot.name) return true
      result[slot.name] = slot
      return false
    })[0]
    return result
  })[0]



export const elementFromImport =
  path =>
  import(path).then(
    ({ default: component }) =>
    [new (customElements.get(component.tag))()]
  )