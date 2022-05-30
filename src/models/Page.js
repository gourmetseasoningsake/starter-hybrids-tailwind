import { html, store } from "hybrids"
import { getPage } from "../services/CmsService.bs.js"



const Content = {
  kind: "",
  content: "",
  width: 0,
  height: 0
}



export const Page = {
  id: true,
  title: "",
  contents: [Content],
  [store.connect]: { 
    get: id => 
      getPage(id)
      .then(resp => resp.json())
      .catch(console.log)
  }
}



export const contentFrom = item => {
  switch (item.kind) {
    case "paragraph": return html`
      <p class="font-light leading-relaxed my-8" innerHTML=${item.content}></p>
    `;
    case "image": return html`
      <img width=${item.width} height=${item.height} class="w-full my-8" src=${item.content}>
    `;
    default: return html``
  }
}