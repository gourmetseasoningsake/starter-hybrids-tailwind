/*
Resources:
https://dev.to/ryyppy/tagged-unions-and-rescript-variants-5e4d
https://forum.rescript-lang.org/t/how-to-type-object-with-unknown-properties/1316
https://forum.rescript-lang.org/t/bs-deriving-bs-optional-removed/269/4
https://rescript-lang.org/docs/manual/latest/generate-converters-accessors#convert-external-into-js-object-creation-function

NB: You probably need to wait for this:
https://forum.rescript-lang.org/t/binding-to-tagged-template-function/1093
*/

type templateKeys
type taggedFn = @variadic (. array<string>, array<templateKeys>) => string



module Descriptor = {
  type t<'a> = 'a
  type host<'b> = {..} as 'b

  @deriving(abstract)
  type d<'a, 'b> = {
    @optional value: t<'a>,
    @optional get: (host<'b>, t<'a>) => t<'a>,
    @optional set: (host<'b>, t<'a>, t<'a>) => unit,
    @optional connect: (host<'b>, string) => unit,
    @optional observe: (host<'b>, t<'a>, t<'a>) => unit
  }
}



@module("hybrids")
@variadic
external html
: taggedFn = "html"



@module("hybrids")
external router
: array<{..}> => Descriptor.d<'a, {..}> = "router"



module Router = {
  @module("hybrids")
  @scope("router")
  external resolve
  : (Dom.event, Promise.t<'a>) => Promise.t<'a> = "resolve"
}



module Store = {
  @module("hybrids")
  @scope("store")
  external resolve
  : 'a => Promise.t<'a> = "resolve"

  // @module("hybrids")
  // @scope("store")
  // external connect
  // : Js.Types.symbol = "connect"
}