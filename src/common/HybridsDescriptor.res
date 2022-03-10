open Webapi
open Hybrids



type viewOptions<'a> = { onChange: (. 'a) => unit }



let combine: Descriptor.d<'a, {..} as 'b> => Descriptor.d<'a, {..}> => Descriptor.d<'a, 'b> =
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



let view: (. {..}, viewOptions<'a>) => Descriptor.d<array<{.."page": 'a}>, {..}> =
  (. modules, options) =>
  Object.values(modules)
  ->Js.Array2.map(m => m["default"])
  ->router
  ->combine(Descriptor.d(
      ~observe=(_host, value, _lastValue) => {
        Store.resolve(value[0]["page"])
        ->Promise.then(page => {
            options.onChange(. page)
            Promise.resolve()
          })
        ->ignore
      }
    ,()))