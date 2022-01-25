@module("hybrids")
@scope("router")
external resolve
: (Dom.event, Promise.t<'a>) => Promise.t<'a> = "resolve"

@get 
external getState
: Dom.history => 'a = "state"

@send 
external pushState
: (Dom.history, 'a, string) => 'a = "pushState"

@val 
external history
: Dom.history = "history" 



let beforeNavigate: ((. Dom.element, Dom.event) => Promise.t<'a>) => (. Dom.element, Dom.event) => Promise.t<'a> =
  fn =>
  (. host, e) =>
  resolve(e, fn(. host, e))



let historyPush: unit => Promise.t<'a> =
  () =>
  pushState(history, getState(history), "")
  ->Promise.resolve