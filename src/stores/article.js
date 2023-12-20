import { defineStore } from 'pinia'
import { userGetArticles } from '@/utils/apis'
import { userGetSingleArticle } from '@/utils/apis'
import { timeFormat } from '@/utils/timeFormat'

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
      userGetArticles().then((res) => {
        this.isLoading = false
        this.articleList = res.data.articles
        timeFormat(this.articleList, 'create_at')
      })
    },
    getSingleArticle(id) {
      this.isLoading = true
      userGetSingleArticle(id).then((res) => {
        this.isLoading = false
        this.article = res.data.article
        timeFormat(this.article, 'create_at')
      })
    }
  }
})
