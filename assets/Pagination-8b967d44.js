import{_,r as d,o,c as r,a as n,w as c,e as p,F as g,d as u,n as m,t as f}from"./index-0bc740d2.js";const h={data(){return{pagination:{}}},props:{innerPagination:{default(){return{}}}},methods:{updatePage(t){this.$emit("emit-page",t)}},watch:{innerPagination:{handler(t){this.pagination=t}}}},v={"aria-label":"Page navigation example",class:"d-flex justify-content-center"},b={class:"pagination"},P={class:"page-item"},k=["disabled"],x=["onClick"],y={class:"page-item"},C=["disabled"];function w(t,s,B,N,e,i){const l=d("font-awesome-icon");return o(),r("nav",v,[n("ul",b,[n("li",P,[n("button",{type:"button",class:"page-link","aria-label":"Previous",disabled:!e.pagination.has_pre,onClick:s[0]||(s[0]=c(a=>i.updatePage(e.pagination.current_page-1),["prevent"]))},[p(l,{icon:["fas","chevron-left"],class:"fa-sm"})],8,k)]),(o(!0),r(g,null,u(e.pagination.total_pages,a=>(o(),r("li",{class:m(["page-item mx-1",{active:e.pagination.current_page===a}]),key:a},[n("a",{class:"page-link",href:"#",onClick:c(F=>i.updatePage(a),["prevent"])},f(a),9,x)],2))),128)),n("li",y,[n("button",{type:"button",class:"page-link","aria-label":"Next",disabled:!e.pagination.has_next,onClick:s[1]||(s[1]=c(a=>i.updatePage(e.pagination.current_page+1),["prevent"]))},[p(l,{icon:["fas","chevron-right"],class:"fa-sm"})],8,C)])])])}const j=_(h,[["render",w],["__scopeId","data-v-a9d9b6cf"]]);export{j as P};
