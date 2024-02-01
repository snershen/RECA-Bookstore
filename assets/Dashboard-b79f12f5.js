import{b as w,c as $}from"./apis-ec1d0107.js";import{t as k}from"./toastMixin-4c8eb1fa.js";import{_ as p,r as a,o as r,c as i,a as t,F as R,d as y,e as n,f as h,g as m,t as v,n as N,w as u,p as L,h as C}from"./index-f2fabb71.js";import"./sweetalert2.all-b2eb1d9f.js";const I={data(){return{childrenRoute:[],currentRoute:"產品管理"}},mixins:[k],methods:{logout(){w().then(e=>{this.$router.push({name:"admin-login"}),this.showToast({title:"已登出",icon:"success"})}).catch(e=>{console.error(e)})}},created(){this.childrenRoute=this.$router.options.routes.find(e=>e.path==="/admin").children}},f=e=>(L("data-v-65975d26"),e=e(),C(),e),S={class:"dashboard position-fixed start-0 top-0 vh-100 d-flex flex-column py-3 pt-4"},V=f(()=>t("a",{class:"navbar-brand fs-4 text-white d-flex align-items-center gap-2",href:"#"},[t("span",{class:"fs-4 fw-bold border-secondary border-4 ps-4"},"RECA書店")],-1)),B=f(()=>t("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation"},[t("span",{class:"navbar-toggler-icon"})],-1)),D={class:"collapse navbar-collapse d-block flex-column justify-content-between w-100",id:"navbarNav"},T={class:"navbar-nav flex-column w-100"},j={class:"nav-item"};function E(e,c,b,g,o,l){const d=a("RouterLink");return r(),i("nav",S,[V,B,t("div",D,[t("ul",T,[(r(!0),i(R,null,y(o.childrenRoute,s=>(r(),i("li",j,[n(d,{class:N(["nav-link",{active:o.currentRoute===s.meta.title}]),to:{name:s.name},onClick:u(_=>o.currentRoute=s.meta.title,["prevent"])},{default:h(()=>[m(v(s.meta.title),1)]),_:2},1032,["to","class","onClick"])]))),256))]),t("a",{class:"nav-link text-start w-100 mt-5",href:"#",onClick:c[0]||(c[0]=u((...s)=>l.logout&&l.logout(...s),["prevent"]))},"登出")])])}const F=p(I,[["render",E],["__scopeId","data-v-65975d26"]]);const M={data(){return{username:""}},components:{Navbar:F},created(){$().then(e=>{this.$router.push({name:"admin-products"}),this.username=sessionStorage.getItem("username"),e.data.success||this.$router.push({name:"admin-login"})}).catch(e=>{this.$router.push({name:"admin-login"}),console.error(e)})}},z={class:"d-flex bg-light min-height-100"},A={class:"view-area ms-auto"},H={class:"border-bottom py-3 bg-white"},q={class:"container d-flex align-items-center justify-content-between"},G={class:"d-flex align-items-center"},J={class:"container py-4"};function K(e,c,b,g,o,l){const d=a("Navbar"),s=a("font-awesome-icon"),_=a("RouterLink"),x=a("RouterView");return r(),i("div",z,[n(d,{class:"border-end"}),t("div",A,[t("div",H,[t("div",q,[t("div",G,[n(s,{icon:["fas","user"],class:"me-2"}),t("p",null,"Hi, "+v(o.username),1)]),n(_,{to:{name:"index"},target:"_blank"},{default:h(()=>[m("回到前台")]),_:1})])]),t("div",J,[n(x,{isLoading:e.isLoading},null,8,["isLoading"])])])])}const W=p(M,[["render",K],["__scopeId","data-v-c9b4733d"]]);export{W as default};