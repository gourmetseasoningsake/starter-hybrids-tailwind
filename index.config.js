const config = {
  lang: "en",
  meta: {
    viewport: "width=device-width, initial-scale=1.0",
    description: "Description",
    robots: {
      staging: "noindex,nofollow"
    },
    rating: null
  },
  title: "Title",
  og: {
    title: "Title",
    type: "website",
    image: null,
    url: null,
    description: "Description",
    siteName: null,
  }
}



const proxy =
  (mode, o) =>
  new Proxy(o, {
    get(o, prop) {
      if (Boolean(o[prop]?.constructor) && Object.is(o[prop].constructor, Object)) {
        if (mode in o[prop]) return o[prop][mode]
        if (["development", "staging", "production"].some(mode => mode in o[prop])) return null
        return proxy(mode, o[prop])
      }
      return o[prop]
    }
  })



export default mode => proxy(mode, {mode, ...config})