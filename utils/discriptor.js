import { store, router } from "hybrids"



export const combine = 
  (discriptor, otherDiscriptor) => 
  Object.keys(otherDiscriptor).reduce((obj, key) => ({
    ...obj, 
    [key]: (...args) => (
      otherDiscriptor[key](...args)
    , discriptor[key] && discriptor[key](...args)
    )
  }), discriptor)



export const view = 
  (modules, options) =>
  combine(
    router(Object.values(modules).map(m => m.default)),
    {
      observe:
        (host, value, _lastValue) => 
        store
        .resolve(value[0].page)
        .then(page => {
          const res = options.onChange(host, page)
          Promise.resolve(res)
        })
    }
  )