<template>
  <h1 class="fs-3 fw-bold">訂單管理</h1>
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
          <span class="badge text-bg-success" v-if="order.is_paid">已付款</span>
          <span class="badge text-bg-warning" v-else>未付款</span>
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
</template>

<script>
import { adminGetOrder } from '@/utils/apis'
import { deleteOrder } from '@/utils/apis'
import OrderModal from '@/components/OrderModal.vue'

import { timeFormat } from '@/utils/timeFormat'

export default {
  data() {
    return {
      orderList: [],
      tempOrder: {}
    }
  },
  components: {
    OrderModal
  },
  methods: {
    getOrderAll() {
      adminGetOrder().then((res) => {
        this.orderList = res.data.orders
        timeFormat(this.orderList)

        this.orderList.forEach((item) => {
          item.total = Math.round(item.total)
          timeFormat(item, 'create_at')
        })
      })
    },
    delOrder(order) {
      deleteOrder(order.id).then((res) => {
        // console.log(res)
        this.getOrderAll()
      })
    },
    openModal(item) {
      this.tempOrder = { ...item }
      const orderComponent = this.$refs.orderModal
      orderComponent.showModal()
    }
  },
  created() {
    this.getOrderAll()
  }
}
</script>
