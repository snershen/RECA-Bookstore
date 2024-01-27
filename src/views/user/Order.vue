<template>
  <div class="container pb-5">
    <div class="offset-lg-4 col-lg-4">
      <h2 class="text-center fw-bold mb-4">訂單明細</h2>
      <table class="w-100 mb-5">
        <tr class="border-bottom">
          <td width="40%">訂單時間</td>
          <td width="80%">{{ order.create_at }}</td>
        </tr>
        <tr class="border-bottom">
          <td>訂單編號</td>
          <td>{{ order.id }}</td>
        </tr>
        <tr class="border-bottom">
          <td>總額</td>
          <td>{{ order.total }}</td>
        </tr>
        <tr class="border-bottom">
          <td>付款狀態</td>
          <td v-if="order.is_paid" class="text-success">
            已付款 <span v-if="order.is_paid" class="d-block">{{ order.paid_date }}</span>
          </td>
          <td v-else class="text-danger">未付款</td>
        </tr>
        <tr class="border-bottom">
          <td>訂單留言</td>
          <td v-if="order.message">{{ order.message }}</td>
          <td v-else>-</td>
        </tr>
      </table>
      <a
        href="#"
        class="btn btn-secondary w-100 mb-3 py-2"
        @click.prevent="payMoney"
        v-if="!order.is_paid"
        >立刻付款</a
      >
      <router-link :to="{ name: 'orders' }" class="btn btn-outline-secondary w-100 py-2"
        >查看所有訂單</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import orderStore from '@/stores/order.js'

export default {
  computed: {
    ...mapState(orderStore, ['order'])
  },
  props: ['id'],

  methods: {
    ...mapActions(orderStore, ['getSingleOrder', 'payMoney'])
  },
  created() {
    this.getSingleOrder(this.id)
  }
}
</script>

<style scoped>
td {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
