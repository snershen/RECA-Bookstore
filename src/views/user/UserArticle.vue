<template>
  <LoadingComponent></LoadingComponent>
  <nav aria-label="Breadcrumb"></nav>
  <div>
    <div class="container">
      <Breadcrumb
        :breadConfig="{ path: 'article', subNav: '編輯推薦', title: article.title }"
      ></Breadcrumb>
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="d-flex align-items-center">
              <span href="#" class="text-secondary fw-bold me-3 px-2 py-1 fs-6"
                >#{{ article.tag }}</span
              >
            </div>
            <p class="fs-7">{{ article.create_at }}</p>
          </div>
          <h2 class="mb-1 fw-bold mb-1 fs-1">{{ article.title }}</h2>
          <p class="mb-4">作者 / {{ article.author }}</p>
        </div>
      </div>
    </div>

    <div v-if="isValidURL(article.image)">
      <img :src="article.image" alt="" height="350" class="w-100 object-fit-cover mb-lg-5" />
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <p class="fs-5 py-5">{{ article.content }}</p>
        </div>
      </div>
    </div>
    <div class="bg-light py-5 mt-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h3 class="fs-2 fw-bold mb-4">更多文章</h3>
            <ul class="row">
              <li v-for="item in articleList" class="col-lg-6">
                <div class="mb-3">
                  <ArticleCard :article="item"></ArticleCard>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../../components/Breadcrumb.vue'
import ArticleCard from '../../components/ArticleCard.vue'
import LoadingComponent from '@/components/Loading.vue'
import { mapState, mapActions } from 'pinia'
import articleStore from '@/stores/article.js'

export default {
  computed: {
    ...mapState(articleStore, ['articleList', 'article'])
  },
  components: { Breadcrumb, ArticleCard, LoadingComponent },
  methods: {
    ...mapActions(articleStore, ['getArticles', 'getSingleArticle']),

    isValidURL(str) {
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
      return urlPattern.test(str) ? true : false
    }
  },
  created() {
    const path = this.$route.fullPath.split('/')
    const id = path[path.length - 1]
    this.getSingleArticle(id)
    this.getArticles()
  }
}
</script>
