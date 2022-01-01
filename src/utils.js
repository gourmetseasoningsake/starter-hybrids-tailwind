import { router } from "hybrids"



/*
  TODO:
  https://developer.mozilla.org/en-US/docs/Web/API/AbortController
  https://stackoverflow.com/questions/29478751/cancel-a-vanilla-ecmascript-6-promise-chain#answer-59999584
*/
export const beforeNavigate = 
  fn =>
  (host, e) =>
  router.resolve(e, fn(host, e))