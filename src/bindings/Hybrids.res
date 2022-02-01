/*
Resources:
https://dev.to/ryyppy/tagged-unions-and-rescript-variants-5e4d
https://forum.rescript-lang.org/t/how-to-type-object-with-unknown-properties/1316
https://forum.rescript-lang.org/t/bs-deriving-bs-optional-removed/269/4
https://rescript-lang.org/docs/manual/latest/generate-converters-accessors#convert-external-into-js-object-creation-function

NB: You probably need to wait for this:
https://forum.rescript-lang.org/t/binding-to-tagged-template-function/1093
*/



type t



type tagFn = @variadic (. array<string>, array<t>) => string



@module("hybrids")
@variadic
external html
: tagFn = "html"



module Router = {
  @module("hybrids")
  @scope("router")
  external resolve
  : (Dom.event, Promise.t<'a>) => Promise.t<'a> = "resolve"
}