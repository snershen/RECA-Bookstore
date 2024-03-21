import{a1 as n}from"./index-0c9b4ac0.js";const{VITE_API_URL:a,VITE_API_PATH:c}={VITE_API_URL:"https://ec-course-api.hexschool.io/v2",VITE_API_PATH:"bookstore-api",BASE_URL:"/RECA-Bookstore/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},o=n.create({baseURL:a}),e=n.create({baseURL:`${a}/api/${c}/admin/`}),p=t=>o.post("/admin/signin",t),l=()=>o.post("/logout"),g=()=>{const t=document.cookie.replace(/(?:(?:^|.*;\s*)bookstoreAPI\s*=\s*([^;]*).*$)|^.*$/,"$1");return o.defaults.headers.common.Authorization=t,e.defaults.headers.common.Authorization=t,o.post("/api/user/check")},r=n.create({baseURL:`${a}/api/${c}/`}),m=t=>e.get(`/products?page=${t}`),$=t=>e.post("/product",t),P=(t,s)=>e.put(`/product/${s}`,t),A=t=>e.delete(`/product/${t}`),C=t=>e.get(`/orders/?page=${t}`),G=(t,s)=>e.put(`/order/${s}`,t),I=t=>e.delete(`/order/${t}`),R=t=>e.get(`/coupons/?page=${t}`),h=t=>e.post("/coupon",t),D=(t,s)=>e.put(`/coupon/${s}`,t),k=t=>e.delete(`/coupon/${t}`),E=t=>e.post("/article",t),_=t=>e.get(`/articles/?page=${t}`),O=t=>e.get(`/article/${t}`),S=(t,s)=>e.put(`/article/${t}`,s),U=t=>e.delete(`/article/${t}`),f=t=>e.post("/upload",t),L=(t,s="")=>{let u=`/products?page=${t}`;if(s!==""){const d=encodeURIComponent(s);u=`/products?page=${t}&category=${d}`}return r.get(u)},b=()=>r.get("products/all"),T=t=>r.get(`/product/${t}`),V=t=>r.post("/cart",t),q=(t,s)=>r.put(`/cart/${t}`,s),x=t=>r.delete(`/cart/${t}`),y=()=>r.delete("/carts"),z=()=>r.get("/cart"),B=t=>r.post("/order",t),H=()=>r.get("/orders"),v=t=>r.get(`/order/${t}`),j=()=>r.get("/articles"),w=t=>r.get(`/article/${t}`),F=t=>r.post("/coupon",t),M=t=>r.post(`/pay/${t}`);export{z as A,x as B,q as C,y as D,V as E,b as F,L as G,T as H,j as I,p as a,l as b,g as c,f as d,m as e,P as f,$ as g,A as h,G as i,I as j,_ as k,O as l,U as m,E as n,S as o,R as p,k as q,h as r,D as s,C as t,w as u,F as v,B as w,H as x,v as y,M as z};