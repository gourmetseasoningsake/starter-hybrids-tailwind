/**
  `beforeNavigate(fn)`
  ...
  IMPLEMENT:
  https://developer.mozilla.org/en-US/docs/Web/API/AbortController
  https://stackoverflow.com/questions/29478751/cancel-a-vanilla-ecmascript-6-promise-chain#answer-59999584
*/
let beforeNavigate: ((. Dom.element, Dom.event) => Promise.t<'a>) => (. Dom.element, Dom.event) => Promise.t<'a>



/**
  `historyPush()`
  ...
*/
let historyPush: unit => Promise.t<'a>