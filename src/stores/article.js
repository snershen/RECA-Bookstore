import { defineStore } from 'pinia'
import { userGetArticles } from '@/assets/js/apis'
import { userGetSingleArticle } from '@/assets/js/apis'
import { timeFormat } from '@/assets/js/timeFormat'
import { textBreak } from '@/assets/js/textBreak'

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
        this.article.content = textBreak(this.article.content, 3)
      })
    }
  }
})
