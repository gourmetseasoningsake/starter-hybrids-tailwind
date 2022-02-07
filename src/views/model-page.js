import  { store } from "hybrids"



//const Pages = import.meta.globEager('./page-*.js')



export const Page = {
  id: true,
  title: "",
  [store.connect]: {
    get: id => fetch(`http://localhost:3001/pages/${id}`).then(data => data.json()).then(data => data),
    list: () => fetch(`http://localhost:3001/pages`).then(data => data.json()).then(data => data),
  }
}



export const Menu = {
  id: true,
  page: 1,
  [store.connect]: {
    get: id => fetch(`http://localhost:3001/menu/${id}`).then(data => data.json()).then(data => data),
    list: () => fetch(`http://localhost:3001/menu`).then(data => data.json()).then(data => data),
  }
}