<template>
  <div
    class="modal fade modal-lg"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content border-0 p-0">
        <div class="modal-header bg-dark text-white">
          <h2 class="modal-title fs-4 font-sans" id="exampleModalLabel">
            <span>訂單詳細</span>
          </h2>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body bg-light fs-lg-6 fs-7" v-if="tempOrder.user">
          <div class="py-2 p-lg-3 p-2 rounded-1 mb-2">
            <div class="row">
              <div class="col-lg-2 col-4">訂單成立日期</div>
              <div class="col-lg-10 col-8">{{ tempOrder.create_at }}</div>
              <div class="col-lg-2 col-4">訂單編號</div>
              <div class="col-lg-10 col-8">{{ tempOrder.id }}</div>
            </div>
          </div>
          <div class="bg-white p-lg-3 p-2 rounded-1 mb-3">
            <h2 class="font-sans fs-6 mb-2 fw-bold">客戶資訊</h2>
            <ul>
              <li class="row mb-1">
                <div class="col-lg-2 col-4">姓名</div>
                <div class="col-lg-10 col-8">{{ tempOrder.user.name }}</div>
              </li>
              <li class="row mb-1">
                <div class="col-lg-2 col-4">電子信箱</div>
                <div class="col-lg-10 col-8">{{ tempOrder.user.email }}</div>
              </li>
              <li class="row mb-1">
                <div class="col-lg-2 col-4">地址</div>
                <div class="col-lg-10 col-8">{{ tempOrder.user.address }}</div>
              </li>
              <li class="row mb-1">
                <div class="col-lg-2 col-4">聯絡電話</div>
                <div class="col-lg-10 col-8">{{ tempOrder.user.tel }}</div>
              </li>
              <li class="row mb-1">
                <div class="col-lg-2 col-4">付款方式</div>
                <div class="col-lg-10 col-8">{{ tempOrder.user.pay }}</div>
              </li>
              <li class="row mb-1">
                <div class="col-lg-2 col-4">付款狀態</div>
                <div class="col-lg-10 col-8">
                  <span v-if="tempOrder.is_paid" class="text-success fw-bold">已付款</span>
                  <span class="text-danger fw-bold" v-else>未付款</span>
                </div>
              </li>
              <li class="row mb-1">
                <div class="col-lg-2 col-4">總金額</div>
                <div class="col-lg-10 col-8">{{ tempOrder.total }}</div>
              </li>
              <li class="row mb-1">
                <div class="col-lg-2 col-4">備註</div>
                <div class="col-lg-10 col-8">
                  <div v-if="tempOrder.message">
                    {{ tempOrder.message }}
                  </div>
                  <div v-else>無</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="bg-white p-lg-3 p-2 pb-3 rounded-1 mb-3">
            <h2 class="font-sans fs-6 mb-2 fw-bold">購買明細</h2>
            <table width="100%">
              <thead class="bg-light fs-7">
                <tr>
                  <td class="p-1">書名</td>
                  <td class="p-1">數量</td>
                  <td class="p-1">總額</td>
                </tr>
              </thead>
              <tbody class="fs-7">
                <tr v-for="item in orderProductList" :key="item.id" class="mb-1 border-bottom">
                  <td width="70%" class="p-1">
                    {{ item.product.title }}
                  </td>
                  <td width="15%" class="p-1">
                    {{ item.qty }}
                  </td>
                  <td width="15%" class="p-1">
                    {{ item.total }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-flex justify-content-end">
            <input
              type="checkbox"
              id="changePay"
              class="me-2"
              @click="changePayStatus"
              :checked="tempOrder.is_paid"
            />
            <label for="changePay"
              >修改付款狀態為 <span class="text-success fw-bold">已付款</span></label
            >
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">關閉</button>
          <button
            type="button"
            class="btn btn-dark"
            data-bs-dismiss="modal"
            @click="$emit('change-pay', tempOrder)"
          >
            修改
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
      tempOrder: {},
      orderProductList: []
    }
  },
  methods: {
    getOrderItem() {
      const idGroup = Object.keys(this.tempOrder.products)
      const result = idGroup.map((item) => {
        return this.tempOrder.products[item]
      })
      this.orderProductList = result
    },
    changePayStatus() {
      this.tempOrder.is_paid = !this.tempOrder.is_paid
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
    innerOrder() {
      this.tempOrder = this.innerOrder
      this.getOrderItem()
    }
  }
}
</script>
