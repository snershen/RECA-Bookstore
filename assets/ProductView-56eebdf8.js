import{S as V}from"./swiper-vue-ff0212e0.js";import{P as L}from"./ProductCard-adda90f1.js";import{P as z}from"./ProductCategory-b9f270b6.js";import{u as S,x as w,_ as k,o as c,c as u,a as t,w as n,q as g,l as b,F as $,r,f as i,t as a,h,i as C,e as O,k as j,p as N,j as A}from"./index-31ad7194.js";import{u as f}from"./product-e3985eb0.js";import{B as E}from"./BreadcrumbComponent-be159571.js";import{c as D}from"./cart-de66b42c.js";import"./toastMixin-5c5e123e.js";import"./apis-03452721.js";import"./alertMixin-bc4527b4.js";const M={data(){return{content:""}},computed:{...S(f,["singleProduct","singleProductId"])},methods:{...w(f,["getSingleProduct"])},async created(){await this.getSingleProduct(this.$route.params.id),this.content=await this.singleProduct.content}},F={class:"nav border-bottom mb-3"},H={key:1,class:"nav-item"},U={key:2,class:"nav-item"},q=["innerHTML"];function K(e,o,d,v,s,p){return c(),u($,null,[t("ul",F,[e.singleProduct.content?(c(),u("li",{key:0,class:"nav-item",onClick:o[0]||(o[0]=n(_=>s.content=e.singleProduct.content,["prevent"]))},[t("a",{class:g(["nav-link fs-6 ps-2",{active:s.content===e.singleProduct.content}]),"aria-current":"page",href:"#"},"本書簡介",2)])):b("",!0),e.singleProduct.author_content?(c(),u("li",H,[t("a",{class:g(["nav-link fs-6",{active:s.content===e.singleProduct.author_content}]),href:"#",onClick:o[1]||(o[1]=n(_=>s.content=e.singleProduct.author_content,["prevent"]))},"作者介紹",2)])):b("",!0),e.singleProduct.description?(c(),u("li",U,[t("a",{class:g(["nav-link fs-6",{active:s.content===e.singleProduct.description}]),href:"#",onClick:o[2]||(o[2]=n(_=>s.content=e.singleProduct.description,["prevent"]))},"目錄",2)])):b("",!0)]),t("ul",null,[t("li",{innerHTML:s.content},null,8,q)])],64)}const G=k(M,[["render",K],["__scopeId","data-v-74b2d3ab"]]);const J={data(){return{isSolid:!1,relatedResult:[],relatedSwiper:{slidesPerView:1,spaceBetween:18,navigation:!0,breakpoints:{576:{slidesPerView:2},768:{slidesPerView:3},1024:{slidesPerView:4}}}}},props:["id"],components:{ProductCard:L,ProductTab:G,ProductCategory:z,BreadcrumbComponent:E,SwiperSlide:V},computed:{...S(f,["singleProduct","productList","alikeProduct","collectList","collectStorage","isSolid","selectedSingle","filterResult"]),icon(){return this.isSolid?["fas","heart"]:["far","heart"]}},methods:{...w(D,["getCart","addCart"]),...w(f,["getSingleProduct","getProducts","filterProduct","showAlikeProduct","getStorage","addOrRemoveCollect"]),initializeIsSolid(){const o=Array.from(this.collectStorage).filter(d=>d.id===this.singleProduct.id);o.length>0&&(this.isSolid=!!o[0].isSolid)},changeCollectIcon(){this.isSolid=!this.isSolid},handleCollectBtn(e){this.changeCollectIcon(),this.addOrRemoveCollect(e,this.isSolid)},initializeSwiper(e,o){const d=e,v={autoplay:!0,injectStylesUrls:["./custom_swiper.css"],...o};Object.assign(d,v),d.initialize()}},async created(){await this.getSingleProduct(this.id);const e=await this.filterProduct(this.singleProduct.category,"related");this.relatedResult=await e.filter(o=>o.id!==this.singleProduct.id),document.title=`${this.singleProduct.title}｜RECA BOOKSTORE`},mounted(){this.getStorage(),setTimeout(()=>{this.initializeIsSolid(),this.initializeSwiper(this.$refs.relatedSwiper,this.relatedSwiper)},1e3)},watch:{"singleProduct.title":"updateDocumentTitle"}},m=e=>(N("data-v-f8ee6e60"),e=e(),A(),e),Q={class:"container py-5"},W={class:"row"},X={class:"col-md-3 d-none d-md-block mb-5"},Y={class:"col-md-9 col-12"},Z={class:"row"},tt={class:"col-lg-4 mb-3 mb-lg-0 text-center"},et={class:"px-5 mx-5 px-lg-0 mx-lg-0"},ot=["src","alt"],st={class:"col-lg-8 d-flex flex-column justify-content-between"},it={class:"mb-3 mb-lg-0"},nt={class:"font-sans fw-bold mb-3 mb-lg-5 fs-lg-2 fs-4"},lt={class:"mb-3 row"},rt=m(()=>t("div",{class:"col-lg-1 col-2 text-nowrap"},"作者：",-1)),ct={class:"col-6 ms-5"},dt={class:"mb-3 row"},at=m(()=>t("div",{class:"col-lg-1 col-2 text-nowrap"},"出版社：",-1)),ut={class:"col-6 ms-5"},pt={class:"mb-3 row"},gt=m(()=>t("div",{class:"col-lg-1 col-2 text-nowrap"},"出版日期：",-1)),mt={class:"col-6 ms-5"},_t={class:"mb-2 align-items-center row"},ht=m(()=>t("div",{class:"col-lg-1 col-2 text-nowrap"},"價格：",-1)),ft={class:"col-6 ms-5 d-flex align-items-center"},vt={class:"fs-3 fw-bold me-2"},bt={class:"fs-7 text-gray text-decoration-line-through"},wt={class:"row gx-2 d-lg-flex d-none"},Pt={class:"col-2 col-lg-2"},yt={class:"fa-lg text-white"},Ct={class:"col-lg-5 col-5"},St={class:"col-lg-5 col-5"},kt={class:"z-1000 row gx-2 position-fixed bottom-0 start-0 end-0 d-flex d-lg-none border-top py-2 px-2 bg-white shadow"},$t={class:"col-2 col-lg-2 order-1"},Bt={class:"fa-lg text-white"},xt={class:"col-lg-5 col-5"},It={class:"col-lg-5 col-5"},Rt={class:"col-12 py-5"},Tt=m(()=>t("h3",{class:"font-sans fs-4 ms-2 mb-3 fw-bold"},"更多相關商品",-1)),Vt={class:"position-relative"};function Lt(e,o,d,v,s,p){const _=r("BreadcrumbComponent"),B=r("ProductCategory"),P=r("font-awesome-icon"),y=r("RouterLink"),x=r("ProductTab"),I=r("ProductCard"),R=r("swiper-slide"),T=r("swiper-container");return c(),u("div",Q,[i(_,{class:"mb-4",breadConfig:{path:"products",subNav:"書籍類別",title:"書籍介紹"}}),t("div",W,[t("div",X,[i(B)]),t("div",Y,[t("div",Z,[t("div",tt,[t("div",et,[t("img",{src:e.singleProduct.imageUrl,alt:e.singleProduct,class:"img-fluid"},null,8,ot)])]),t("div",st,[t("div",it,[t("h3",nt,a(e.singleProduct.title),1),t("ul",null,[t("li",lt,[rt,t("div",ct,a(e.singleProduct.author),1)]),t("li",dt,[at,t("div",ut,a(e.singleProduct.publish),1)]),t("li",pt,[gt,t("div",mt,a(e.singleProduct.time),1)]),t("li",_t,[ht,t("div",ft,[t("p",vt,"$"+a(e.singleProduct.price),1),t("p",bt," $"+a(e.singleProduct.origin_price),1)])])])]),t("div",wt,[t("div",Pt,[t("a",{href:"#",class:g(["btn btn-gray w-100 py-3 rounded-2 border-0",{"bg-danger ":s.isSolid}]),onClick:o[0]||(o[0]=n(l=>p.handleCollectBtn(e.singleProduct),["prevent"]))},[t("span",yt,[i(P,{icon:p.icon},null,8,["icon"])])],2)]),t("div",Ct,[t("a",{href:"#",class:"btn btn-gray text-white w-100 py-3 rounded-0 mb-lg-0 mb-0 rounded-2",onClick:o[1]||(o[1]=n(l=>e.addCart(e.singleProduct.id),["prevent"]))},"加入購物車")]),t("div",St,[i(y,{to:{name:"cart"},class:"btn btn-primary text-white w-100 py-3 rounded-0 mb-lg-0 mb-2 rounded-2",onClick:o[2]||(o[2]=n(l=>e.addCart(e.singleProduct.id),["prevent"]))},{default:h(()=>[C("立即購買")]),_:1})])]),t("div",kt,[t("div",$t,[t("a",{href:"#",class:g(["btn btn-gray w-100 py-2 rounded-2 border-0",{"bg-danger ":s.isSolid}]),onClick:o[3]||(o[3]=n(l=>p.handleCollectBtn(e.singleProduct),["prevent"]))},[t("span",Bt,[i(P,{icon:p.icon},null,8,["icon"])])],2)]),t("div",xt,[t("a",{href:"#",class:"btn btn-gray text-white w-100 py-2 rounded-0 mb-lg-0 mb-0 rounded-2",onClick:o[4]||(o[4]=n(l=>e.addCart(e.singleProduct.id),["prevent"]))},"加入購物車")]),t("div",It,[i(y,{to:{name:"cart"},class:"btn btn-primary text-white w-100 py-2 rounded-0 mb-lg-0 rounded-2",onClick:o[5]||(o[5]=n(l=>e.addCart(e.singleProduct.id),["prevent"]))},{default:h(()=>[C("立即購買")]),_:1})])])]),t("div",Rt,[i(x)]),t("div",null,[Tt,t("div",Vt,[i(T,{init:"false",ref:"relatedSwiper",class:"container px-5"},{default:h(()=>[(c(!0),u($,null,O(s.relatedResult,l=>(c(),j(R,{key:l.id,class:"h-auto d-flex justify-content-center my-3 px-2"},{default:h(()=>[i(I,{item:l},null,8,["item"])]),_:2},1024))),128))]),_:1},512)])])])])])])}const Ut=k(J,[["render",Lt],["__scopeId","data-v-f8ee6e60"]]);export{Ut as default};
