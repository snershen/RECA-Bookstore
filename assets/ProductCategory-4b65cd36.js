import{u as P,x as m,_,r as h,o,c as l,a as s,e as d,f as n,g as c,n as p,w as i,F as u,d as g,t as f,p as v,h as C}from"./index-e3e4c989.js";import{p as y}from"./product-defc8536.js";const w={computed:{...P(y,["categoryList","selectedCategory","singleProduct"])},methods:{...m(y,["filterProduct","getProductAll"])},created(){this.getProductAll()}},b=e=>(v("data-v-f7a2182f"),e=e(),C(),e),$={class:"d-md-block d-none"},L=b(()=>s("div",{class:"text-white bg-dark py-3 text-start w-100 rounded-0 px-4"},"所有分類",-1)),S={class:"border"},j={class:"d-md-none d-block"},E=b(()=>s("a",{class:"btn btn-dark py-3 fw-bold text-start w-100 rounded-0","data-bs-toggle":"collapse",href:"#collapseExample",role:"button","aria-expanded":"false","aria-controls":"collapseExample"}," 所有分類 ",-1)),I={class:"collapse border",id:"collapseExample"};function O(e,a,A,B,N,V){const r=h("RouterLink");return o(),l(u,null,[s("div",$,[L,s("ul",S,[s("li",null,[d(r,{to:{name:"products"},class:p(["px-4 py-lg-3 py-2 d-block fs-6",{"bg-selected":!Object.keys(e.singleProduct).length&&e.selectedCategory==="全部"}]),onClick:a[0]||(a[0]=i(t=>e.filterProduct("全部"),["prevent"]))},{default:n(()=>[c("全部")]),_:1},8,["class"])]),(o(!0),l(u,null,g(e.categoryList,t=>(o(),l("li",null,[d(r,{to:{name:"products"},class:p(["px-4 py-lg-3 py-2 w-100 fs-6",{"bg-selected":e.singleProduct&&e.singleProduct.category===t||!Object.keys(e.singleProduct).length&&e.selectedCategory===t}]),onClick:i(k=>e.filterProduct(t),["prevent"])},{default:n(()=>[c(f(t),1)]),_:2},1032,["class","onClick"])]))),256))])]),s("div",j,[E,s("div",I,[s("ul",null,[s("li",null,[d(r,{to:{name:"products"},class:p(["ps-3 py-lg-3 py-2 d-block fs-6",{"bg-selected":!Object.keys(e.singleProduct).length&&e.selectedCategory==="全部"}]),onClick:a[1]||(a[1]=t=>e.filterProduct("全部"))},{default:n(()=>[c("全部")]),_:1},8,["class"])]),(o(!0),l(u,null,g(e.categoryList,t=>(o(),l("li",null,[d(r,{to:{name:"products"},class:p(["px-3 py-lg-3 py-2 w-100 fs-6",{"bg-selected":e.singleProduct&&e.singleProduct.category===t||!Object.keys(e.singleProduct).length&&e.selectedCategory===t}]),onClick:i(k=>e.filterProduct(t),["prevent"])},{default:n(()=>[c(f(t),1)]),_:2},1032,["class","onClick"])]))),256))])])])],64)}const z=_(w,[["render",O],["__scopeId","data-v-f7a2182f"]]);export{z as P};
