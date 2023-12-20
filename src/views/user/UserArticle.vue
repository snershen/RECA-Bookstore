<template>
  <nav aria-label="breadcrumb"></nav>
  <div>
    <div class="container">
      <breadcrumb
        :breadConfig="{ navList: '編輯推薦', path: 'article', title: article.title }"
      ></breadcrumb>
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="d-flex align-items-center">
              <a href="#" class="btn btn-secondary rounded-0 me-3 px-2 py-1 fs-6">{{
                article.tag
              }}</a>
            </div>
            <p class="fs-7">{{ article.create_at }}</p>
          </div>
          <h2 class="mb-1 fw-bold mb-3 fs-1">{{ article.title }}</h2>
          <p class="mb-4">作者 / {{ article.author }}</p>
        </div>
      </div>
    </div>

    <div v-if="isValidURL(article.image)">
      <img :src="article.image" alt="" height="350" class="w-100 object-fit-cover mb-5" />
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <p class="fs-5">{{ article.content }}</p>
        </div>
      </div>
    </div>
    <div class="bg-light py-5 mt-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <h3 class="fs-2 fw-bold">更多文章</h3>
            <article-card :colConfig="{ article: articles, titleFont: 'fs-5' }"></article-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userGetSingleArticle } from '../../utils/apis'
import breadcrumb from '../../components/Breadcrumb.vue'
import { timeFormat } from '../../utils/timeFormat'
import { userGetArticles } from '../../utils/apis'
import ArticleCard from '../../components/ArticleCard.vue'

export default {
  data() {
    return {
      article: {},
      articles: []
    }
  },
  components: { breadcrumb, ArticleCard },
  methods: {
    getSingleArticle() {
      const path = this.$route.fullPath.split('/')
      const id = path[path.length - 1]
      userGetSingleArticle(id).then((res) => {
        console.log(res)
        this.article = res.data.article
        timeFormat(this.article, 'create_at')
      })
    },
    getArticles() {
      userGetArticles().then((res) => {
        this.articles = res.data.articles
        timeFormat(this.articles, 'create_at')
      })
    },
    isValidURL(str) {
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
      return urlPattern.test(str) ? true : false
    }
  },
  created() {
    this.getSingleArticle()
    this.getArticles()
  }
}
</script>
