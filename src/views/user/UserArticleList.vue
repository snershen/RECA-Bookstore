<template>
  <div class="container mb-5">
    <h1 class="fw-bold">編輯推薦</h1>
    <div class="row">
      <div class="col-12 col-lg-8 order-1 order-lg-0">
        <ul>
          <li v-for="article in articleList" class="row border-bottom py-5 position-relative">
            <div class="col-5">
              <img :src="article.image" alt="" class="h-100 w-100 object-fit-cover" />
            </div>
            <div class="col-7">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="d-flex align-items-center">
                  <a href="#" class="btn btn-dark rounded-0 me-3 px-2 py-1 fs-7">{{
                    article.tag
                  }}</a>
                </div>
                <p class="fs-7">{{ article.create_at }}</p>
              </div>
              <h2 class="mb-1 fw-bold text-truncate">{{ article.title }}</h2>
              <p class="mb-5">作者 / {{ article.author }}</p>
              <p class="text-truncate">{{ article.description }}</p>
            </div>
            <a href="#" class="stretched-link" @click.prevent="goArticle(article)"></a>
          </li>
        </ul>
      </div>
      <div class="offset-lg-1 col-12 col-lg-3 pt-5">
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
import { userGetArticles } from '../../utils/apis'
import { timeFormat } from '../../utils/timeFormat'
export default {
  data() {
    return { articleList: [] }
  },
  methods: {
    getArticles() {
      userGetArticles().then((res) => {
        console.log(res)
        this.articleList = res.data.articles
        timeFormat(this.articleList, 'create_at')
      })
    },
    goArticle(article) {
      this.$router.push(`/user/article/${article.id}`)
    }
  },

  created() {
    this.getArticles()
  }
}
</script>

<style scoped>
li {
  transition: 0.5s;
}
li:hover {
  opacity: 0.7;
}
</style>
