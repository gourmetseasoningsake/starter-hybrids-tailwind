import  { store } from "hybrids"
import { getPage } from "../services/CmsService.bs.js"




export const Page = {
  id: true,
  title: "",
  [store.connect]: { 
    get: id => 
      getPage(id)
      .then(resp => resp.json())
      .catch(console.log)
  }
}