import  { store } from "hybrids"
import { getJson } from "../API.bs.js"




export const Page = {
  id: true,
  title: "",
  [store.connect]: {
    get: id => getJson(`/page/${id}`, {})
  }
}