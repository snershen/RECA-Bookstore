<template>
  <Loading :active="isLoading"></Loading>

  <div class="d-flex justify-content-between align-items-center">
    <h1 class="fs-3 fw-bold">文章管理</h1>
    <button class="btn btn-primary" type="button" @click.prevent="openModal(true)">新增文章</button>
  </div>
  <table class="table table-hover mt-4 align-middle">
    <thead>
      <tr>
        <th width="120">建立時間</th>
        <th width="120">文章名稱</th>
        <th>文章描述</th>
        <th width="120">作者</th>
        <th width="120">標籤</th>
        <th width="100">是否公開</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="article in articles" :key="article.id">
        <td>{{ article.create_at }}</td>
        <td>{{ article.title }}</td>
        <td>{{ article.description }}</td>
        <td class="text-right">{{ article.author }}</td>
        <td class="text-right">{{ article.tag }}</td>
        <td>
          <span class="text-success" v-if="article.isPublic">公開</span>
          <span class="text-muted" v-else>未公開</span>
        </td>
        <td>
          <div>
            <button class="btn btn-success btn-sm me-1" @click="openModal(false, article)">
              <font-awesome-icon :icon="['fas', 'pen']" />
            </button>
            <button class="btn btn-danger btn-sm" @click.prevent="delOrder(article)">
              <font-awesome-icon :icon="['fas', 'trash-can']" />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ArticleModal
    ref="ArticleModal"
    @update-article="updateArticle"
    :innerArticle="tempArticle"
  ></ArticleModal>
</template>

<script>
import { adminGetArticleAll } from '@/utils/apis'
import { adminGetSingleArticle } from '@/utils/apis'
import { adminPostArticle } from '@/utils/apis'
import { adminPutArticle } from '@/utils/apis'
import { adminDeleteArticle } from '@/utils/apis'

import ArticleModal from '@/components/admin/ArticleModal.vue'
import toastMixin from '@/mixins/toastMixin'

export default {
  data() {
    return {
      articles: [],
      tempArticle: {}
    }
  },
  components: {
    ArticleModal
  },
  mixins: [toastMixin],
  methods: {
    getArticles() {
      adminGetArticleAll().then((res) => {
        console.log(res)
        this.articles = res.data.articles
        this.articles.forEach((item) => {
          const year = new Date(item.create_at).getFullYear()
          const month = new Date(item.create_at).getMonth() + 1
          const day = new Date(item.create_at).getDate()
          item.create_at = `${year}-${month}-${day}`
        })
      })
    },
    openModal(isNew, article) {
      if (isNew) {
        this.tempArticle = { isPublic: false }
      } else {
        adminGetSingleArticle(article.id).then((res) => {
          console.log(res)
          this.tempArticle = res.data.article
        })
      }
      this.isNew = isNew
      const articleComponent = this.$refs.ArticleModal
      articleComponent.showModal()
    },
    deleteArticle(article) {
      adminDeleteArticle(article.id).then((res) => {
        console.log(res)
        this.getArticles()
      })
    },
    updateArticle(article) {
      const articleComponent = this.$refs.ArticleModal
      this.tempArticle = { ...article }
      // 將日期轉換為時間戳記
      // this.tempArticle.due_date = Number(new Date(this.tempArticle.due_date).getTime())
      // console.log(this.tempArticle.due_date)
      // console.log(this.tempArticle)
      if (this.isNew) {
        this.tempArticle.create_at = new Date().getTime()
        adminPostArticle({ data: this.tempArticle }).then((res) => {
          this.getArticles()
          this.showToast({ title: res.data.message, icon: 'success' })
          console.log(res)
        })
      } else {
        adminPutArticle(article.id, { data: this.tempArticle }).then((res) => {
          this.getArticles()
          this.showToast({ title: res.data.message, icon: 'success' })
          console.log(res)
        })
      }

      articleComponent.hideModal()
    }
  },

  created() {
    this.getArticles()
  }
}
</script>
