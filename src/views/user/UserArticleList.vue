<template>
  <LoadingComponent></LoadingComponent>
  <div class="container mb-5">
    <h1 class="fw-bold mb-4">編輯推薦</h1>
    <div class="row">
      <div class="col-8">
        <ul class="row">
          <li v-for="item in articleList" class="col-12">
            <div>
              <ArticleCard :article="item"></ArticleCard>
            </div>
          </li>
        </ul>
      </div>
      <div class="offset-lg-1 col-3">
        <div class="position-relative">
          <font-awesome-icon
            :icon="['fas', 'magnifying-glass']"
            class="text-dark position-absolute top-50 start-0 translate-middle-y ms-3"
          />
          <input type="text" placeholder="搜尋文章" class="d-block w-100 ps-5 form-control" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import articleStore from '@/stores/article.js'

import LoadingComponent from '@/components/Loading.vue'
import ArticleCard from '@/components/ArticleCard.vue'

export default {
  components: { ArticleCard, LoadingComponent },
  computed: {
    ...mapState(articleStore, ['articleList'])
  },
  methods: {
    ...mapActions(articleStore, ['getArticles'])
  },
  created() {
    this.getArticles()
  }
}
</script>
