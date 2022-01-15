export default mode => new Proxy({
  mode,
  lang: "en",
  robots: {
    staging: "noindex,nofollow",
  },
  rating: null,
  title: {
    development: "Title (development)",
    staging: "Title (staging)",
    production: "Title"
  },
  description: {
    development: "Description (development)",
    staging: "Description (staging)",
    production: "Description"
  },
  ogTitle: {
    development: "Title (development)",
    staging: "Title (staging)",
    production: "Title"
  },
  ogType: "website",
  ogImage: null,
  ogUrl: null,
  ogDescription: {
    development: "Description (development)",
    staging: "Description (staging)",
    production: "Description"
  },
  ogSiteName: null,

}, {
  get: 
    (o, prop) =>
    Boolean(o[prop]?.constructor) && Object.is(o[prop].constructor, Object) 
    ? o[prop][mode]
    : o[prop]
})