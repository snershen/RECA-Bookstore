import{z as c}from"./index-6b9a9c15.js";import{s as n}from"./toastMixin-b579257b.js";import{s as e}from"./alertMixin-35895543.js";import{A as d,B as h,C as i,D as l,E as u}from"./apis-b1e9b367.js";function o(t){let r=t.toString();return r=r.replace(/\B(?=(\d{3})+(?!\d))/g,","),r}const g=c("cartStore",{state:()=>({cartList:[],cartLength:0,saveMoney:0,productCount:0,toastContent:{},isLoading:!1,isClicked:!1}),getters:{getCartSort:t=>{t.sort((r,a)=>r.price-a.price)}},actions:{getCart(){d().then(t=>{this.cartList=t.data.data,this.cartList.carts.forEach(r=>{r.final_total=o(r.final_total),r.total=o(r.total)}),this.cartList.final_total=Math.round(this.cartList.final_total),this.cartLength=t.data.data.carts.length,this.saveMoney=Math.round(t.data.data.total-t.data.data.final_total),this.saveMoney=o(this.saveMoney),this.cartList.final_total=o(this.cartList.final_total),this.cartList.total=o(this.cartList.total)}).catch(t=>{console.error(t)})},deleteCart(t){h(t).then(()=>{this.getCart()}).catch(r=>{console.error(r)})},editCart(t,r){this.productCount=t.qty,this.isClicked=!0,r?this.productCount++:this.productCount>0&&this.productCount--;const a={data:{product_id:t.product_id,qty:this.productCount}};i(t.id,a).then(()=>{t.qty=this.productCount,t.qty===0&&e({title:"確定要移除該商品嗎？",showCancelButton:!0,icon:"info"}).then(s=>{s.isConfirmed&&(this.deleteCart(t.id),this.getCart())}),this.getCart()}).catch(s=>{console.error(s)}).finally(()=>{this.isClicked=!1})},changeCartNum(t){if(this.productCount=t.qty,!Number(t.qty)&&t.qty!==0){n({title:"數量必須為數字",icon:"error"}),t.qty=1;return}if(t.qty<0){t.qty=1,this.productCount=t.qty;const a={data:{product_id:t.product_id,qty:this.productCount}};i(t.id,a).then(s=>{this.getCart()});return}else if(t.qty===0){e({title:"確定要移除該商品嗎？",showDenyButton:!0,icon:"info",denyButtonText:"保留"}).then(a=>{a.isConfirmed?(this.deleteCart(t.id),this.getCart()):a.isDenied&&(t.qty=1)}).catch(a=>{console.error(a)});return}const r={data:{product_id:t.product_id,qty:this.productCount}};i(t.id,r).then(a=>{this.getCart()}).catch(a=>{console.error(a)})},deleteAllCart(){e({title:"確定要移除購物車所有商品嗎？",showCancelButton:!0,icon:"info"}).then(t=>{t.isConfirmed&&l().then(r=>{this.isLoading=!1,this.getCart()})}).catch(t=>{console.error(t)})},addCart(t){u({data:{product_id:t,qty:1}}).then(a=>{n({title:"成功加入購物車",icon:"success"}),this.getCart()}).catch(a=>{console.error(a)})}}});export{g as c};
