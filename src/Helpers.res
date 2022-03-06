open Webapi



let descriptorCombine: Hybrids.Descriptor.d<'a, {..} as 'b> => {..} => Hybrids.Descriptor.d<'a, 'b> =
  oa =>
  ob =>
  Object.keys(ob)
  ->Js.Array2.reduce(%raw(`
    (a, k) =>
    ({
      ...a, 
      [k]: (...args) => (
        ob[k](...args)
      , oa[k] && oa[k](...args)
      )
    })`),
    oa
  )



let descriptorCombineWithRouter: {..} => {..} => Hybrids.Descriptor.d<'a, {..}> =
  modules =>
  ob =>
  Object.values(modules)
  ->Js.Array2.map(m => m["default"])
  ->Hybrids.router
  ->descriptorCombine(ob)