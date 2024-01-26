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
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content border-0 p-0">
        <div class="modal-header bg-dark text-white">
          <h2 class="modal-title" id="exampleModalLabel">
            <span>訂單詳情</span>
          </h2>

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
                <ul>
                  <li class="mb-3">
                    <h3 class="fs-5">訂單日期</h3>
                    <p>{{ tempOrder.create_at }}</p>
                  </li>
                  <li class="mb-3">
                    <h3 class="fs-5">訂單編號</h3>
                    <p>{{ tempOrder.id }}</p>
                  </li>
                  <li class="pb-3 border-bottom">
                    <h3 class="fs-5">付款狀態</h3>
                    <span v-if="tempOrder.is_paid" class="text-success fw-bold">已付款</span>
                    <span class="text-danger fw-bold" v-else>未付款</span>
                    <p></p>
                  </li>
                  <li class="pt-3 mb-3" v-if="tempOrder.user">
                    <h3 class="fs-5 mb-2">客戶資訊</h3>
                    <ul>
                      <li>姓名：{{ tempOrder.user.name }}</li>
                      <li>電子信箱：{{ tempOrder.user.email }}</li>
                      <li>地址：{{ tempOrder.user.address }}</li>
                      <li>聯絡電話：{{ tempOrder.user.tel }}</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            關閉
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
      tempOrder: {}
    }
  },
  mixins: [modalMixin],
  props: {
    innerOrder: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    //監聽對象要和元件名稱相同
    innerOrder() {
      this.tempOrder = this.innerOrder
    }
  }
}
</script>
