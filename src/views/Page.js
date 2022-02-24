import  { store } from "hybrids"
import { getJsonOr } from "../Helpers.bs.js"




export const Page = {
  id: true,
  title: "",
  [store.connect]: {
    get: id => getJsonOr(`http://localhost:3001/page/${id}`, {})
  }
}