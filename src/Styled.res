type styled = {
  html: Hybrids.templateFn
}



@module("./index.css?inline")
external styles
: string = "default"



open Webapi



let maybeStyledFromLink: unit => styled =
  () =>
  switch Document.querySelector("noscript#index-css") {
  | Some(nos) =>
    switch Element.textContent(nos) {
    | Some(tag) =>
      switch ImportMeta.Env.dev {
      | false =>
        try {
          Element.outerHTML(nos, tag)
        } catch {
        | Js.Exn.Error(obj) =>
          switch Js.Exn.message(obj) {
          | Some(m) => Js.log(m)
          | None => Js.log("unknown err")
          }
        }
      | _ => ()
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




let maybeStyledFromASS: unit => styled =
  () =>
  switch Reflect.has(CSSStyleSheet.prototype, "replaceSync") {
  | true => {
    let stylesheet = CSSStyleSheet.make()
    CSSStyleSheet.replaceSync(stylesheet, styles)
    Document.adoptedStyleSheets(Document.document, [ stylesheet ])
    let fn = %raw(`
      (parts, ...args) =>
      Hybrids.html(parts, ...args).style(stylesheet)
    `)
    { html: fn }
  }
  | _ => maybeStyledFromLink()
  }



let styled: styled =
  switch ImportMeta.Env.assDisable {
  | Some(s) => s != ""
  | None => false
  }
  -> disable => switch disable {
  | true => maybeStyledFromLink()
  | false => maybeStyledFromASS()
  }