open Webapi
open Hybrids



let beforeNavigate: ((. Dom.element, Dom.event) => Promise.t<'a>) => (. Dom.element, Dom.event) => Promise.t<'a> =
  fn =>
  (. host, e) =>
  Router.resolve(e, fn(. host, e))



let historyPush: unit => Promise.t<'a> =
  () =>
  History.pushState(History.history, History.state(History.history), "")
  ->Promise.resolve