export const omitProp = 
  (o, k) => {
    const { [k]: _, ...rest } = o
    return rest
  }



export const proxyLiteralsByKey =
  ({ key, keys, obj }) =>
  new Proxy(obj, {
    get(obj, prop) {
      if (Boolean(obj[prop]?.constructor) && Object.is(obj[prop].constructor, Object)) {
        if (key in obj[prop]) return obj[prop][key]
        if (keys.some(key => key in obj[prop])) return null
        return proxyLiteralsByKey({ key, keys, obj: obj[prop] })
      }
      return obj[prop]
    }
  })