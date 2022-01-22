import test from "ava"
import { 
  domSetup,
  elementFromImport,
  elementRenderWith
} from '../../ava/helper.js'



test.before(domSetup)



test("should insert a text node into the unnamed slot", async t => {
  // s
  const element = await elementFromImport("../src/elements/a-link.js")
  const value = "Home?"

  // e
  const target = await elementRenderWith(element, {
    textContent: value
  })

  // v
  t.is(target.assigned.unnamed.nodes[0].textContent, value)
})



test("should set the active class name", async t => {
  // s
  const element = await elementFromImport("../src/elements/a-link.js")
  const value = "text-pink-400"

  // e
  const target = await elementRenderWith(element, {
    active: true
  })

  // v
  t.is(target.firstElementChild.className, value)
})