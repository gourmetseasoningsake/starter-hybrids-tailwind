module ImportMeta = {
  module Env = {
    @val
    external dev
    : bool = "import.meta.env.DEV"
    
    @val 
    external assDisable
    : option<string> = "import.meta.env.EXP_ASS_DISABLE"
  }
}



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
