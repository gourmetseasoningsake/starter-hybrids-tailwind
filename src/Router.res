type host = Dom.element



@module("hybrids")
@scope("router")
external resolve
: (Dom.event, Promise.t<'a>) => Promise.t<'a> = "resolve"



let beforeNavigate: ((. host, Dom.event) => Promise.t<'a>) => (. host, Dom.event) => Promise.t<'a> =
  fn =>
  (. host, e) =>
  resolve(e, fn(. host, e))