import  { store } from "hybrids"




export const Page = {
  id: true,
  title: "",
  [store.connect]: {
    get: id => get(`http://localhost:3001/page/${id}`)
  }
}



/* Helpers */

// NB: feeling lucky
function get (url) {
  return fetch(url).then(resp => resp.json()).then(data => data)
}