import{B as m}from"./Breadcrumb-d209ee53.js";import{A as u}from"./ArticleCard-2ae54393.js";import{_ as h,s as g,u as f,r as i,o as s,c,a1 as b,a as t,f as o,t as a,q as v,F as y,e as A,p as w,j as S}from"./index-ed25072b.js";import{a as l}from"./article-8f38e3cf.js";import"./apis-cc65c95d.js";import"./timeFormat-77515bb4.js";const B={computed:{...g(l,["articleList","article"])},components:{Breadcrumb:m,ArticleCard:u},methods:{...f(l,["getArticles","getSingleArticle"]),isValidURL(e){return!!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(e)},updateDocumentTitle(){document.title=`${this.article.title}｜RECA BOOKSTORE`}},props:["id"],async created(){await this.getSingleArticle(this.id),await this.getArticles(),this.updateDocumentTitle()},watch:{"article.title":"updateDocumentTitle"}},C=e=>(w("data-v-76b23445"),e=e(),S(),e),L={class:"container py-lg-5 pb-5 pt-4 article-content"},$={class:"row justify-content-center"},T={class:"col-lg-10"},j={class:"text-center"},k={href:"#",class:"me-3 fs-6 d-block mb-3 mb-lg-0"},I={class:"mb-3 mb-lg-0 fw-bold mb-1 fs-lg-1 fs-lg-2 fs-3 ls-lg"},V={class:"d-flex align-items-center justify-content-center"},D={class:"me-3"},N={class:"fs-7 ls-lg"},R={class:"container"},E={class:"row justify-content-center"},O={class:"col-lg-8"},F=["innerHTML"],H={class:"bg-light py-5 mt-5"},M={class:"container"},P={class:"row justify-content-center"},U={class:"col-lg-10"},q=C(()=>t("h3",{class:"fs-2 fw-bold mb-4"},"更多文章",-1)),z={class:"row"},K={class:"col-lg-4"},G={class:"mb-3"};function J(e,r,Q,W,X,n){const d=i("Breadcrumb"),_=i("ArticleCard");return s(),c("div",null,[n.isValidURL(e.article.image)?(s(),c("div",{key:0,class:"article-banner",style:b({backgroundImage:`url(${e.article.image})`})},[t("div",L,[o(d,{breadConfig:{path:"articles",subNav:"編輯推薦",title:"文章"}}),t("div",$,[t("div",T,[t("div",j,[t("span",k,"# "+a(e.article.tag),1),t("h2",I,a(e.article.title),1),t("div",V,[t("p",D,"作者 / "+a(e.article.author),1),t("p",N,a(e.article.create_at),1)])])])])])],4)):v("",!0),t("div",R,[t("div",E,[t("div",O,[t("p",{class:"fs-5 py-5",innerHTML:e.article.content},null,8,F)])])]),t("div",H,[t("div",M,[t("div",P,[t("div",U,[q,t("ul",z,[(s(!0),c(y,null,A(e.articleList,p=>(s(),c("li",K,[t("div",G,[o(_,{article:p},null,8,["article"])])]))),256))])])])])])])}const ct=h(B,[["render",J],["__scopeId","data-v-76b23445"]]);export{ct as default};