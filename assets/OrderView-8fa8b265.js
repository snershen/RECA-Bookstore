import{_ as w,u as y,x as n,r as l,o,c as e,f as _,h as g,a as t,t as r,l as p,i as h,F as k,e as v,w as S,p as O,j as C}from"./index-6b9a9c15.js";import{o as m}from"./order-a604ab5d.js";import{c as I}from"./cart-9199942e.js";import"./apis-b1e9b367.js";import"./timeFormat-77515bb4.js";import"./toastMixin-b579257b.js";import"./alertMixin-35895543.js";const L={data(){return{orderProductList:{}}},computed:{...y(m,["order"])},props:["id"],methods:{...n(I,["getCart"]),...n(m,["getSingleOrder","payMoney"]),getOrderItem(){const a=Object.keys(this.order.products).map(i=>this.order.products[i]);this.orderProductList=a}},async created(){await this.getSingleOrder(this.id),this.getOrderItem(),this.getCart()}},d=s=>(O("data-v-9142d950"),s=s(),C(),s),V={class:"container py-5"},N={class:"row"},$={class:"offset-lg-3 col-lg-6"},B=d(()=>t("h2",{class:"text-center fw-bold mb-4"},"訂單明細",-1)),M={class:"w-100 mb-4"},P={class:"border-bottom"},j=d(()=>t("td",{class:"fw-bold"},"訂單編號",-1)),F={class:"border-bottom"},G=d(()=>t("td",{class:"fw-bold",width:"25%"},"訂單時間",-1)),R={width:"75%"},q={class:"border-bottom"},A=d(()=>t("td",{class:"fw-bold"},"付款狀態",-1)),D={key:0,class:"text-success"},E={key:0,class:"me-2"},T={key:1,class:"text-danger"},x={class:"border-bottom"},z=d(()=>t("td",{class:"fw-bold"},"總額",-1)),H={class:"border-bottom"},J=d(()=>t("td",{class:"fw-bold"},"訂購品項",-1)),K={class:"list-unordered ps-3"},Q={class:"row"},U={class:"col-9 col-lg-10"},W={class:"col-3 col-lg-2"},X={class:"border-bottom"},Y=d(()=>t("td",{class:"fw-bold"},"訂單留言",-1)),Z={key:0},tt={key:1};function st(s,a,i,ot,u,et){const b=l("font-awesome-icon"),f=l("RouterLink");return o(),e("div",V,[_(f,{to:{name:"orders"},class:"btn btn-outline-secondary"},{default:g(()=>[_(b,{icon:["fas","circle-arrow-left"],class:"me-2"}),h("返回")]),_:1}),t("div",N,[t("div",$,[B,t("table",M,[t("tr",P,[j,t("td",null,r(s.order.id),1)]),t("tr",F,[G,t("td",R,r(s.order.create_at),1)]),t("tr",q,[A,s.order.is_paid?(o(),e("td",D,[s.order.is_paid?(o(),e("span",E,r(s.order.paid_date),1)):p("",!0),h("已付款 ")])):(o(),e("td",T,"未付款"))]),t("tr",x,[z,t("td",null,"$ "+r(s.order.total),1)]),t("tr",H,[J,t("td",null,[t("ul",K,[(o(!0),e(k,null,v(u.orderProductList,c=>(o(),e("li",{key:c.id,class:"mb-1"},[t("div",Q,[t("span",U,r(c.product.title),1),t("span",W,r(c.qty)+"本",1)])]))),128))])])]),t("tr",X,[Y,s.order.message?(o(),e("td",Z,r(s.order.message),1)):(o(),e("td",tt,"-"))])]),s.order.is_paid?p("",!0):(o(),e("a",{key:0,href:"#",class:"btn btn-secondary w-100 mb-3 py-2",onClick:a[0]||(a[0]=S(c=>s.payMoney(i.id),["prevent"]))},"立刻付款"))])])])}const _t=w(L,[["render",st],["__scopeId","data-v-9142d950"]]);export{_t as default};
