open Webapi



let unsafeProp: Js.Dict.t<'a> => string => 'a =
  kv =>
  k =>
  Js.Dict.unsafeGet(kv, k)




let descCombine: Hybrids.Descriptor.d<'a, {..}> => ({..} => Hybrids.Descriptor.d<'a, {..}>) =
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



let descCombineWithRouter: {..} => ({..} => Hybrids.Descriptor.d<'a, {..}>) =
  modules =>
  ob =>
  Object.values(modules)
  ->Js.Array2.map(m => m["default"])
  ->Hybrids.router
  ->descCombine(ob)
