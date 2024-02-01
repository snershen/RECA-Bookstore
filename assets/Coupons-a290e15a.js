import{p as x,q as y,r as k,s as M}from"./apis-75edfbd9.js";import{m as N}from"./modalMixin-dbb0e79f.js";import{_ as f,o as a,c as d,a as o,b as r,v as u,m as P,r as _,w as b,F as C,d as L,e as m,n as $,t as h}from"./index-e3e4c989.js";import{P as U}from"./Pagination-70611799.js";import{t as V}from"./toastMixin-5685921e.js";import{a as B}from"./alertMixin-f398faca.js";import{t as D}from"./timeFormat-77515bb4.js";import"./modal-8c1c62b8.js";import"./selector-engine-e34fc7a1.js";import"./sweetalert2.all-79737a9a.js";const E={data(){return{modal:{},tempCoupon:{},isNew:!0}},mixins:[N],props:{innerCoupon:{type:Object,default(){return{is_enabled:0}}},innerNew:{type:Boolean,default(){return!0}}},watch:{innerCoupon(){this.tempCoupon=this.innerCoupon},innerNew(){this.isNew=this.innerNew}}},T={class:"modal fade",id:"exampleModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},F={class:"modal-dialog modal-dialog-centered modal-lg",role:"document"},j={class:"modal-content border-0"},A={class:"modal-header bg-dark text-white"},I={class:"modal-title",id:"exampleModalLabel"},q={key:0},z={key:1},G=o("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),O={class:"modal-body"},S={class:"row"},H={class:"col-12 col-lg-6"},J={class:"mb-3"},K=o("label",{for:"price",class:"form-label"},"折扣碼",-1),Q={class:"col-12 col-lg-6"},R={class:"mb-3"},W=o("label",{for:"title",class:"form-label"},"優惠券名稱",-1),X={class:"mb-3 col-12 col-lg-6"},Y=o("label",{for:"category",class:"form-label"},"使用期限",-1),Z={class:"mb-3 col-12 col-lg-6"},oo=o("label",{for:"origin_price",class:"form-label"},"折扣",-1),to={class:"mb-3 col-12 col-lg-6"},eo={class:"form-check"},no=o("label",{class:"form-check-label",for:"is_enabled"}," 是否啟用 ",-1),so={class:"modal-footer"},io=o("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function lo(i,t,n,c,e,p){return a(),d("div",T,[o("div",F,[o("div",j,[o("div",A,[o("h5",I,[e.isNew?(a(),d("span",q,"新增優惠券")):(a(),d("span",z,"編輯優惠券"))]),G]),o("div",O,[o("div",S,[o("div",H,[o("div",J,[K,r(o("input",{type:"text",class:"form-control",id:"unit",placeholder:"請輸入折扣碼","onUpdate:modelValue":t[0]||(t[0]=s=>e.tempCoupon.code=s)},null,512),[[u,e.tempCoupon.code]])])]),o("div",Q,[o("div",R,[W,r(o("input",{type:"text",class:"form-control",id:"title",placeholder:"請輸入優惠券名稱","onUpdate:modelValue":t[1]||(t[1]=s=>e.tempCoupon.title=s)},null,512),[[u,e.tempCoupon.title]])])]),o("div",X,[Y,r(o("input",{type:"date",class:"form-control",id:"category",placeholder:"請輸入使用期限","onUpdate:modelValue":t[2]||(t[2]=s=>e.tempCoupon.due_date=s)},null,512),[[u,e.tempCoupon.due_date]])]),o("div",Z,[oo,r(o("input",{type:"number",max:"99",min:"1",class:"form-control",id:"origin_price",placeholder:"請輸入折扣","onUpdate:modelValue":t[3]||(t[3]=s=>e.tempCoupon.percent=s)},null,512),[[u,e.tempCoupon.percent]])]),o("div",to,[o("div",eo,[r(o("input",{class:"form-check-input",type:"checkbox","true-value":1,"false-value":0,id:"is_enabled","onUpdate:modelValue":t[4]||(t[4]=s=>e.tempCoupon.is_enabled=s)},null,512),[[P,e.tempCoupon.is_enabled]]),no])])])]),o("div",so,[io,o("button",{type:"button",class:"btn btn-dark",onClick:t[5]||(t[5]=s=>i.$emit("update-product",e.tempCoupon))}," 確認 ")])])])],512)}const ao=f(E,[["render",lo]]),po={data(){return{coupons:[],pagination:{},tempCoupon:{is_enabled:0},isLoading:!1,isNew:!0}},components:{CouponModal:ao,Pagination:U},mixins:[V,B],methods:{getCoupons(i=1){this.isLoading=!0,x(i).then(t=>{console.log(t),this.isLoading=!1,this.coupons=t.data.coupons,this.pagination=t.data.pagination,D(this.coupons,"due_date"),this.coupons.forEach(n=>{n.percent%10===0?n.percent=`${n.percent/10} 折`:n.percent=`${n.percent} 折`})})},delCoupon(i){this.showAlert({title:"確定刪除嗎?",icon:"warning",showCancelButton:!0}).then(t=>{t.isConfirmed&&y(i.id).then(n=>{console.log(n),this.getCoupons(),this.showAlert({icon:"success",title:n.data.message})})})},updateCoupon(i){const t=this.$refs.CouponModal;this.tempCoupon=i,this.tempCoupon.due_date=Number(new Date(this.tempCoupon.due_date).getTime()),console.log(this.tempCoupon.due_date),this.isNew?k({data:this.tempCoupon}).then(n=>{this.getCoupons(),this.showToast({title:n.data.message,icon:"success"}),console.log(n)}):M({data:this.tempCoupon},this.tempCoupon.id).then(n=>{this.getCoupons(),this.showToast({title:n.data.message,icon:"success"}),console.log(n)}),this.tempCoupon.percent=parseInt(this.tempCoupon.percent),t.hideModal()},openModal(i,t){if(i)this.tempCoupon={is_enabled:0};else{this.tempCoupon={...t};let c=parseInt(this.tempCoupon.percent);c/10<1?this.tempCoupon.percent=c*10:this.tempCoupon.percent=c}this.isNew=i,this.$refs.CouponModal.showModal()}},created(){this.getCoupons()}},co={class:"d-flex justify-content-between align-items-center mb-4"},ro=o("h1",{class:"fs-3 fw-bold font-sans"},"優惠券管理",-1),uo={class:"table-overflow"},mo={class:"table table-hover align-middle"},ho=o("thead",null,[o("tr",null,[o("th",{width:"15%"},"折扣碼"),o("th",{width:"10%"},"優惠券類型"),o("th",{width:"10%"},"優惠券折扣"),o("th",{width:"10%"},"到期日"),o("th",{width:"10%"},"是否啟用"),o("th",{width:"10%"},"編輯")])],-1),_o={class:"text-right"},bo={class:"text-right"},Co={key:0,class:"text-success"},fo={key:1,class:"text-muted"},go=["onClick"],wo=["onClick"];function vo(i,t,n,c,e,p){const s=_("font-awesome-icon"),g=_("Pagination"),w=_("CouponModal");return a(),d(C,null,[o("div",co,[ro,o("button",{class:"btn btn-dark",type:"button",onClick:t[0]||(t[0]=b(l=>p.openModal(!0),["prevent"]))},"新增優惠券")]),o("div",{class:$([{isLoading:e.isLoading},"px-4 py-2 bg-white rounded-3"])},[o("div",uo,[o("table",mo,[ho,o("tbody",null,[(a(!0),d(C,null,L(e.coupons,l=>(a(),d("tr",null,[o("td",null,h(l.code),1),o("td",null,h(l.title),1),o("td",_o,h(l.percent),1),o("td",bo,h(l.due_date),1),o("td",null,[l.is_enabled?(a(),d("span",Co,"啟用")):(a(),d("span",fo,"未啟用"))]),o("td",null,[o("div",null,[o("button",{class:"btn btn-success btn-sm me-1",onClick:v=>p.openModal(!1,l)},[m(s,{icon:["fas","pen"]})],8,go),o("button",{class:"btn btn-danger btn-sm",onClick:b(v=>p.delCoupon(l),["prevent"])},[m(s,{icon:["fas","trash-can"]})],8,wo)])])]))),256))])])]),m(g,{"inner-pagination":e.pagination,onEmitPage:p.getCoupons,class:"py-5"},null,8,["inner-pagination","onEmitPage"]),m(w,{ref:"CouponModal","inner-coupon":e.tempCoupon,"inner-new":e.isNew,onUpdateProduct:p.updateCoupon},null,8,["inner-coupon","inner-new","onUpdateProduct"])],2)],64)}const Bo=f(po,[["render",vo]]);export{Bo as default};
