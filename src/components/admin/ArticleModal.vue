<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="isNew">新增文章</span>
            <span v-else>編輯文章</span>
          </h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="mb-3">
                <label for="price" class="form-label">文章名稱</label>
                <input
                  type="text"
                  class="form-control"
                  id="unit"
                  placeholder="請輸入文章名稱"
                  v-model="tempArticle.title"
                />
              </div>
            </div>
            <div class="col-12 col-lg-6">
              <div class="mb-3">
                <label for="title" class="form-label">文章描述</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入文章描述"
                  v-model="tempArticle.description"
                />
              </div>
            </div>
            <div class="mb-3 col-12 col-lg-6">
              <label for="category" class="form-label">上傳圖片</label>
              <input
                type="text"
                class="form-control"
                id="category"
                placeholder="請輸入圖片網址"
                v-model="tempArticle.image"
              />
            </div>
            <div class="mb-3 col-12 col-lg-6">
              <label for="origin_price" class="form-label">作者</label>
              <input
                type="text"
                class="form-control"
                id="origin_price"
                placeholder="請輸入作者"
                v-model="tempArticle.author"
              />
            </div>
            <div class="mb-3 col-12 col-lg-6">
              <label for="origin_price" class="form-label">標籤</label>
              <input
                type="text"
                class="form-control"
                id="origin_price"
                placeholder="請輸入標籤"
                v-model="tempArticle.tag"
              />
            </div>
            <div class="mb-3 col-12 col-lg-6">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :true-value="true"
                  :false-value="false"
                  id="is_enabled"
                  v-model="tempArticle.isPublic"
                />
                <label class="form-check-label" for="is_enabled"> 是否公開</label>
              </div>
            </div>
            <div class="mb-3 col-12">
              <div class="form-check ps-0">
                <label for="title" class="form-label">文章內容</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="title"
                  rows="10"
                  placeholder="請輸入文章內容"
                  v-model="tempArticle.content"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-article', tempArticle)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  data() {
    return {
      tempArticle: {},
      isNew: true
    }
  },
  mixins: [modalMixin],
  props: {
    innerArticle: {
      type: Object,
      default() {
        return {}
      }
    },
    innerNew: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  watch: {
    //監聽對象要和元件名稱相同
    innerArticle() {
      this.tempArticle = this.innerArticle
    },
    innerNew() {
      this.isNew = this.innerNew
    }
  },

  created() {
    this.tempArticle.isPublic = false
  }
}
</script>
