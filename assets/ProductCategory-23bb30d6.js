import{u as P,x as _,_ as v,r as C,o,c as l,a as t,f as d,h as c,i as n,q as p,w as u,F as i,e as y,t as f,p as h,j as m}from"./index-6b9a9c15.js";import{u as g}from"./product-3708dd7d.js";const w={computed:{...P(g,["categoryList","selectedCategory","singleProduct"])},methods:{..._(g,["filterProduct"])},created(){g().getProductAll()}},b=e=>(h("data-v-c87556b5"),e=e(),m(),e),$={class:"d-md-block d-none"},L=b(()=>t("div",{class:"text-white bg-dark py-3 text-start w-100 rounded-0 px-4"},"所有分類",-1)),S={class:"border"},j={class:"d-md-none d-block"},E=b(()=>t("a",{class:"btn btn-dark py-3 fw-bold text-start w-100 rounded-0","data-bs-toggle":"collapse",href:"#collapseExample",role:"button","aria-expanded":"false","aria-controls":"collapseExample"}," 所有分類 ",-1)),I={class:"collapse border",id:"collapseExample"};function O(e,a,B,N,V,A){const r=C("RouterLink");return o(),l(i,null,[t("div",$,[L,t("ul",S,[t("li",null,[d(r,{to:{name:"products"},class:p(["px-4 py-lg-3 py-2 d-block fs-6",{"bg-selected":!Object.keys(e.singleProduct).length&&e.selectedCategory==="全部"}]),onClick:a[0]||(a[0]=u(s=>e.filterProduct("全部"),["prevent"]))},{default:c(()=>[n("全部")]),_:1},8,["class"])]),(o(!0),l(i,null,y(e.categoryList,s=>(o(),l("li",{key:s},[d(r,{to:{name:"products"},class:p(["px-4 py-lg-3 py-2 w-100 fs-6",{"bg-selected":e.singleProduct&&e.singleProduct.category===s||!Object.keys(e.singleProduct).length&&e.selectedCategory===s}]),onClick:u(k=>e.filterProduct(s),["prevent"])},{default:c(()=>[n(f(s),1)]),_:2},1032,["class","onClick"])]))),128))])]),t("div",j,[E,t("div",I,[t("ul",null,[t("li",null,[d(r,{to:{name:"products"},class:p(["ps-3 py-lg-3 py-2 d-block fs-6",{"bg-selected":!Object.keys(e.singleProduct).length&&e.selectedCategory==="全部"}]),onClick:a[1]||(a[1]=s=>e.filterProduct("全部"))},{default:c(()=>[n("全部")]),_:1},8,["class"])]),(o(!0),l(i,null,y(e.categoryList,s=>(o(),l("li",{key:s},[d(r,{to:{name:"products"},class:p(["px-3 py-lg-3 py-2 w-100 fs-6",{"bg-selected":e.singleProduct&&e.singleProduct.category===s||!Object.keys(e.singleProduct).length&&e.selectedCategory===s}]),onClick:u(k=>e.filterProduct(s),["prevent"])},{default:c(()=>[n(f(s),1)]),_:2},1032,["class","onClick"])]))),128))])])])],64)}const q=v(w,[["render",O],["__scopeId","data-v-c87556b5"]]);export{q as P};
