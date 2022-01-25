type templateFn<'a> = @variadic (. array<string>, array<'a>) => string

type styled<'a> = {
  html: templateFn<'a>
}





@module("hybrids")
@variadic
external html
: templateFn<'a> = "html"

@val 
@return(nullable)
external querySelector
: string => option<Dom.element> = "document.querySelector"

@get 
@return(nullable)
external textContent
: Dom.element => option<string> = "textContent"

@set
external outerHTML
: Dom.element => string => unit = "outerHTML"

@val 
external importMetaEnvDEV
: bool = "import.meta.env.DEV"



let maybeStyledFromLink: unit => styled<'a> =
  () =>
  switch querySelector("noscript#index-css") {
  | Some(nos) =>
    switch textContent(nos) {
    | Some(tag) =>
      switch importMetaEnvDEV {
      | false =>
        try {
          outerHTML(nos, tag)
        } catch {
        | Js.Exn.Error(obj) =>
          switch Js.Exn.message(obj) {
          | Some(m) => Js.log(m)
          | None => Js.log("unknown err")
          }
        }
      | _ => ()
      }
      (. parts, args) => {
        let first = parts[0]
        let rest = Js.Array.sliceFrom(1, parts)
        let newParts = Js.Array2.concat([tag ++ first], rest)
        html(. newParts, args)
      }
    | None => html
    }
  | None => html
  }
  ->fn => { html: fn }



// const maybeStyledFromASS =
// ...



// export const styled = 
// ...