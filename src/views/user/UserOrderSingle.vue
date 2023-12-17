<template>
  <div class="container pb-5">
    <div class="offset-lg-4 col-lg-4">
      <h2 class="text-center fw-bold mb-4">訂單明細</h2>
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
          <td v-if="orderData.is_paid" class="text-success">
            已付款 <span v-if="orderData.is_paid" class="d-block">{{ orderData.paid_date }}</span>
          </td>
          <td v-else class="text-danger">未付款</td>
        </tr>
        <tr class="border-bottom">
          <td>訂單留言</td>
          <td v-if="orderData.message">{{ orderData.message }}</td>
          <td v-else>-</td>
        </tr>
      </table>
      <a
        href="#"
        class="btn btn-dark w-100 mb-3 py-2"
        @click.prevent="payMoney"
        v-if="!orderData.is_paid"
        >立刻付款</a
      >
      <router-link
        to="/user/order"
        class="btn btn-outline-dark w-100 py-2"
        @click.prevent="payMoney"
        >查看所有訂單</router-link
      >
    </div>
  </div>
</template>

<script>
import { userSingleOrder } from '../../utils/apis'
import { userPay } from '../../utils/apis'
import { timeFormat } from '../../utils/timeFormat'

export default {
  data() {
    return {
      orderData: {},
      orderId: ''
    }
  },
  methods: {
    getSingleOrder() {
      const pathArr = this.$route.path.split('/')
      const id = pathArr[pathArr.length - 1]
      console.log(id)
      this.orderId = id
      userSingleOrder(id).then((res) => {
        console.log(res)
        this.orderData = res.data.order
        timeFormat(this.orderData, 'create_at')
        if (this.orderData.is_paid) {
          timeFormat(this.orderData, 'paid_date')
        }
      })
    },
    payMoney() {
      userPay(this.orderId).then((res) => {
        console.log(res)
        this.getSingleOrder()
      })
    }
  },
  created() {
    console.log('this')
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
