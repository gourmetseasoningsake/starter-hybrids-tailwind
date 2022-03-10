import  { store } from "hybrids"
import { getJson } from "../common/API.bs.js"




export const Page = {
  id: true,
  title: "",
  [store.connect]: {
    get: id => getJson(`/page/${id}`, {})
  }
}