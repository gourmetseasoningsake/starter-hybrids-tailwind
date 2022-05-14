open Belt
open Webapi



@deriving({abstract: light})
type init = {
  baseUrl: string,
  @optional method: string,
  @optional mode: string,
  @optional cache: string,
  @optional credentials: string,
  @optional headers: {.},
  @optional redirect: string,
  @optional referrerPolicy: string,
  @optional body: Js.Nullable.t<string>
}



let service = 
  (serviceOptions: init) => {
    let method_ = method(serviceOptions)->Option.getWithDefault("GET")
    let mode_ = mode(serviceOptions)->Option.getWithDefault("cors")
    let cache_ = mode(serviceOptions)->Option.getWithDefault("default")
    let credentials_ = credentials(serviceOptions)->Option.getWithDefault("same-origin")
    let headers_ = headers(serviceOptions)->Option.getWithDefault(Js.Obj.empty())
    let redirect_ = redirect(serviceOptions)->Option.getWithDefault("follow")
    let referrerPolicy_ = referrerPolicy(serviceOptions)->Option.getWithDefault("no-referrer-when-downgrade")
    let body_ = body(serviceOptions)->Option.getWithDefault(Js.Nullable.null)

    let options_: Fetch.init = Fetch.init(
      ~method=method_,
      ~mode=mode_,
      ~cache=cache_,
      ~credentials=credentials_,
      ~headers=headers_,
      ~redirect=redirect_,
      ~referrerPolicy=referrerPolicy_,
      ~body=body_,
    ())

    (~input: string, ~fetchOptions: option<Fetch.init> = ?, ()) => {
      let options: Fetch.init = switch fetchOptions {
      | Some(o) => 
        Fetch.init(
          ~method=Fetch.method(o)->Option.getWithDefault(method_),
          ~mode=Fetch.mode(o)->Option.getWithDefault(mode_),
          ~cache=Fetch.cache(o)->Option.getWithDefault(cache_),
          ~credentials=Fetch.credentials(o)->Option.getWithDefault(credentials_),
          ~headers=Fetch.headers(o)->Option.getWithDefault(headers_),
          ~redirect=Fetch.redirect(o)->Option.getWithDefault(redirect_),
          ~referrerPolicy=Fetch.referrerPolicy(o)->Option.getWithDefault(referrerPolicy_),
          ~body=Fetch.body(o)->Option.getWithDefault(body_),
        ())
      | None => options_
      }

      Fetch.fetch(
        ~input=baseUrl(serviceOptions) ++ input,
        ~init=options,
      ())
    }
  }