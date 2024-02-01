import{u as x}from"./apis-75edfbd9.js";import{t as k}from"./toastMixin-5685921e.js";import{_ as L,u as $,x as V,r as v,o as c,c as n,a as t,w as d,k as b,F as j,d as N,t as a,b as y,v as C,e as r,f as h,j as S,n as B,g as i,p as A,h as M}from"./index-e3e4c989.js";import{c as w}from"./cart-a41ecefe.js";import"./sweetalert2.all-79737a9a.js";const I="/RECA-Bookstore/assets/cart-empty-2878a2a2.png";const U={data(){return{couponCode:"",hasCoupon:!1}},mixins:[k],computed:{...$(w,["cartList","saveMoney","cartLength"])},methods:{...V(w,["getCart","deleteCart","editCart","changeCartNum","deleteAllCart"]),checkCoupon(){this.hasCoupon=!1;const s={data:{code:this.couponCode}};x(s).then(l=>{l.data.success&&(this.hasCoupon=!0,this.getCart());const f=l.data.message;this.showToast({title:f,icon:"info"})})}},created(){this.getCart()}},o=s=>(A("data-v-33fe036c"),s=s(),M(),s),q={class:"container py-5"},T={class:"d-flex justify-content-between align-items-center mb-4"},D=o(()=>t("h1",{class:"fw-bold"},"購物車",-1)),E={key:0,class:"text-lg-center px-0 list-unstyled"},F=S('<li class="row d-flex d-lg-none justify-content-center" data-v-33fe036c><div class="bg-light text-center py-2 ps-2 fs-7" data-v-33fe036c>品項</div></li><li class="row bg-light py-2 d-none d-lg-flex" data-v-33fe036c><div class="col-1" data-v-33fe036c></div><ul class="row list-unstyled col-11" data-v-33fe036c><li class="col-5" data-v-33fe036c>商品名稱</li><li class="col-2" data-v-33fe036c>價格</li><li class="col-2" data-v-33fe036c>數量</li><li class="col-2" data-v-33fe036c>小計</li><li class="col-1" data-v-33fe036c></li></ul></li>',2),z={class:"col-lg-1 col-3"},R=["src"],G={class:"row list-unstyled col-lg-11 col-9 align-items-center"},H={class:"col-lg-5 col-12"},J={class:"col-lg-2 col-6"},K={class:"text-decoration-line-through text-gray"},O={class:"col-lg-2 col-6 ms-auto text-end text-lg-center"},P={class:"d-flex align-items-center justify-content-center"},Q=["onClick"],W=["onUpdate:modelValue","onBlur"],X=["onClick"],Y={class:"col-lg-2 col-6"},Z=o(()=>t("span",{class:"d-lg-none d-inline-block"},"小計",-1)),tt={class:"col-lg-1 col-6 ms-auto text-end"},st=["onClick"],et={class:"row bg-light py-4 mb-4 px-4 fs-6 fw-bold"},ot=o(()=>t("div",{class:"offset-lg-8 col-lg-1 col-6 text-start"},"總計",-1)),lt={class:"col-lg-3 text-end col-6"},ct={class:"row mb-4 px-4 fs-6 fw-bold align-items-center"},nt=o(()=>t("div",{class:"offset-lg-8 col-lg-1 col-12 text-start mb-2 mb-lg-0"},"優惠券",-1)),at={class:"col-lg-3 col-12 d-flex align-items-center justify-content-end mb-2"},it={key:0,class:"text-end"},dt={class:"row mb-4 pb-4 px-4 fs-6 fw-bold border-bottom"},rt=o(()=>t("div",{class:"offset-lg-8 col-lg-1 col-6 text-start"},"折扣",-1)),_t={class:"col-lg-3 text-end col-6"},pt={class:"row mb-4 pb-4 px-4 fs-6 fw-bold"},ut=o(()=>t("div",{class:"offset-lg-8 col-lg-1 col-6 text-start"},"總計",-1)),ht={class:"col-lg-3 text-end col-6 fs-5"},ft={key:1,class:"text-center fs-3 fw-bold"},gt=o(()=>t("p",{class:"mb-5"},[i("購物車目前沒有商品"),t("br"),i("為自己創造閱讀時光吧")],-1)),mt=o(()=>t("div",{class:"text-center"},[t("img",{src:I,alt:"",class:"img-fluid"})],-1)),vt=[gt,mt],bt={key:2,class:"row justify-content-between py-5"},yt={class:"col-lg-4 col-12"},Ct=o(()=>t("span",{class:"btn-arrow btn-arrow-left me-2"},null,-1)),wt={class:"col-lg-4 col-12"},xt=o(()=>t("span",{class:"btn-arrow btn-arrow-right ms-2"},null,-1)),kt={key:3,class:"row justify-content-between py-5"},Lt={class:"col-lg-4 mx-auto"},$t=o(()=>t("span",{class:"me-2"},null,-1));function Vt(s,l,f,jt,g,m){const p=v("font-awesome-icon"),u=v("router-link");return c(),n("div",q,[t("div",T,[D,s.cartLength!==0?(c(),n("a",{key:0,href:"#",class:"btn btn-outline-secondary",onClick:l[0]||(l[0]=d((...e)=>s.deleteAllCart&&s.deleteAllCart(...e),["prevent"]))},"清空購物車")):b("",!0)]),s.cartLength!==0?(c(),n("ul",E,[F,(c(!0),n(j,null,N(s.cartList.carts,e=>(c(),n("li",{class:B(["row border-bottom py-3",{"d-none":e.qty===0}])},[t("div",z,[t("img",{src:e.product.imageUrl,alt:"",class:"img-fluid"},null,8,R)]),t("ul",G,[t("li",H,a(e.product.title),1),t("li",J,[i(" $"+a(e.product.price)+" ",1),t("span",K," $"+a(e.product.origin_price),1)]),t("li",O,[t("div",P,[t("a",{href:"#",onClick:d(_=>s.editCart(e,!1),["prevent"]),class:"pe-3 py-3"},[r(p,{icon:["fas","minus"]})],8,Q),y(t("input",{class:"form-control text-center",type:"number","onUpdate:modelValue":_=>e.qty=_,onBlur:d(_=>s.changeCartNum(e),["prevent"]),style:{width:"70px"}},null,40,W),[[C,e.qty]]),t("a",{href:"#",onClick:d(_=>s.editCart(e,!0),["prevent"]),class:"ps-3 py-3"},[r(p,{icon:["fas","plus"]})],8,X)])]),t("li",Y,[Z,i(" $"+a(e.total),1)]),t("li",tt,[t("a",{href:"#",class:"btn btn-outline-gray text-nowrap",onClick:d(_=>s.deleteCart(e.id),["prevent"])},[r(p,{icon:["fas","xmark"],class:"me-2"}),i("移除")],8,st)])])],2))),256)),t("li",null,[t("div",et,[ot,t("div",lt,"$"+a(s.cartList.total),1)]),t("div",ct,[nt,t("div",at,[y(t("input",{type:"text",placeholder:"填入優惠券",class:"form-control px-2 me-2","onUpdate:modelValue":l[1]||(l[1]=e=>g.couponCode=e)},null,512),[[C,g.couponCode]]),t("button",{type:"button",class:"btn btn-secondary text-nowrap",onClick:l[2]||(l[2]=d((...e)=>m.checkCoupon&&m.checkCoupon(...e),["prevent"]))}," 套用 ")]),this.hasCoupon?(c(),n("p",it,"已套用優惠券："+a(this.couponCode),1)):b("",!0)]),t("div",dt,[rt,t("div",_t,"- "+a(s.saveMoney),1)]),t("div",pt,[ut,t("div",ht,"$"+a(s.cartList.final_total),1)])])])):(c(),n("div",ft,vt)),s.cartLength?(c(),n("div",bt,[t("div",yt,[r(u,{to:{name:"products"},class:"btn btn-outline-secondary rounded-0 w-100 py-3 mb-3 mb-lg-0"},{default:h(()=>[Ct,i("繼續逛逛 ")]),_:1})]),t("div",wt,[r(u,{to:{name:"pay"},class:"btn btn-secondary rounded-0 w-100 py-3"},{default:h(()=>[i(" 前往結帳"),xt]),_:1})])])):(c(),n("div",kt,[t("div",Lt,[r(u,{to:{name:"products"},class:"btn btn-secondary rounded-0 w-100 py-3 mb-3 mb-lg-0"},{default:h(()=>[$t,i("繼續逛逛 ")]),_:1})])]))])}const It=L(U,[["render",Vt],["__scopeId","data-v-33fe036c"]]);export{It as default};