@val
external importmeta: {..} = "import.meta"



module History = {
  type t = Dom.history

  @val 
  external history
  : t = "history" 

  @get 
  external state
  : t => 'a = "state"

  @send 
  external pushState
  : (t, 'a, string) => 'a = "pushState"
}



module Document = {
  type t = Dom.document

  @val
  external document
  : t = "document"

  @scope("document")
  @val
  @return(nullable)
  external querySelector
  : string => option<Dom.element> = "querySelector"

  @set
  external adoptedStyleSheets
  : t => array<Dom.cssStyleSheet> => unit = "adoptedStyleSheets"
}



module CSSStyleSheet = {
  type t = Dom.cssStyleSheet

  @new
  external make
  : unit => t = "CSSStyleSheet"

  @scope("CSSStyleSheet")
  @val
  external prototype
  : {..} = "prototype"

  @send
  external replaceSync
  : t => string => unit = "replaceSync"
}



module Reflect = {
  @scope("Reflect")
  @val
  external has
  : {..} => string => bool = "has"
}



module Element = {
  type t = Dom.element

  @get 
  @return(nullable)
  external textContent
  : t => option<string> = "textContent"

  @set
  external outerHTML
  : t => string => unit = "outerHTML"
}



module Object = {
  @scope("Object")
  @val
  external values
  : {..} => array<{..}> = "values"

  @scope("Object")
  @val
  external keys
  : 'a => array<string> = "keys"
}



module Response = {
  type t

  @send 
  external text
  : t => string = "text"

  @send 
  external json
  : t => Js.Json.t = "json"
}



module Fetch = {
  @deriving({abstract: light})
  type init = {
    @optional method: string,
    @optional mode: string,
    @optional cache: string,
    @optional credentials: string,
    @optional headers: {.},
    @optional redirect: string,
    @optional referrerPolicy: string,
    @optional body: Js.Nullable.t<string>
  }

  @val
  external fetch
  : (~input: string, ~init: init=?, unit) => Promise.t<Response.t> = "fetch"
}