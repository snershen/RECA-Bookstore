<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h1 class="fs-3 fw-bold font-sans">文章管理</h1>
    <button class="btn btn-dark" type="button" @click.prevent="openModal(true)">新增文章</button>
  </div>
  <div :class="{ isLoading: isLoading }" class="px-4 py-2 bg-white rounded-3">
    <div class="table-overflow">
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th width="10%">建立時間</th>
            <th width="30%">文章名稱</th>
            <th width="10%">作者</th>
            <th width="10%">標籤</th>
            <th width="10%">是否公開</th>
            <th width="10%">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.id">
            <td>{{ article.create_at }}</td>
            <td>{{ article.title }}</td>
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
                <button class="btn btn-danger btn-sm" @click.prevent="deleteArticle(article)">
                  <font-awesome-icon :icon="['fas', 'trash-can']" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <PaginationComponent :inner-pagination="pagination" @emit-page="getArticles" class="py-5" />
    <ArticleModal
      ref="ArticleModal"
      @update-article="updateArticle"
      :innerArticle="tempArticle"
      :innerNew="isNew"
    />
  </div>
</template>

<script>
import { adminGetArticle, adminGetSingleArticle, adminPostArticle, adminPutArticle, adminDeleteArticle } from '@/assets/js/apis'

import ArticleModal from '@/components/admin/ArticleModal.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

import toastMixin from '@/mixins/toastMixin'
import alertMixin from '@/mixins/alertMixin'

export default {
  data() {
    return {
      articles: [],
      pagination: {},
      tempArticle: {},
      isLoading: false,
      isNew: true
    }
  },
  components: {
    ArticleModal,
    PaginationComponent
  },
  mixins: [toastMixin, alertMixin],
  methods: {
    getArticles(page = 1) {
      this.isLoading = true
      adminGetArticle(page)
        .then((res) => {
          this.isLoading = false
          this.articles = res.data.articles
          this.pagination = res.data.pagination
          this.articles.forEach((item) => {
            const year = new Date(item.create_at).getFullYear()
            const month = new Date(item.create_at).getMonth() + 1
            const day = new Date(item.create_at).getDate()
            item.create_at = `${year}-${month}-${day}`
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
    openModal(isNew, article) {
      if (isNew) {
        this.tempArticle = { isPublic: false }
      } else {
        adminGetSingleArticle(article.id).then((res) => {
          this.tempArticle = res.data.article
        })
      }
      this.isNew = isNew
      const articleComponent = this.$refs.ArticleModal
      articleComponent.showModal()
    },
    deleteArticle(article) {
      this.showAlert({ title: '確定刪除嗎?', icon: 'warning', showCancelButton: true }).then(
        (result) => {
          if (result.isConfirmed) {
            adminDeleteArticle(article.id)
              .then((res) => {
                this.getArticles()
              })
              .catch((err) => {
                console.error(err)
              })
          }
        }
      )
    },
    updateArticle(article) {
      const articleComponent = this.$refs.ArticleModal
      this.tempArticle = { ...article }
      if (this.isNew) {
        this.tempArticle.create_at = new Date().getTime()
        adminPostArticle({ data: this.tempArticle })
          .then((res) => {
            this.isLoading = true
            if (res.response) {
              this.showToast({ title: res.response.data.message, icon: 'error' })
            }
            if (res.data) {
              this.showToast({ title: res.data.message, icon: 'success' })
              this.getArticles()
              articleComponent.hideModal()
            }
          })
          .catch((err) => {
            console.error(err)
          })
          .finally(() => {
            this.isLoading = false
          })
      } else {
        adminPutArticle(article.id, { data: this.tempArticle })
          .then((res) => {
            if (res.response) {
              this.showToast({ title: res.response.data.message, icon: 'error' })
            }
            if (res.data) {
              this.showToast({ title: res.data.message, icon: 'success' })
              this.getArticles()
              articleComponent.hideModal()
            }
          })
          .catch((err) => {
            console.error(err)
          })
      }
    }
  },
  created() {
    this.getArticles()
  }
}
</script>
