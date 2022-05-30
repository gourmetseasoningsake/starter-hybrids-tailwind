
import { store } from "hybrids"
import { getMenu } from "../services/CmsService.bs.js"



export const Menu = {
  id: true,
  items: [{
    view: "",
    text: "",
    title: "",
    params: { slug: "" }
  }],
  [store.connect]: { 
    get: id => 
      getMenu(id)
      .then(resp => resp.json())
      .catch(console.log)
  }
}
