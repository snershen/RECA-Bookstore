<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
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
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  placeholder="請輸入圖片連結"
                  v-model="tempProduct.imageUrl"
                />
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label"
                  >或 上傳圖片
                  <i class="fas fa-spinner fa-spin"></i>
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  @change="uploadFile"
                  ref="fileInput"
                />
              </div>
              <img class="img-fluid" alt="" />
              <!-- 延伸技巧，多圖 -->
              <div class="mt-5">
                <div class="mb-3 input-group">
                  <input type="url" class="form-control form-control" placeholder="請輸入連結" />
                  <button type="button" class="btn btn-outline-danger">移除</button>
                </div>
                <div>
                  <button class="btn btn-dark btn-sm d-block w-100">新增圖片</button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入標題"
                  v-model="tempProduct.title"
                />
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="category"
                    v-model="tempProduct.category"
                  >
                    <option disabled value="">選擇分類</option>
                    <option>文學小說</option>
                    <option>社會科學</option>
                    <option>商業理財</option>
                    <option>勵志成長</option>
                    <option>生活風格</option>
                    <option>醫療保健</option>
                    <option>旅遊觀光</option>
                    <option>電腦科技</option>
                  </select>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <input
                    type="text"
                    class="form-control"
                    id="unit"
                    placeholder="請輸入單位"
                    v-model="tempProduct.unit"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="origin_price"
                    placeholder="請輸入原價"
                    v-model="tempProduct.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    placeholder="請輸入售價"
                    v-model="tempProduct.price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="publish" class="form-label">出版社</label>
                  <input
                    type="text"
                    class="form-control"
                    id="publish"
                    placeholder="請輸入出版社"
                    v-model="tempProduct.publish"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="time" class="form-label">出版年份</label>
                  <input
                    type="date"
                    class="form-control"
                    id="time"
                    placeholder="請輸入"
                    v-model="tempProduct.time"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="author" class="form-label">作者</label>
                  <input
                    type="text"
                    class="form-control"
                    id="author"
                    placeholder="請輸入作者"
                    v-model="tempProduct.author"
                  />
                </div>
              </div>

              <hr />
              <div class="mb-3">
                <label for="author_content" class="form-label">作者介紹</label>
                <ckeditor
                  :editor="editor"
                  v-model="tempProduct.author_content"
                  :config="editorConfig"
                ></ckeditor>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">目錄</label>
                <ckeditor
                  :editor="editor"
                  v-model="tempProduct.description"
                  :config="editorConfig"
                ></ckeditor>
              </div>

              <div class="mb-3">
                <label for="content" class="form-label">內容簡介</label>
                <ckeditor
                  :editor="editor"
                  v-model="tempProduct.content"
                  :config="editorConfig"
                ></ckeditor>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-gray"
            data-bs-dismiss="modal"
            @click.prevent="hideModal"
          >
            取消
          </button>
          <button type="button" class="btn btn-dark" @click="$emit('update-product', tempProduct)">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { adminUploadImg } from '@/assets/js/apis'

export default {
  data() {
    return {
      modal: {},
      tempProduct: { category: ""},
      editor: ClassicEditor,
      editorData: '<p>請輸入內容</p>',
      editorConfig: {}
    }
  },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    },
    isNew: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    product() {
      this.tempProduct = this.product
    }
  },
  methods: {
    showModal() {
      this.modal.show()
    },
    hideModal() {
      this.modal.hide()
    },
    uploadFile() {
      const uploadedFile = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      adminUploadImg(formData).then((res) => {
        if (res.data.success) {
          this.tempProduct.imageUrl = res.data.imageUrl
        }
      })
    },
    handleCategoryChange(event) {
      this.tempProduct.category = event.target.value
    }
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal, { keyboard: false, backdrop: 'static' })
  }
}
</script>
