import  { store } from "hybrids"



//const Pages = import.meta.globEager('./page-*.js')


// NB: feeling lucky
const get =
  url =>
  fetch(url)
  .then(resp => resp.json())
  .then(data => data)



export const Page = {
  id: true,
  title: "",
  [store.connect]: {
    get: slug => get(`http://localhost:3001/page/${slug}`),
    list: () => get(`http://localhost:3001/page`),
  }
}



const Params = {
  slug: ""
}



export const Menu = {
  id: true,
  text: "",
  multiple: false,
  params: Params,
  [store.connect]: {
    get: id => get(`http://localhost:3001/menu/${id}`),
    list: () => get(`http://localhost:3001/menu`),
  }
}