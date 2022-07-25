import { router } from "hybrids"



export const beforeNavigate = fn => {
  return (host, e) => {
    router.resolve(e, fn(host, e))
  }
}



export const historyPush = param => {
  return Promise.resolve(history.pushState(history.state, ""))
}