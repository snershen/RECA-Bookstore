<template>
  <LoadingComponent></LoadingComponent>
  <div>
    <template v-if="isValidURL(article.image)">
      <div class="article-banner" :style="{ backgroundImage: `url(${article.image})` }">
        <div class="container py-lg-5 pb-5 pt-4 article-content">
          <Breadcrumb
            :breadConfig="{ path: 'articles', subNav: '編輯推薦', title: article.title }"
          ></Breadcrumb>
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <div class="text-center">
                <span href="#" class="me-3 fs-6"># {{ article.tag }}</span>
                <h2 class="mb-1 fw-bold mb-1 fs-lg-1 fs-2 ls-lg">{{ article.title }}</h2>
                <div class="d-flex align-items-center justify-content-center">
                  <p class="me-3">作者 / {{ article.author }}</p>
                  <p class="fs-7 ls-lg">{{ article.create_at }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- <div v-if="isValidURL(article.image)">
      <img :src="article.image" alt="" height="500" class="w-100 object-fit-cover mb-lg-5" />
    </div> -->
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <p class="fs-6 py-5" v-html="article.content"></p>
        </div>
      </div>
    </div>
    <div class="bg-light py-5 mt-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h3 class="fs-2 fw-bold mb-4">更多文章</h3>
            <ul class="row">
              <li v-for="item in articleList" class="col-lg-4">
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
import Breadcrumb from '@/components/user/Breadcrumb.vue'
import ArticleCard from '@/components/user/ArticleCard.vue'
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
  props: ['id'],
  created() {
    this.getSingleArticle(this.id)
    this.getArticles()
  }
}
</script>

<style lang="scss" scoped>
.article-banner {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  color: white;
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: #8d8366 !important;
    opacity: 0.7;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
}

.article-content {
  position: relative;
  z-index: 100;
}
</style>
