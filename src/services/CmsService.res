open Webapi
open Service



let getMenu = service(init(
  ~baseUrl=importmeta["env"]["EXP_API_URL"] ++ "/menu/",
()))



let getPage = service(init(
  ~baseUrl=importmeta["env"]["EXP_API_URL"] ++ "/page/",
()))