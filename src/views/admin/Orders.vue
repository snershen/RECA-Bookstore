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
        <tbody>
          <tr v-for="order in orderList">
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
        <OrderModal ref="orderModal" :inner-order="tempOrder"></OrderModal>
      </table>
    </div>
    <Pagination :inner-pagination="pagination" @emit-page="getOrder" class="py-5"></Pagination>
  </div>
</template>

<script>
// import { adminGetOrder } from '@/utils/apis'
import { deleteOrder } from '@/utils/apis'
// import { admin_getProductAll } from '@/utils/apis.js'
// import { admin_putProduct } from '@/utils/apis.js'
import OrderModal from '@/components/admin/OrderModal.vue'
import Pagination from '@/components/Pagination.vue'

import { mapState, mapActions } from 'pinia'
import adminOrderStore from '@/stores/admin/order.js'

import { timeFormat } from '@/utils/timeFormat'

export default {
  data() {
    return {
      // orderList: [],
      // pagination: {},
      tempOrder: {}

      // productSoldNum: {}
    }
  },
  components: {
    OrderModal,
    Pagination
  },
  computed: {
    ...mapState(adminOrderStore, ['orderList', 'pagination', 'isLoading'])
  },
  methods: {
    ...mapActions(adminOrderStore, ['getOrder', 'getOrderAll']),
    // getOrder(page = 1) {
    //   this.isLoading = true
    //   adminGetOrder(page).then((res) => {
    //     this.orderList = res.data.orders
    //     this.pagination = res.data.pagination
    //     timeFormat(this.orderList)
    //     this.isLoading = false
    //     this.orderList.forEach((item) => {
    //       item.total = Math.round(item.total)
    //       timeFormat(item, 'create_at')
    //       this.calculateSoldNum()
    //     })
    //   })
    // },

    // calculateSoldNum() {
    //   const orderId = this.orderList.map((item) => {
    //     return Object.keys(item.products)
    //   })
    //   let result = []
    //   orderId.forEach((id, index) => {
    //     id.forEach((item) => {
    //       result.push(this.orderList[index].products[item])
    //     })
    //   })
    //   let productSoldNum = {}
    //   result.forEach((item) => {
    //     if (!productSoldNum[item.product_id]) {
    //       productSoldNum[item.product_id] = item.qty
    //     } else {
    //       productSoldNum[item.product_id] += item.qty
    //     }
    //   })
    //   console.clear()
    //   console.log(this.orderList)
    //   console.log(productSoldNum)

    //   // this.orderList.forEach((item) => {
    //   //   console.log(item)
    //   //   this.tempProduct = item
    //   //   productSoldNum[item.id].qty
    //   //   admin_putProduct({ data: this.tempOrder }, item.id).then((res) => {
    //   //     if (res.data.success) {
    //   //       this.showToast({ title: res.data.message, icon: 'success' })
    //   //       this.getProducts(this.pagination.current_page)
    //   //     }
    //   //   })
    //   // })
    //   // this.tempProduct = item
    // },
    delOrder(order) {
      deleteOrder(order.id).then((res) => {
        this.getOrder()
      })
    },
    openModal(item) {
      this.tempOrder = { ...item }
      const orderComponent = this.$refs.orderModal
      orderComponent.showModal()
    }
  },
  created() {
    this.getOrder()
    this.getOrderAll()
    // await this.calculateSoldNum()
    // await this.getProductsAll()
  }
}
</script>
