import{_ as S,u as b,x as v,r as _,o as s,c as o,a as t,F as h,d as f,t as m,e as c,b as y,v as A,w as x,g as p}from"./index-e3e4c989.js";import{a as u}from"./article-8bde1261.js";import{A as k}from"./ArticleCard-b0292569.js";import"./apis-75edfbd9.js";import"./timeFormat-77515bb4.js";const C="/RECA-Bookstore/assets/article-empty-789fc33d.png",R={data(){return{filterResult:[],searchString:"",isSearch:!1,newSearchString:""}},components:{ArticleCard:k},computed:{...b(u,["articleList"])},methods:{...v(u,["getArticles"]),filterArticle(){this.isSearch=!0;const l=this.searchString.trim();this.newSearchString=l;const i=this.articleList.filter(n=>n.title.includes(l));this.filterResult=i}},created(){this.getArticles(),this.isSearch=!1}},B={class:"container py-5"},L=t("h1",{class:"fw-bold mb-4"},"編輯推薦",-1),V={class:"row"},N={class:"col-lg-8 order-1 order-lg-0 overflow-hidden"},D={key:0,class:"row"},E={class:"col-12"},F={key:1},M={class:"fs-3 fw-bold"},T={class:"row"},U={class:"col-12"},j={key:2},q={class:"px-3 py-2 text-center"},z={class:"fs-3 fw-bold mb-4"},G=t("p",{class:"fs-5 fw-bold mb-5"},[p("查詢不到相關文章"),t("br"),p("看看其他文章吧")],-1),H=t("img",{src:C,alt:"",class:"img-fluid w-50"},null,-1),I={class:"offset-lg-1 col-lg-3 mb-4 mb-lg-0"},J={class:"d-flex align-items-center"},K={class:"position-relative me-2 w-100"};function O(l,i,n,P,e,a){const d=_("ArticleCard"),g=_("font-awesome-icon");return s(),o("div",B,[L,t("div",V,[t("div",N,[e.filterResult.length===0&&!e.isSearch?(s(),o("ul",D,[(s(!0),o(h,null,f(l.articleList,(r,w)=>(s(),o("li",E,[c(d,{article:r,"data-aos":"fade-left","data-aos-duration":"1000","data-aos-delay":500*w},null,8,["article","data-aos-delay"])]))),256))])):e.filterResult.length!==0&&e.isSearch?(s(),o("div",F,[t("p",M,'"'+m(e.newSearchString)+'" 搜尋結果',1),t("ul",T,[(s(!0),o(h,null,f(e.filterResult,r=>(s(),o("li",U,[t("div",null,[c(d,{article:r},null,8,["article"])])]))),256))])])):(s(),o("div",j,[t("div",q,[t("p",z,'"'+m(e.newSearchString)+'" 搜尋結果',1),G,H])]))]),t("div",I,[t("div",J,[t("div",K,[c(g,{icon:["fas","magnifying-glass"],class:"text-dark position-absolute top-50 start-0 translate-middle-y ms-3"}),y(t("input",{type:"text",placeholder:"搜尋文章",class:"d-block w-100 ps-5 form-control","onUpdate:modelValue":i[0]||(i[0]=r=>e.searchString=r)},null,512),[[A,e.searchString]])]),t("button",{type:"button",class:"btn btn-dark text-nowrap",onClick:i[1]||(i[1]=x((...r)=>a.filterArticle&&a.filterArticle(...r),["prevent"]))}," 搜尋 ")])])])])}const $=S(R,[["render",O]]);export{$ as default};
