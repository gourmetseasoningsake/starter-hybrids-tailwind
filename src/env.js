/* TODO: expose only what's needed in `src` */
export default { 
  EXP_APP_TITLE: import.meta.env.EXP_APP_TITLE,
  EXP_BROWSER: import.meta.env.EXP_BROWSER,
  EXP_HMR_FORCE_RELOAD: import.meta.env.EXP_HMR_FORCE_RELOAD === "true",
  EXP_ROUTER_DEBUG: import.meta.env.EXP_ROUTER_DEBUG === "true",
  
  BASE_URL: import.meta.env.BASE_URL,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  SSR: import.meta.env.SSR
}