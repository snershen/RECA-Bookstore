<template>
  <div class="container pb-5">
    <div class="offset-lg-4 col-lg-4">
      <h2 class="text-center fw-bold mb-4">訂單狀態</h2>
      <table class="w-100 mb-5">
        <tr class="border-bottom">
          <td width="40%">訂單時間</td>
          <td width="80%">{{ orderData.create_at }}</td>
        </tr>
        <tr class="border-bottom">
          <td>訂單編號</td>
          <td>{{ orderData.id }}</td>
        </tr>
        <tr class="border-bottom">
          <td>總額</td>
          <td>{{ orderData.total }}</td>
        </tr>
        <tr class="border-bottom">
          <td>付款狀態</td>
          <td v-if="orderData.is_paid" class="text-success">已付款</td>
          <td v-else class="text-danger">未付款</td>
        </tr>
        <tr class="border-bottom">
          <td>訂單留言</td>
          <td>{{ orderData.message }}</td>
        </tr>
      </table>
      <a
        href="#"
        class="btn btn-dark w-100 rounded-0"
        @click.prevent="payMoney"
        v-if="!orderData.is_paid"
        >立刻付款</a
      >
      <a
        href="#"
        class="btn btn-dark w-100 rounded-0"
        @click.prevent="payMoney"
        v-if="orderData.is_paid"
        >查看所有訂單</a
      >
    </div>
  </div>
</template>

<script>
import { userSingleOrder } from '../../utils/apis'
import { userPay } from '../../utils/apis'

export default {
  data() {
    return {
      orderData: {},
      orderId: ''
    }
  },
  methods: {
    getSingleOrder() {
      const pathArr = this.$route.fullPath.split('/')
      const id = pathArr[pathArr.length - 1]
      this.orderId = id
      userSingleOrder(id).then((res) => {
        console.log(res)
        this.orderData = res.data.order
      })
    },
    payMoney() {
      userPay(this.id).then((res) => {
        console.log(res)
        this.getSingleOrder()
      })
    }
  },
  created() {
    this.getSingleOrder()
  }
}
</script>

<style scoped>
td {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
