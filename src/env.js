/* TODO: expose only what's needed in `src` */
export default {
  BASE_URL: import.meta.env.BASE_URL,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  SSR: import.meta.env.SSR,

  EXP_BROWSER: import.meta.env.EXP_BROWSER,
  EXP_HMR_FORCE_RELOAD: import.meta.env.EXP_HMR_FORCE_RELOAD === "true",
  EXP_ROUTER_DEBUG: import.meta.env.EXP_ROUTER_DEBUG === "true",

  EXP_APP_ROBOTS: import.meta.env.EXP_APP_ROBOTS,
  EXP_APP_RATING: import.meta.env.EXP_APP_RATING,
  EXP_APP_TITLE: import.meta.env.EXP_APP_TITLE,
  EXP_APP_DESC: import.meta.env.EXP_APP_DESC,
}