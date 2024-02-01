import{u as S,x as k,_ as L,o,c as l,a as t,F as d,d as _,n as B,t as a,T as I,r as c,e as s,f as r,l as f,g as b,p as M,h as R}from"./index-d96ff054.js";import{p as g}from"./product-95adce2f.js";import{a as $}from"./article-558acb87.js";import{P as F}from"./ProductCard-c1f5139d.js";import{A as H}from"./ArticleCard-62301de1.js";import{B as U}from"./BtnMore-9a480d25.js";import{S as N,a as E}from"./swiper-vue-1a77fc0d.js";import"./sweetalert2.all-821e0636.js";import"./apis-c0b44895.js";import"./timeFormat-77515bb4.js";const O={computed:{...S(g,["productList","categoryList","selectedCategory"])},methods:{...k(g,["getProducts","filterProduct","getProductAll","sortProduct"]),directProductPage(){this.$router.push("/products"),this.searchString=""},async handleFilter(i){await this.filterProduct(i),await this.sortProduct("time")}},async created(){await this.getProducts(),await this.filterProduct(this.categoryList[0]),await this.sortProduct("time")}},D={class:"nav-wrapper"},q={class:"nav nav-pills mb-3 flex-nowrap text-nowrap overflow-x-scroll",id:"pills-tab",role:"tablist"},G=["onClick"];function J(i,y,w,v,V,P){return o(),l("div",D,[t("ul",q,[(o(!0),l(d,null,_(i.categoryList,n=>(o(),l("li",{class:"nav-item",role:"presentation",key:n},[t("button",{class:B(["nav-link",{active:i.selectedCategory===n}]),id:"pills-home-tab","data-bs-toggle":"pill","data-bs-target":"#pills-home",type:"button",role:"tab","aria-controls":"pills-home","aria-selected":"true",onClick:u=>P.handleFilter(n)},a(n),11,G)]))),128))])])}const K=L(O,[["render",J],["__scopeId","data-v-bc7beee9"]]);const Q={data(){return{bannerSwiper:{spaceBetween:60,centeredSlides:!0,breakpoints:{576:{slidesPerView:1},768:{slidesPerView:3},1024:{slidesPerView:5}}},todaySwiper:{slidesPerView:1,spaceBetween:20,navigation:!0,breakpoints:{576:{slidesPerView:1},1024:{slidesPerView:6},1300:{slidesPerView:6}}},publishSwiper:{slidesPerView:1,spaceBetween:18,scrollbar:!0,navigation:!0,breakpoints:{576:{slidesPerView:1},768:{slidesPerView:3},1024:{slidesPerView:4},1400:{slidesPerView:6}}},rankSwiper:{slidesPerView:5,direction:"vertical",watchSlidesProgress:!0,autoScrollOffset:1,breakpoints:{576:{slidesPerView:1},1024:{slidesPerView:5}}},rankContentSwiper:{modules:[I],slidesPerView:1}}},components:{ProductCard:F,ArticleCard:H,Tabs:K,BtnMore:U,Swiper:N,SwiperSlide:E},computed:{...S(g,["productList","categoryList","filterResult","productAll","isLoading"]),...S($,["articleList"])},methods:{...k(g,["getProducts","getProductAll","filterProduct","sortProduct"]),...k($,["getArticles"]),initializeSwiper(i,y){const w=i,v={autoplay:!0,loop:!0,injectStylesUrls:["./custom_swiper.css"],...y};Object.assign(w,v),w.initialize()}},watch:{filterResult(){console.log("initial"),this.$nextTick(()=>{this.initializeSwiper(this.$refs.publishSwiper,this.publishSwiper)})}},created(){this.getProducts(),this.getArticles(),this.getProductAll()},mounted(){setTimeout(()=>{this.initializeSwiper(this.$refs.bannerSwiper,this.bannerSwiper),this.initializeSwiper(this.$refs.todaySwiper,this.todaySwiper),this.initializeSwiper(this.$refs.publishSwiper,this.publishSwiper),this.initializeSwiper(this.$refs.rankSwiper,this.rankSwiper),this.initializeSwiper(this.$refs.rankContentSwiper,this.rankContentSwiper)},500)}},p=i=>(M("data-v-645d9208"),i=i(),R(),i),W={class:"banner py-6 vh-100"},X=p(()=>t("h1",{class:"banner-title text-center fw-bold"},[b("踏上探索之旅"),t("br"),b("尋找屬於自己的命定之書")],-1)),Y=p(()=>t("p",{class:"banner-subtitle text-center mt-2 fs-4 text-white"},"上萬本書籍等待你的閱讀",-1)),Z={class:"container"},tt=["src","alt"],et={class:"container py-6"},st={class:"d-flex justify-content-between align-items-center"},it=p(()=>t("h2",{class:"fw-bold fs-2"},"今日熱門",-1)),ot={class:"position-relative"},rt={class:"today-card"},nt={class:"today-card-img mb-3"},at=["src","alt"],lt={class:"flex-grow-1 w-100"},ct={class:"today-card-title fw-bold text-overflow-1 flex-grow-1 mb-1 text-center text-lg-start"},dt={class:"text-gray text-overflow-1 text-center text-lg-start"},_t={class:"today-card-price align-items-center align-items-lg-start justify-content-center justify-content-lg-start flex-lg-column"},pt={class:"d-flex align-items-center"},ut={class:"fw-bold me-2 fs-3"},ht={class:"fs-7 text-gray"},ft=["innerHTML"],wt={class:"bg-primary-light py-6"},mt={class:"container"},bt={class:"d-flex justify-content-between align-items-center mb-4"},gt=p(()=>t("h2",{class:"fw-bold fs-2"},"最新出版",-1)),yt={class:"position-relative"},vt={class:"container py-6"},xt=p(()=>t("h2",{class:"fw-bold fs-2 mb-5"},"暢銷排行",-1)),St={class:"row"},kt={class:"col-lg-3"},Pt={class:"border-bottom py-2 text-truncate"},$t={class:"me-2 rank-number"},Lt={class:"col-lg-9"},Vt={class:"rank-card d-flex flex-column flex-md-row position-relative"},Ct={class:"rank-card-img mb-3 mb-lg-0"},jt=["src","alt"],Tt={class:"flex-grow-1 w-100"},zt={class:"fs-4 fs-lg-3 rank-card-title fw-bold text-overflow-2 flex-grow-1 text-center text-md-start"},At={class:"rank-card-price align-items-center align-items-md-start justify-content-center justify-content-lg-start flex-column mb-3"},Bt={class:"text-gray mb-1"},It={class:"d-flex align-items-center"},Mt={class:"fw-bold me-2 fs-3"},Rt={class:"fs-7 text-gray"},Ft=["innerHTML"],Ht={class:"bg-primary-light py-5"},Ut={class:"container py-5"},Nt={class:"d-flex justify-content-between align-items-center mb-4"},Et=p(()=>t("h2",{class:"fw-bold fs-2"},"編輯推薦",-1)),Ot={class:"row"},Dt={class:"bookstore-bg text-center"},qt=p(()=>t("h3",{class:"fs-1 fw-bold text-primary mb-4"},"開啟屬於你的閱讀旅程",-1));function Gt(i,y,w,v,V,P){const n=c("RouterLink"),u=c("swiper-slide"),h=c("swiper-container"),x=c("BtnMore"),C=c("Tabs"),j=c("ProductCard"),T=c("ArticleCard"),z=c("font-awesome-icon"),A=c("router-link");return o(),l("main",null,[t("section",W,[X,Y,t("div",Z,[s(h,{init:"false",ref:"bannerSwiper",class:"container banner-swiper pt-5"},{default:r(()=>[(o(!0),l(d,null,_(i.productList,e=>(o(),f(u,{key:`banner${e.id}`,class:"h-auto d-flex justify-content-center",lazy:"true"},{default:r(()=>[s(n,{to:`/products/${e.id}`},{default:r(()=>[t("img",{src:e.imageUrl,alt:e.title,class:"w-100 h-100 object-fit-contain",loading:"lazy"},null,8,tt)]),_:2},1032,["to"])]),_:2},1024))),128))]),_:1},512)])]),t("section",et,[t("div",st,[it,s(n,{to:{name:"products"}},{default:r(()=>[s(x)]),_:1})]),t("div",ot,[s(h,{init:"false",ref:"todaySwiper",class:"container swiper-today my-5"},{default:r(()=>[(o(!0),l(d,null,_(i.productList,e=>(o(),f(u,{key:`today${e.id}`,class:"h-auto"},{default:r(()=>[t("div",rt,[t("div",nt,[t("img",{src:e.imageUrl,alt:e.title,class:"w-100 h-100 object-fit-contain"},null,8,at)]),t("div",lt,[t("h4",ct,a(e.title),1),t("p",dt,a(e.author),1),t("div",_t,[t("div",pt,[t("p",ut,"$"+a(e.price),1),t("del",ht," $"+a(e.origin_price),1)])]),t("p",{class:"today-card-content text-overflow-4 text-center text-lg-start",innerHTML:e.content},null,8,ft),s(n,{to:`/products/${e.id}`,class:"stretched-link"},null,8,["to"])])])]),_:2},1024))),128))]),_:1},512)])]),t("section",wt,[t("div",mt,[t("div",bt,[gt,s(n,{to:{name:"products"}},{default:r(()=>[s(x)]),_:1})]),s(C),t("div",yt,[s(h,{init:"false",ref:"publishSwiper",class:"container px-5"},{default:r(()=>[(o(!0),l(d,null,_(i.filterResult,e=>(o(),f(u,{key:`publish${e.id}`,class:"h-auto d-flex justify-content-center my-5"},{default:r(()=>[s(j,{item:e},null,8,["item"])]),_:2},1024))),128))]),_:1},512)])])]),t("section",vt,[xt,t("div",St,[t("div",kt,[s(h,{class:"container rank-swiper",init:"false",ref:"rankSwiper","thumbs-swiper":"#rank-thumbs"},{default:r(()=>[(o(!0),l(d,null,_(i.productList,(e,m)=>(o(),f(u,{key:`publish${m}`,"data-index":m+1},{default:r(()=>[t("div",Pt,[t("span",$t,a(m+1),1),b(" "+a(e.title),1)])]),_:2},1032,["data-index"]))),128))]),_:1},512)]),t("div",Lt,[s(h,{init:"false",ref:"rankContentSwiper",class:"container rank-content-swiper",id:"rank-thumbs"},{default:r(()=>[(o(!0),l(d,null,_(i.productList,(e,m)=>(o(),f(u,null,{default:r(()=>[t("div",Vt,[t("div",Ct,[t("img",{src:e.imageUrl,alt:e.title,class:"w-100 object-fit-contain"},null,8,jt)]),t("div",Tt,[t("h4",zt,a(e.title),1),t("div",At,[t("p",Bt,a(e.author),1),t("div",It,[t("p",Mt,"$"+a(e.price),1),t("del",Rt," $"+a(e.origin_price),1)])]),t("p",{class:"today-card-content text-overflow-4",innerHTML:e.content},null,8,Ft),s(n,{to:`/products/${e.id}`,class:"stretched-link"},null,8,["to"])])])]),_:2},1024))),256))]),_:1},512)])])]),t("section",Ht,[t("div",Ut,[t("div",Nt,[Et,s(n,{to:{name:"articles"}},{default:r(()=>[s(x)]),_:1})]),t("ul",Ot,[(o(!0),l(d,null,_(i.articleList,e=>(o(),l("li",{class:"col-md-4",key:e.id},[s(T,{article:e},null,8,["article"])]))),128))])])]),t("div",Dt,[qt,s(A,{to:{name:"products"},class:"btn btn-outline-light rounded-pill fs-6 px-4 py-2"},{default:r(()=>[b(" 探索書店 "),s(z,{icon:["fas","chevron-right"],class:"ms-2 fa-sm"})]),_:1})])])}const ie=L(Q,[["render",Gt],["__scopeId","data-v-645d9208"]]);export{ie as default};
