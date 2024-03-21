import { defineStore } from 'pinia'
import { userGetArticles, userGetSingleArticle } from '@/assets/js/apis'
import { timeFormat } from '@/assets/js/timeFormat'

export default defineStore('articleStore', {
  state: () => {
    return {
      articleList: [],
      article: {},
      isLoading: false
    }
  },
  actions: {
    getArticles() {
      this.isLoading = true
      userGetArticles()
        .then((res) => {
          this.isLoading = false
          this.articleList = res.data.articles.filter((item) => item.title !== '排行榜')
          timeFormat(this.articleList, 'create_at')
        })
        .catch((err) => {
          console.error(err)
        })
    },
    getSingleArticle(id) {
      this.isLoading = true
      userGetSingleArticle(id)
        .then((res) => {
          this.isLoading = false
          this.article = res.data.article
          timeFormat(this.article, 'create_at')
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
})
