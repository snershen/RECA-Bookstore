import{s as S,u as C,_ as T,o as r,c as a,a as t,F as d,e as u,n as M,t as n,T as z,r as c,f as o,h as i,y as l,i as v,p as F,j as I}from"./index-ed25072b.js";import{u as m}from"./product-541822f8.js";import{a as $}from"./article-8f38e3cf.js";import{a as N}from"./order-83c74db6.js";import{u as R}from"./apis-cc65c95d.js";import{P as U}from"./ProductCard-399eb850.js";import{A as O}from"./ArticleCard-2ae54393.js";import{L as D}from"./Loading-e3295b62.js";import{B as E}from"./BtnMore-c71b5147.js";import{S as G,a as J}from"./swiper-vue-478fb69c.js";import"./sweetalert2.all-a1700339.js";import"./timeFormat-77515bb4.js";import"./order-9073c011.js";import"./cart-fb30ae21.js";const Q={computed:{...S(m,["productList","categoryList","selectedCategory"])},methods:{...C(m,["getProducts","filterProduct","getProductAll","sortProduct","sortTimeLower"]),directProductPage(){this.$router.push("/products"),this.searchString=""},async handleFilter(s){await this.filterProduct(s),await this.sortTimeLower()}},async created(){await this.getProducts(),await this.filterProduct(this.categoryList[0]),await this.sortTimeLower()}},q={class:"nav-wrapper"},K={class:"nav nav-pills mb-3 flex-nowrap text-nowrap overflow-x-scroll",id:"pills-tab",role:"tablist"},W=["onClick"];function X(s,p,b,L,y,k){return r(),a("div",q,[t("ul",K,[(r(!0),a(d,null,u(s.categoryList,x=>(r(),a("li",{class:"nav-item",role:"presentation",key:x},[t("button",{class:M(["nav-link",{active:s.selectedCategory===x}]),id:"pills-home-tab","data-bs-toggle":"pill","data-bs-target":"#pills-home",type:"button",role:"tab","aria-controls":"pills-home","aria-selected":"true",onClick:h=>k.handleFilter(x)},n(x),11,W)]))),128))])])}const Y=T(Q,[["render",X],["__scopeId","data-v-d2bf5c9a"]]);const Z={data(){return{rankList:[],indexLoading:!1,bannerSwiper:{spaceBetween:60,centeredSlides:!0,breakpoints:{576:{slidesPerView:1},768:{slidesPerView:3},1024:{slidesPerView:5}}},todaySwiper:{slidesPerView:1,spaceBetween:20,navigation:!0,loop:!0,breakpoints:{576:{slidesPerView:1},1024:{slidesPerView:6},1300:{slidesPerView:6}}},publishSwiper:{slidesPerView:1,spaceBetween:18,scrollbar:!0,navigation:!0,loop:!1,breakpoints:{576:{slidesPerView:1},768:{slidesPerView:3},1024:{slidesPerView:4},1400:{slidesPerView:6}}},rankSwiper:{slidesPerView:1,direction:"vertical",watchSlidesProgress:!0,autoScrollOffset:1,observer:!0,observeParents:!0,breakpoints:{576:{slidesPerView:1},1024:{slidesPerView:5}}},rankContentSwiper:{modules:[z],observer:!0,observeParents:!0,slidesPerView:1}}},components:{ProductCard:U,ArticleCard:O,Tabs:Y,BtnMore:E,LoadingComponent:D,Swiper:G,SwiperSlide:J},computed:{filterToday(){return m().productAll.sort((s,p)=>{if(s.time&&p.time)return p.time.localeCompare(s.time)})},filterFeature(){return m().productAll.filter(s=>s.is_feature)},...S(m,["productList","categoryList","filterResult","isLoading"]),...S($,["articleList"]),...S(N,["sortSoldNum"])},methods:{...C($,["getArticles"]),initializeSwiper(s,p){const b=s,L={observer:!0,observeParents:!0,loop:!0,autoplay:!0,injectStylesUrls:["./custom_swiper.css"],...p};Object.assign(b,L),b.initialize()},async getRankArticle(){try{const p=(await R("-NrQ8wc--1weD4FTHjHH")).data.article.content,b=JSON.parse(p);this.rankList=b}catch(s){console.error(s),this.rankList=this.productList}}},async mounted(){this.indexLoading=!0;try{await Promise.all([m().getProducts(),this.getArticles(),m().getProductAll(),this.getRankArticle()])}catch(s){console.error("An error occurred during Promise.all:",s)}this.indexLoading=!0,this.initializeSwiper(this.$refs.bannerSwiper,this.bannerSwiper),this.initializeSwiper(this.$refs.todaySwiper,this.todaySwiper),this.initializeSwiper(this.$refs.publishSwiper,this.publishSwiper),this.initializeSwiper(this.$refs.rankSwiper,this.rankSwiper),this.initializeSwiper(this.$refs.rankContentSwiper,this.rankContentSwiper),this.indexLoading=!1}},g=s=>(F("data-v-18a6b0db"),s=s(),I(),s),tt={class:"banner py-6 vh-100"},et=g(()=>t("h1",{class:"banner-title text-center fw-bold pt-lg-4"},[v(" 踏上探索之旅"),t("br"),v("尋找屬於自己的命定之書 ")],-1)),st=g(()=>t("p",{class:"banner-subtitle text-center mt-2 fs-4 text-white"},"上萬本書籍等待你的閱讀",-1)),rt={class:"container"},ot=["src","alt"],it={class:"container py-6"},nt={class:"d-flex justify-content-between align-items-center"},at=g(()=>t("h2",{class:"fw-bold fs-2"},"今日熱門",-1)),lt={class:"position-relative"},ct={class:"today-card"},dt={class:"today-card-img mb-3"},_t=["src","alt"],ut={class:"flex-grow-1 w-100"},pt=["innerHTML"],ht={class:"text-gray text-overflow-1 text-center text-lg-start"},ft={class:"today-card-price align-items-center align-items-lg-start justify-content-center justify-content-lg-start flex-lg-column"},wt={class:"d-flex align-items-center"},mt={class:"fw-bold me-2 fs-3"},gt={class:"fs-7 text-gray"},bt=["innerHTML"],yt={class:"bg-primary-light py-6"},xt={class:"container"},vt={class:"d-flex justify-content-between align-items-center mb-4"},kt=g(()=>t("h2",{class:"fw-bold fs-2"},"最新出版",-1)),St={class:"position-relative"},Lt={class:"container py-6"},Pt=g(()=>t("h2",{class:"fw-bold fs-2 mb-5"},"暢銷排行",-1)),$t={class:"row"},Ct={class:"col-lg-3"},Tt={class:"border-bottom py-2 text-truncate"},jt={class:"me-2 rank-number"},Vt={class:"border-bottom py-2 text-truncate"},At={class:"me-2 rank-number"},Bt={class:"col-lg-9"},Ht={class:"rank-card d-flex flex-column flex-md-row position-relative text-center text-lg-start"},Mt={class:"rank-card-img mb-3 mb-lg-0"},zt=["src","alt"],Ft={class:"flex-grow-1 w-100"},It={class:"fs-4 fs-lg-3 rank-card-title fw-bold text-overflow-2 flex-grow-1 text-center text-md-start"},Nt={class:"rank-card-price align-items-center align-items-md-start justify-content-center justify-content-lg-start flex-column mb-3"},Rt={class:"text-gray mb-1"},Ut={class:"d-flex align-items-center"},Ot={class:"fw-bold me-2 fs-3"},Dt={class:"fs-7 text-gray"},Et=["innerHTML"],Gt={class:"rank-card d-flex flex-column flex-md-row position-relative text-center text-lg-start"},Jt={class:"rank-card-img mb-3 mb-lg-0"},Qt=["src","alt"],qt={class:"flex-grow-1 w-100"},Kt={class:"fs-4 fs-lg-3 rank-card-title fw-bold text-overflow-2 flex-grow-1 text-center text-md-start"},Wt={class:"rank-card-price align-items-center align-items-md-start justify-content-center justify-content-lg-start flex-column mb-3"},Xt={class:"text-gray mb-1"},Yt={class:"d-flex align-items-center"},Zt={class:"fw-bold me-2 fs-3"},te={class:"fs-7 text-gray"},ee=["innerHTML"],se={class:"bg-primary-light py-5"},re={class:"container py-5"},oe={class:"d-flex justify-content-between align-items-center mb-4"},ie=g(()=>t("h2",{class:"fw-bold fs-2"},"編輯推薦",-1)),ne={class:"row"},ae={class:"bookstore-bg text-center"},le=g(()=>t("h3",{class:"fs-1 fw-bold text-primary mb-4"},"開啟屬於你的閱讀旅程",-1));function ce(s,p,b,L,y,k){const x=c("LoadingComponent"),h=c("RouterLink"),f=c("swiper-slide"),w=c("swiper-container"),P=c("BtnMore"),j=c("Tabs"),V=c("ProductCard"),A=c("ArticleCard"),B=c("font-awesome-icon"),H=c("router-link");return r(),a(d,null,[o(x,{isLoading:y.indexLoading},null,8,["isLoading"]),t("main",null,[t("section",tt,[et,st,t("div",rt,[o(w,{init:"false",ref:"bannerSwiper",class:"container banner-swiper pt-5"},{default:i(()=>[(r(!0),a(d,null,u(k.filterFeature,e=>(r(),l(f,{key:`banner${e.id}`,class:"h-auto d-flex justify-content-center",lazy:"true"},{default:i(()=>[o(h,{to:`/products/${e.id}`},{default:i(()=>[t("img",{src:e.imageUrl,alt:e.title,class:"w-100 h-100 object-fit-contain",loading:"lazy"},null,8,ot)]),_:2},1032,["to"])]),_:2},1024))),128))]),_:1},512)])]),t("section",it,[t("div",nt,[at,o(h,{to:{name:"products"}},{default:i(()=>[o(P)]),_:1})]),t("div",lt,[o(w,{init:"false",ref:"todaySwiper",class:"container swiper-today my-5"},{default:i(()=>[(r(!0),a(d,null,u(k.filterToday,e=>(r(),l(f,{key:`today${e.id}`,class:"h-auto"},{default:i(()=>[t("div",ct,[t("div",dt,[t("img",{src:e.imageUrl,alt:e.title,class:"w-100 h-100 object-fit-contain"},null,8,_t)]),t("div",ut,[t("h4",{class:"today-card-title fw-bold text-overflow-2 flex-grow-1 mb-1 text-center text-lg-start",innerHTML:e.title},null,8,pt),t("p",ht,n(e.author),1),t("div",ft,[t("div",wt,[t("p",mt,"$"+n(e.price),1),t("del",gt," $"+n(e.origin_price),1)])]),t("p",{class:"today-card-content text-overflow-4 text-center text-lg-start",innerHTML:e.content},null,8,bt),o(h,{to:`/products/${e.id}`,class:"stretched-link"},null,8,["to"])])])]),_:2},1024))),128))]),_:1},512)])]),t("section",yt,[t("div",xt,[t("div",vt,[kt,o(h,{to:{name:"products"}},{default:i(()=>[o(P)]),_:1})]),o(j),t("div",St,[o(w,{init:"false",ref:"publishSwiper",class:"container px-5"},{default:i(()=>[(r(!0),a(d,null,u(s.filterResult,e=>(r(),l(f,{key:`publish${e.id}`,class:"h-auto d-flex justify-content-center my-5"},{default:i(()=>[o(V,{item:e},null,8,["item"])]),_:2},1024))),128))]),_:1},512)])])]),t("section",Lt,[Pt,t("div",$t,[t("div",Ct,[y.rankList.length>9?(r(),l(w,{key:0,class:"container rank-swiper",init:"false",ref:"rankSwiper","thumbs-swiper":"#rank-thumbs"},{default:i(()=>[(r(!0),a(d,null,u(y.rankList,(e,_)=>(r(),l(f,{key:`publish${_}`,"data-index":_+1},{default:i(()=>[t("div",Tt,[t("span",jt,n(_+1),1),v(" "+n(e.product.title),1)])]),_:2},1032,["data-index"]))),128))]),_:1},512)):(r(),l(w,{key:1,class:"container rank-swiper",init:"false",ref:"rankSwiper","thumbs-swiper":"#rank-thumbs"},{default:i(()=>[(r(!0),a(d,null,u(s.productList,(e,_)=>(r(),l(f,{key:`publish${_}`,"data-index":_+1},{default:i(()=>[t("div",Vt,[t("span",At,n(_+1),1),v(" "+n(e.title),1)])]),_:2},1032,["data-index"]))),128))]),_:1},512))]),t("div",Bt,[y.rankList.length>9?(r(),l(w,{key:0,init:"false",ref:"rankContentSwiper",class:"container rank-content-swiper",id:"rank-thumbs"},{default:i(()=>[(r(!0),a(d,null,u(y.rankList,(e,_)=>(r(),l(f,null,{default:i(()=>[t("div",Ht,[t("div",Mt,[t("img",{src:e.product.imageUrl,alt:e.product.title,class:"w-100 object-fit-contain"},null,8,zt)]),t("div",Ft,[t("h4",It,n(e.product.title),1),t("div",Nt,[t("p",Rt,n(e.product.author),1),t("div",Ut,[t("p",Ot,"$"+n(e.product.price),1),t("del",Dt," $"+n(e.product.origin_price),1)])]),t("p",{class:"today-card-content text-overflow-4",innerHTML:e.product.content},null,8,Et),o(h,{to:`/products/${e.product.id}`,class:"stretched-link"},null,8,["to"])])])]),_:2},1024))),256))]),_:1},512)):(r(),l(w,{key:1,init:"false",ref:"rankContentSwiper",class:"container rank-content-swiper",id:"rank-thumbs"},{default:i(()=>[(r(!0),a(d,null,u(s.productList,(e,_)=>(r(),l(f,null,{default:i(()=>[t("div",Gt,[t("div",Jt,[t("img",{src:e.imageUrl,alt:e.title,class:"w-100 object-fit-contain"},null,8,Qt)]),t("div",qt,[t("h4",Kt,n(e.title),1),t("div",Wt,[t("p",Xt,n(e.author),1),t("div",Yt,[t("p",Zt,"$"+n(e.price),1),t("del",te," $"+n(e.origin_price),1)])]),t("p",{class:"today-card-content text-overflow-4",innerHTML:e.content},null,8,ee),o(h,{to:`/products/${e.id}`,class:"stretched-link"},null,8,["to"])])])]),_:2},1024))),256))]),_:1},512))])])]),t("section",se,[t("div",re,[t("div",oe,[ie,o(h,{to:{name:"articles"}},{default:i(()=>[o(P)]),_:1})]),t("ul",ne,[(r(!0),a(d,null,u(s.articleList,e=>(r(),a("li",{class:"col-md-4",key:e.id},[o(A,{article:e},null,8,["article"])]))),128))])])]),t("div",ae,[le,o(H,{to:{name:"products"},class:"btn btn-outline-light rounded-pill fs-6 px-4 py-2"},{default:i(()=>[v(" 探索書店 "),o(B,{icon:["fas","chevron-right"],class:"ms-2 fa-sm"})]),_:1})])])],64)}const Se=T(Z,[["render",ce],["__scopeId","data-v-18a6b0db"]]);export{Se as default};
