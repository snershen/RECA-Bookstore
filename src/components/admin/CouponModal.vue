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
            <span v-if="isNew">新增優惠券</span>
            <span v-else>編輯優惠券</span>
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
                <label for="price" class="form-label">折扣碼</label>
                <input
                  type="price"
                  class="form-control"
                  id="unit"
                  placeholder="請輸入折扣碼"
                  v-model="tempCoupon.code"
                />
              </div>
            </div>
            <div class="col-12 col-lg-6">
              <div class="mb-3">
                <label for="title" class="form-label">優惠券名稱</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入優惠券名稱"
                  v-model="tempCoupon.title"
                />
              </div>
            </div>
            <div class="mb-3 col-12 col-lg-6">
              <label for="category" class="form-label">使用期限</label>
              <input
                type="date"
                class="form-control"
                id="category"
                placeholder="請輸入使用期限"
                v-model="tempCoupon.due_date"
              />
            </div>
            <div class="mb-3 col-12 col-lg-6">
              <label for="origin_price" class="form-label">折扣</label>
              <input
                type="number"
                max="99"
                min="1"
                class="form-control"
                id="origin_price"
                placeholder="請輸入折扣"
                v-model="tempCoupon.percent"
              />
            </div>
            <div class="mb-3 col-12 col-lg-6">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  id="is_enabled"
                  v-model="tempCoupon.is_enabled"
                />
                <label class="form-check-label" for="is_enabled"> 是否啟用 </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-dark" @click="$emit('update-product', tempCoupon)">
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
      modal: {},
      tempCoupon: {},
      isNew: true
    }
  },
  mixins: [modalMixin],
  props: {
    innerCoupon: {
      type: Object,
      default() {
        return { is_enabled: 0 }
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
    innerCoupon() {
      this.tempCoupon = this.innerCoupon
    },
    innerNew() {
      this.isNew = this.innerNew
    }
  }
}
</script>
