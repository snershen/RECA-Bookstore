import{u as _,x as h,_ as f,r as l,o as u,c as g,a as e,e as n,w as p,t as i}from"./index-e3e4c989.js";import{p as a}from"./product-defc8536.js";const x={data(){return{isSolid:!1,storageObj:{}}},props:{item:Object},computed:{icon(){return this.isSolid?["fas","heart"]:["far","heart"]},..._(a,["collectList","collectStorage","singleSelected"])},methods:{...h(a,["addOrRemoveCollect","getStorage"]),changeCollectIcon(){this.isSolid=!this.isSolid},handleCollectBtn(s){this.changeCollectIcon(),this.addOrRemoveCollect(s,this.isSolid)},initializeIsSolid(){const o=Array.from(this.collectStorage).filter(t=>t.id===this.item.id);o.length>0&&(this.isSolid=!!o[0].isSolid)}},created(){this.getStorage(),this.initializeIsSolid()},beforeCreate(){this.$route.name==="index"?document.body.classList.add("index-card-style"):document.body.classList.remove("index-card-style")}},b={class:"position-relative px-3 py-4 d-flex flex-column w-100 bg-white h-100 product-card"},y={class:"rounded-circle bg-white shadow-sm"},S=["src","alt"],w={class:"text-center flex-grow-1 d-flex flex-column"},v={class:"category fs-7 text-gray mb-1"},C=["innerHTML"],L={class:"time fs-7 text-gray"},k={class:"d-flex justify-content-center align-items-center"},I={class:"fw-bold me-2"},B={class:"fs-7 text-gray text-decoration-line-through"};function j(s,o,t,O,r,c){const d=l("font-awesome-icon"),m=l("RouterLink");return u(),g("div",b,[e("button",{type:"button",class:"like-btn btn btn-white position-absolute top-0 end-0 pt-2 pe-2 border-0",onClick:o[0]||(o[0]=p(R=>c.handleCollectBtn(t.item,r.isSolid),["prevent"]))},[e("span",y,[n(d,{icon:c.icon,class:"text-primary"},null,8,["icon"])])]),e("img",{src:t.item.imageUrl,alt:t.item.title,class:"mb-3 w-100 object-fit-contain",height:"160"},null,8,S),e("div",w,[e("p",v,i(t.item.category),1),e("h4",{class:"fs-6 fw-bold text-overflow-2 flex-grow-1",innerHTML:t.item.title},null,8,C),e("time",L,i(t.item.time),1),n(m,{to:`/products/${t.item.id}`,class:"stretched-link"},null,8,["to"]),e("div",k,[e("p",I,"$"+i(t.item.price),1),e("p",B,"$"+i(t.item.origin_price),1)])])])}const z=f(x,[["render",j],["__scopeId","data-v-4b954280"]]);export{z as P};
