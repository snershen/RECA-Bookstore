import{_ as m,u,x as h,r as o,o as s,c,a0 as g,a as t,f as l,t as i,l as f,F as v,e as b,p as y,j as w}from"./index-6b9a9c15.js";import{a as r}from"./article-006b9689.js";import{B as A}from"./Breadcrumb-57cf93a8.js";import{A as S}from"./ArticleCard-295b9d4e.js";import"./apis-b1e9b367.js";import"./timeFormat-77515bb4.js";const B={computed:{...u(r,["articleList","article"])},components:{Breadcrumb:A,ArticleCard:S},methods:{...h(r,["getArticles","getSingleArticle"]),isValidURL(e){return!!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(e)},updateDocumentTitle(){document.title=`${this.article.title}｜RECA BOOKSTORE`}},props:["id"],async created(){await this.getSingleArticle(this.id),await this.getArticles(),this.updateDocumentTitle()},watch:{"article.title":"updateDocumentTitle"}},C=e=>(y("data-v-7035516d"),e=e(),w(),e),L={class:"container py-lg-5 pb-5 pt-4 article-content"},V={class:"row justify-content-center"},$={class:"col-lg-10"},k={class:"text-center"},T={href:"#",class:"me-3 fs-6 d-block mb-3 mb-lg-0"},j={class:"mb-3 mb-lg-0 fw-bold mb-1 fs-lg-1 fs-lg-2 fs-3 ls-lg"},I={class:"d-flex align-items-center justify-content-center"},D={class:"me-3"},N={class:"fs-7 ls-lg"},R={class:"container"},E={class:"row justify-content-center"},O={class:"col-lg-8"},F=["innerHTML"],H={class:"bg-light py-5 mt-5"},M={class:"container"},P={class:"row justify-content-center"},U={class:"col-lg-10"},z=C(()=>t("h3",{class:"fs-2 fw-bold mb-4"},"更多文章",-1)),K={class:"row"},q={class:"mb-3"};function G(e,n,J,Q,W,d){const _=o("Breadcrumb"),p=o("ArticleCard");return s(),c("div",null,[d.isValidURL(e.article.image)?(s(),c("div",{key:0,class:"article-banner",style:g({backgroundImage:`url(${e.article.image})`})},[t("div",L,[l(_,{breadConfig:{path:"articles",subNav:"編輯推薦",title:"文章"}}),t("div",V,[t("div",$,[t("div",k,[t("span",T,"# "+i(e.article.tag),1),t("h2",j,i(e.article.title),1),t("div",I,[t("p",D,"作者 / "+i(e.article.author),1),t("p",N,i(e.article.create_at),1)])])])])])],4)):f("",!0),t("div",R,[t("div",E,[t("div",O,[t("p",{class:"fs-5 py-5",innerHTML:e.article.content},null,8,F)])])]),t("div",H,[t("div",M,[t("div",P,[t("div",U,[z,t("ul",K,[(s(!0),c(v,null,b(e.articleList,a=>(s(),c("li",{key:a.title,class:"col-lg-4"},[t("div",q,[l(p,{article:a},null,8,["article"])])]))),128))])])])])])])}const st=m(B,[["render",G],["__scopeId","data-v-7035516d"]]);export{st as default};
