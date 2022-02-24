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



let getJsonOr: (. string, Js.Json.t) => Promise.t<Js.Json.t> =
  (. url, defaultValue) => {
    open Promise
    Fetch.fetch(~input=url, ())
    ->then(Response.json)
    ->then(data => switch Js.Nullable.toOption(data) {
        | Some(data) => data
        | None => defaultValue
        }->resolve
      )
    ->catch(e => {
      let msg = switch e {
      | JsError(err) =>
        switch Js.Exn.message(err) {
        | Some(msg) => msg
        | None => ""
        }
      | _ => "unknown error"
      }
      Js.log(msg)
      defaultValue->resolve
    })
  }