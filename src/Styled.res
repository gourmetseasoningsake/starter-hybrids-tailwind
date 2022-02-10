type styled = {
  html: Hybrids.taggedFn
}



@module("./index.css?inline")
external styles
: string = "default"



open Webapi



let tryStylesFromLink: unit => styled =
  () =>
  switch Document.querySelector("noscript#index-css") {
  | Some(nos) =>
    switch Element.textContent(nos) {
    | Some(tag) =>
      if !ImportMeta.Env.dev {
        try {
          Element.outerHTML(nos, tag)
        } catch {
        | Js.Exn.Error(obj) =>
          switch Js.Exn.message(obj) {
          | Some(m) => Js.log(m)
          | None => Js.log("unknown error")
          }
        }
      }
      %raw(`
        ([first, ...rest], ...args) =>
        Hybrids.html([tag + first, ...rest], ...args)
      `)
    | None => Hybrids.html
    }
  | None => Hybrids.html
  }
  ->fn => { html: fn }




let tryStylesFromAss: unit => styled =
  () =>
  switch Reflect.has(CSSStyleSheet.prototype, "replaceSync") {
  | true => {
    let stylesheet = CSSStyleSheet.make()
    CSSStyleSheet.replaceSync(stylesheet, styles)
    Document.adoptedStyleSheets(Document.document, [ stylesheet ])
    { html: %raw(`
      (parts, ...args) =>
      Hybrids.html(parts, ...args).style(stylesheet)
    `) }
  }
  | _ => tryStylesFromLink()
  }



let styled: styled =
  switch ImportMeta.Env.assDisable {
  | Some(s) => s != ""
  | None => false
  }
  -> disable => if disable {
    tryStylesFromLink()
  } else {
    tryStylesFromAss()
  }