import{B as p}from"./BtnMore-d93295a1.js";import{P as f}from"./ProductCard-16c151ba.js";import{_ as g,m as u,q as h,r as s,o as e,c as o,F as b,d as k,a as t,e as c,f as n,g as r}from"./index-0bc740d2.js";import{p as d}from"./product-5596ec4e.js";import"./sweetalert2.all-92ecb71d.js";import"./apis-9b5d4518.js";const x="/RECA-Bookstore/assets/collect-empty-b20fe050.png",B={computed:{...u(d,["collectStorage"])},components:{ProductCard:f,BtnMore:p},methods:{...h(d,["getStorage"])},created(){this.getStorage}},C={class:"container py-5"},S=t("div",{class:"d-flex justify-content-between align-items-center mb-lg-2"},[t("h1",{class:"fw-bold"},"收藏清單")],-1),v={key:0,class:"row g-4"},w={key:1,class:"row mt-4"},y={class:"col-lg-6 offset-lg-3 text-center"},P=t("p",{class:"fs-4 fs-lg-3 fw-bold mb-2"},[r("尚未收藏書本，"),t("br"),r("快去逛逛吧！")],-1),$=t("div",{class:"col-lg-4 offset-lg-4 text-center"},[t("img",{src:x,alt:"",class:"img-fluid"})],-1);function L(a,M,N,R,V,A){const i=s("ProductCard"),m=s("BtnMore"),_=s("RouterLink");return e(),o("div",C,[S,a.collectStorage.length!==0?(e(),o("ul",v,[(e(!0),o(b,null,k(a.collectStorage,l=>(e(),o("li",{key:l.id,class:"col-xl-2 col-lg-3 col-md-4 col-6 mb-lg-0"},[c(i,{item:l},null,8,["item"])]))),128))])):(e(),o("div",w,[t("div",y,[P,c(_,{to:{name:"products"},class:"mb-4"},{default:n(()=>[c(m,null,{text:n(()=>[r("瀏覽書籍")]),_:1})]),_:1})]),$]))])}const D=g(B,[["render",L]]);export{D as default};
