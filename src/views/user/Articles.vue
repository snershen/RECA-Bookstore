<template>
  <div class="container py-5">
    <h1 class="fw-bold mb-4">編輯推薦</h1>
    <div class="row">
      <div class="col-lg-8 order-1 order-lg-0 overflow-hidden">
        <ul class="row" v-if="filterResult.length === 0 && !isSearch">
          <li v-for="(item, index) in articleList" class="col-12">
            <ArticleCard
              :article="item"
              data-aos="fade-left"
              data-aos-duration="1000"
              :data-aos-delay="500 * index"
            />
          </li>
        </ul>
        <div v-else-if="filterResult.length !== 0 && isSearch">
          <p class="fs-3 fw-bold">"{{ newSearchString }}" 搜尋結果</p>
          <ul class="row">
            <li v-for="item in filterResult" class="col-12">
              <div>
                <ArticleCard :article="item" />
              </div>
            </li>
          </ul>
        </div>
        <div v-else>
          <div class="px-3 py-2 text-center">
            <p class="fs-3 fw-bold mb-4">"{{ newSearchString }}" 搜尋結果</p>
            <p class="fs-5 fw-bold mb-5">查詢不到相關文章<br />看看其他文章吧</p>
            <img src="@/assets/img/article-empty.png" alt="查無文章" class="img-fluid w-50" />
          </div>
        </div>
      </div>
      <div class="offset-lg-1 col-lg-3 mb-4 mb-lg-0">
        <div class="d-flex align-items-center">
          <div class="position-relative me-2 w-100">
            <font-awesome-icon
              :icon="['fas', 'magnifying-glass']"
              class="text-dark position-absolute top-50 start-0 translate-middle-y ms-3"
            />
            <input
              type="text"
              placeholder="搜尋文章"
              class="d-block w-100 ps-5 form-control"
              v-model="searchString"
            />
          </div>
          <button type="button" class="btn btn-dark text-nowrap" @click.prevent="filterArticle">
            搜尋
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import articleStore from '@/stores/article.js'

import ArticleCard from '@/components/user/ArticleCard.vue'

export default {
  data() {
    return { filterResult: [], searchString: '', isSearch: false, newSearchString: '' }
  },
  components: { ArticleCard },
  computed: {
    ...mapState(articleStore, ['articleList'])
  },
  methods: {
    ...mapActions(articleStore, ['getArticles']),
    filterArticle() {
      this.isSearch = true
      const newStr = this.searchString.trim()
      this.newSearchString = newStr
      const result = this.articleList.filter((item) => {
        return item.title.includes(newStr)
      })

      this.filterResult = result
    }
  },
  created() {
    this.getArticles()
    this.isSearch = false
  }
}
</script>
