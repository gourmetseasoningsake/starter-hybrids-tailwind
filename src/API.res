open Webapi



let getJsonFrom: string => (. string, Js.Json.t) => Promise.t<Js.Json.t> =
  url =>
  (. input, defaultValue) => {
    open Promise
    Fetch.fetch(~input=url ++ input, ())
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



let getJson: (. string, Js.Json.t) => Promise.t<Js.Json.t> = getJsonFrom(ImportMeta.Env.apiUrl)