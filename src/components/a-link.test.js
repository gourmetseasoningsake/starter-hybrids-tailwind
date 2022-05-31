import test from "ava"
import { 
  domSetup,
  componentFromImport,
  componentCharge
} from "../../ava/helpers.js"



test.before(domSetup)



test("a-link: should insert a text node into the unnamed slot", async t => {
  // s
  const component = await componentFromImport("../src/components/a-link.js")
  const value = "Home?"

  // e
  const target = await componentCharge({ 
    component,
    props: {
      textContent: value
    }
  })

  // v
  t.is(target.assigned.unnamed.nodes[0].textContent, value)
})



// test("a-link: should set the active class name", async t => {
//   // s
//   const component = await componentFromImport("../src/components/a-link.js")
//   const value = "text-pink-400"

//   // e
//   const target = await componentRenderWith(component, {
//     active: true
//   })

//   // v
//   t.is(target.firstElementChild.className, value)
// })