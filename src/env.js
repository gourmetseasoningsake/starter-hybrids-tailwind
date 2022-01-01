export default { 
  EXP_APP_TITLE: import.meta.env.EXP_APP_TITLE,
  EXP_HMR: import.meta.env.EXP_HMR === "true",
  EXP_ROUTER_DEBUG: import.meta.env.EXP_ROUTER_DEBUG === "true",
  
  BASE_URL: import.meta.env.BASE_URL,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  SSR: import.meta.env.SSR
}