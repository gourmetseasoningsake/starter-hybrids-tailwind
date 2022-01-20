import test from "ava"
import { 
  domSetup,
  elementFromImport,
  elementRenderWith
} from '../../ava/helper.js'



test.before(domSetup)



test.serial("should insert text nodes into unnamed slot", async t => {
  // s
  const element = await elementFromImport("../src/elements/a-link.js")
  const value = "Home?"

  // e
  const result = await elementRenderWith(element, {
    textContent: value
  })

  // v
  t.is(result.slots[0].nodes[0].textContent, value)
})