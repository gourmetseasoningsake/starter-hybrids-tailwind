export const envPrefixes = ["EXP_"]
export const modes = ["development", "staging", "production", "test"]



export const indexConfigDefaults = {
  lang: "en",
  meta: {
    viewport: "width=device-width, initial-scale=1.0",
    description: "Description",
    robots: {
      staging: "noindex,nofollow"
    },
    rating: null
  },
  title: "...",
  og: {
    title: "...",
    type: "website",
    image: null,
    url: null,
    description: "Description",
    siteName: null,
  }
}