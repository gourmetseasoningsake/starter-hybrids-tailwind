type t



type templateFn = @variadic (. array<string>, array<t>) => string



@module("hybrids")
@variadic
external html
: templateFn = "html"



module Router = {
  @module("hybrids")
  @scope("router")
  external resolve
  : (Dom.event, Promise.t<'a>) => Promise.t<'a> = "resolve"
}