<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h1 class="fs-3 fw-bold font-sans">訂單管理</h1>
  </div>
  <div :class="{ isLoading: isLoading }" class="px-4 py-2 bg-white rounded-3">
    <div class="table-overflow">
      <table class="table table-hover mt-4 align-middle w-100">
        <thead>
          <tr>
            <th width="30%">訂單編號</th>
            <th width="20%">付款日期</th>
            <th width="10%">付款狀態</th>
            <th width="20%">客戶姓名</th>
            <th width="10%">合計</th>
            <th width="10%">編輯</th>
          </tr>
        </thead>
        <tbody v-if="orderList.length === 0">
          <tr>
            <td colspan="6" class="text-center">目前無訂單</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="order in orderList" :key="order.id">
            <td>{{ order.id }}</td>
            <td class="text-right">{{ order.create_at }}</td>
            <td>
              <span class="badge text-white bg-success fs-7 fw-normal" v-if="order.is_paid"
                >已付款</span
              >
              <span class="badge text-white bg-gray fs-7 fw-normal" v-else>未付款</span>
            </td>
            <td>{{ order.user.name }}</td>
            <td>{{ order.total }}</td>
            <td>
              <div>
                <button class="btn btn-dark btn-sm me-1" @click="openModal(order)">
                  <font-awesome-icon :icon="['far', 'file-lines']" />
                </button>
                <button class="btn btn-danger btn-sm" @click.prevent="delOrder(order)">
                  <font-awesome-icon :icon="['fas', 'trash-can']" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <OrderModal ref="orderModal" :inner-order="tempOrder" @change-pay="updateOrder" />
      </table>
    </div>
    <PaginationComponent :inner-pagination="pagination" @emit-page="getOrder" class="py-5" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import adminOrderStore from '@/stores/admin/order.js'
import alertMixin from '@/mixins/alertMixin'
import toastMixin from '@/mixins/toastMixin'

import { adminPutOrder, adminDeleteOrder } from '@/assets/js/apis'
import OrderModal from '@/components/admin/OrderModal.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

export default {
  data() {
    return {
      tempOrder: {}
    }
  },
  components: {
    OrderModal,
    PaginationComponent
  },
  mixins: [alertMixin, toastMixin],
  computed: {
    ...mapState(adminOrderStore, ['orderList', 'pagination', 'isLoading'])
  },
  methods: {
    ...mapActions(adminOrderStore, ['getOrder', 'getOrderAll', 'sendRankInfo', 'calcOrderNum']),
    updateOrder(order) {
      const paid = { is_paid: order.is_paid }
      adminPutOrder(
        {
          data: paid
        },
        order.id
      )
        .then(() => {
          this.showToast({
            title: '已更新訂單資訊',
            icon: 'success'
          })
          this.getOrder()
        })
        .catch((err) => {
          console.error(err)
        })
    },
    delOrder(order) {
      this.showAlert({
        title: `確定刪除訂單 ${order.id} 嗎?`,
        icon: 'warning',
        showCancelButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          adminDeleteOrder(order.id)
            .then(() => {
              this.getOrder()
            })
            .catch((err) => {
              console.error(err)
            })
        }
      })
    },
    openModal(item) {
      this.tempOrder = { ...item }
      const orderComponent = this.$refs.orderModal
      orderComponent.showModal()
    }
  },
  async created() {
    await this.getOrder()
    await this.getOrderAll()
    await this.calcOrderNum()
  },
  mounted() {
    this.sendRankInfo()
  }
}
</script>
