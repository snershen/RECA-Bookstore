import{$ as a}from"./index-e3e4c989.js";import{G as r,H as n}from"./apis-75edfbd9.js";import{t as i}from"./timeFormat-77515bb4.js";function c(t,e=0){return t.split(new RegExp("(?<=[.!?])\\s+(?=[^A-Za-z,\\s])|(?<=[^:\\s])\\s+(?=[^A-Za-z,\\s:])|(?<=[^A-Za-z:])\\s+(?=[^A-Za-z,\\s])|(?<=:\\s)\\s+")).filter(s=>s.trim()!=="").map(s=>`<p class="mb-${e}">${s.trim()}</p>`).join("")}const g=a("articleStore",{state:()=>({articleList:[],article:{},isLoading:!1}),actions:{getArticles(){this.isLoading=!0,r().then(t=>{this.isLoading=!1,this.articleList=t.data.articles,i(this.articleList,"create_at")})},getSingleArticle(t){this.isLoading=!0,n(t).then(e=>{this.isLoading=!1,this.article=e.data.article,i(this.article,"create_at"),this.article.content=c(this.article.content,3)})}}});export{g as a};
