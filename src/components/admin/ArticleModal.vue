<template>
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

            <div class="mb-3 col-6">
              <label for="tag" class="form-label">標籤</label>
              <select
                class="form-select w-100"
                aria-label="Default select example"
                id="tag"
                v-model="tempArticle.tag"
              >
                <option value="" disabled selected>選擇標籤</option>
                <option value="編輯精選">編輯精選</option>
                <option value="讀者投稿">讀者投稿</option>
              </select>
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
            <div class="col-12">
              <div class="mb-3">
                <label for="title" class="form-label">文章描述</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入文章描述"
                  v-model="tempArticle.description"
                />
              </div>
            </div>
            <div class="mb-3 col-12">
              <div class="form-check ps-0">
                <label for="title" class="form-label">文章內容</label>
                <ckeditor
                  :editor="editor"
                  v-model="tempArticle.content"
                  :config="editorConfig"
                ></ckeditor>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-dark" @click="$emit('update-article', tempArticle)">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  data() {
    return {
      tempArticle: { tag: '' },
      isNew: true,
      editor: ClassicEditor,
      editorData: '<p>請輸入內容</p>',
      editorConfig: {}
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
