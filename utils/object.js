/** @type {omitProp} */
export const omitProp = 
  (obj, key) => {
    const { [key]: _, ...rest } = obj
    return rest
  }



/** @type {proxyLiteralsByKey} */
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