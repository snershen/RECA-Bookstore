import{_ as r,r as l,o as d,c as n,a as t,t as s,e as _,f,g as h,w as m}from"./index-640e9deb.js";const p={props:{article:{type:Object,required:!0}},methods:{directArticle(c){this.$router.push(`/articles/${c.id}`)}},beforeCreate(){this.$route.name==="articles"?document.body.classList.add("articles-card-style"):document.body.classList.remove("articles-card-style")}},u={class:"card-article position-relative"},v={class:"row py-4"},b={class:"col-12 card-img-wrapper"},g={class:"card-img overflow-hidden rounded-3 position-relative mb-3"},w={href:"#",class:"tag fs-7 mb-1 position-absolute text-white top-0 end-0 px-3 py-1 bg-primary"},x=["src","alt"],y={class:"col-12 card-content-wrapper"},k={class:"fw-bold fs-lg-3 fs-5 mb-2"},C={class:"fs-6 text-gray text-nowrap mb-2"},A={class:"text-overflow-2 w-100 fs-6 text-gray"};function L(c,a,e,B,N,i){const o=l("RouterLink");return d(),n("div",u,[t("div",v,[t("div",b,[t("div",g,[t("span",w,s(e.article.tag),1),t("img",{src:e.article.image,alt:e.article.title,class:"w-100 h-100 object-fit-cover mb-2 mb-lg-0"},null,8,x)])]),t("div",y,[t("h2",k,[_(o,{to:`/articles/${e.article.id}`,class:"stretched-link text-overflow-2",onClick:a[0]||(a[0]=m(V=>i.directArticle(e.article),["prevent"]))},{default:f(()=>[h(s(e.article.title),1)]),_:1},8,["to"])]),t("p",C,"作者 / "+s(e.article.author),1),t("p",A,s(e.article.description),1)])])])}const R=r(p,[["render",L],["__scopeId","data-v-62f881cb"]]);export{R as A};
