import{P as n}from"./ProductCard-c28e7925.js";import{_ as d,u as i,x as m,r as p,o as t,c as o,F as _,d as g,a as e,e as f,g as r}from"./index-e3e4c989.js";import{p as a}from"./product-defc8536.js";import"./sweetalert2.all-79737a9a.js";import"./apis-75edfbd9.js";const u="/RECA-Bookstore/assets/collect-empty-b20fe050.png",h={computed:{...i(a,["collectStorage"])},components:{ProductCard:n},methods:{...m(a,["getStorage"])},created(){this.getStorage}},b={class:"container py-5"},x=e("div",{class:"d-flex justify-content-between align-items-center mb-4"},[e("h1",{class:"fw-bold mb-5"},"收藏清單")],-1),y={key:0,class:"row g-4"},S={key:1,class:"d-flex flex-column flex-lg-row align-items-center justify-content-center"},k=e("p",{class:"fs-3 col-lg-4 fw-bold text-center mb-5"},[r("尚未收藏書本，"),e("br"),r("快去逛逛吧！")],-1),C=e("div",{class:"col-lg-4"},[e("img",{src:u,alt:"",class:"img-fluid"})],-1),v=[k,C];function w(s,B,P,$,N,V){const l=p("ProductCard");return t(),o("div",b,[x,s.collectStorage.length!==0?(t(),o("ul",y,[(t(!0),o(_,null,g(s.collectStorage,c=>(t(),o("li",{key:c.id,class:"col-lg-2 col-md-4 col-sm-6 mb-lg-0"},[f(l,{item:c},null,8,["item"])]))),128))])):(t(),o("div",S,v))])}const R=d(h,[["render",w]]);export{R as default};
