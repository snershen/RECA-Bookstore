import{_ as m,s as v,u as p,r as w,o as s,c as o,a as t,i as _,t as r,b as k,v as S,w as I,F as h,e as b,q as n,f as g,h as f,p as x,j as R}from"./index-9f4adfae.js";import{o as y}from"./order-30f0a338.js";import{c as O}from"./cart-f0ed8814.js";import"./apis-7153f4ff.js";import"./timeFormat-77515bb4.js";import"./sweetalert2.all-dc88fea8.js";const C={data(){return{searchString:""}},computed:{...v(y,["orderList","orderResult","orderId","searchStr","isEmptyResult"])},methods:{...p(O,["getCart"]),...p(y,["getOrders","filterOrder","getOrderId"])},created(){this.getOrders(),this.getCart()}},a=d=>(x("data-v-94f6859c"),d=d(),R(),d),$={class:"container py-5"},L={class:"row"},V={class:"offset-lg-2 col-lg-8"},N=a(()=>t("h1",{class:"mb-4 fw-bold"},"所有訂單",-1)),B={class:"mb-3 row align-items-center gx-3"},E=a(()=>t("div",{class:"col-auto"},[t("label",{for:"orderInput",class:"form-label mb-0 pb-0"},"搜尋訂單")],-1)),D={class:"col-auto"},F={class:"col-auto"},M={class:"table table-hover align-middle"},T=a(()=>t("tr",{class:"bg-light"},[t("td",{width:"5%"}),t("td",{width:"20%"},"建立日期"),t("td",{width:"35%",class:"d-none d-lg-table-cell"},"訂單編號"),t("td",{width:"15%"},"金額"),t("td",{width:"10%"},"訂單狀態"),t("td",{width:"12%"})],-1)),j={key:0},q={class:"d-none d-lg-table-cell"},A={key:0,class:"text-success"},U={key:1,class:"text-danger"},z={key:1},G={class:"d-none d-lg-table-cell"},H={key:0,class:"text-success"},J={key:1,class:"text-danger"},K={key:2},P=a(()=>t("tr",{class:"border-bottom text-center fw-bold"},[t("td",{colspan:"8"},"查無符合訂單，請再次確認訂單編號")],-1)),Q=[P];function W(d,l,X,Y,c,Z){const u=w("RouterLink");return s(),o("div",$,[t("div",L,[t("div",V,[t("div",null,[t("div",null,[N,_(" "+r(d.orderId)+" ",1),t("div",B,[E,t("div",D,[k(t("input",{type:"text",placeholder:"請輸入訂單編號",class:"form-control px-2 me-2 rounded-0 col-lg-4",id:"orderInput","onUpdate:modelValue":l[0]||(l[0]=e=>c.searchString=e)},null,512),[[S,c.searchString]])]),t("div",F,[t("button",{type:"button",class:"btn btn-secondary",onClick:l[1]||(l[1]=I(e=>d.filterOrder(c.searchString),["prevent"]))}," 搜尋 ")])])]),t("table",M,[T,d.orderResult.length===0&&!d.isEmptyResult?(s(),o("tbody",j,[(s(!0),o(h,null,b(d.orderList,(e,i)=>(s(),o("tr",{key:e.id,class:"border-bottom"},[t("td",null,r(i+1),1),t("td",null,r(e.create_at),1),t("td",q,r(e.id),1),t("td",null,"$"+r(e.total),1),t("td",null,[e.is_paid?(s(),o("span",A,"已付款")):n("",!0),e.is_paid?n("",!0):(s(),o("span",U,"未付款"))]),t("td",null,[g(u,{to:`/orders/${e.id}`,class:"btn btn-outline-secondary"},{default:f(()=>[_("檢視")]),_:2},1032,["to"])])]))),128))])):d.orderResult.length!==0?(s(),o("tbody",z,[(s(!0),o(h,null,b(d.orderResult,(e,i)=>(s(),o("tr",{key:e.id,class:"border-bottom"},[t("td",null,r(i+1),1),t("td",null,r(e.create_at),1),t("td",G,r(e.id),1),t("td",null,"$"+r(e.total),1),t("td",null,[e.is_paid?(s(),o("span",H,"已付款")):n("",!0),e.is_paid?n("",!0):(s(),o("span",J,"未付款"))]),t("td",null,[g(u,{href:"#",class:"btn btn-outline-secondary",to:`/orders/${e.id}`},{default:f(()=>[_("檢視")]),_:2},1032,["to"])])]))),128))])):(s(),o("tbody",K,Q))])])])])])}const lt=m(C,[["render",W],["__scopeId","data-v-94f6859c"]]);export{lt as default};