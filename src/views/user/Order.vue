<template>
  <div class="container py-5">
    <RouterLink :to="{ name: 'orders' }" class="btn btn-outline-secondary"
      ><font-awesome-icon :icon="['fas', 'circle-arrow-left']" class="me-2" />返回</RouterLink
    >
    <div class="row">
      <div class="offset-lg-3 col-lg-6">
        <h2 class="text-center fw-bold mb-4">訂單明細</h2>
        <table class="w-100 mb-4">
          <tr class="border-bottom">
            <td class="fw-bold">訂單編號</td>
            <td>{{ order.id }}</td>
          </tr>
          <tr class="border-bottom">
            <td class="fw-bold" width="25%">訂單時間</td>
            <td width="75%">{{ order.create_at }}</td>
          </tr>
          <tr class="border-bottom">
            <td class="fw-bold">付款狀態</td>
            <td v-if="order.is_paid" class="text-success">
              <span v-if="order.is_paid" class="me-2">{{ order.paid_date }}</span
              >已付款
            </td>
            <td v-else class="text-danger">未付款</td>
          </tr>
          <tr class="border-bottom">
            <td class="fw-bold">總額</td>
            <td>$ {{ order.total }}</td>
          </tr>
          <tr class="border-bottom">
            <td class="fw-bold">訂購品項</td>
            <td>
              <ul class="list-unordered ps-3">
                <li v-for="item in orderProductList" :key="item.id" class="mb-1">
                  <div class="row">
                    <span class="col-9 col-lg-10">
                      {{ item.product.title }}
                    </span>
                    <span class="col-3 col-lg-2">{{ item.qty }}本</span>
                  </div>
                </li>
              </ul>
            </td>
          </tr>
          <tr class="border-bottom">
            <td class="fw-bold">訂單留言</td>
            <td v-if="order.message">{{ order.message }}</td>
            <td v-else>-</td>
          </tr>
        </table>
        <a
          href="#"
          class="btn btn-secondary w-100 mb-3 py-2"
          @click.prevent="payMoney(id)"
          v-if="!order.is_paid"
          >立刻付款</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import orderStore from '@/stores/order.js'
import cartStore from '@/stores/cart.js'

export default {
  data() {
    return {
      orderProductList: {}
    }
  },
  computed: {
    ...mapState(orderStore, ['order'])
  },
  props: ['id'],
  methods: {
    ...mapActions(cartStore, ['getCart']),
    ...mapActions(orderStore, ['getSingleOrder', 'payMoney']),
    getOrderItem() {
      const idGroup = Object.keys(this.order.products)
      const result = idGroup.map((item) => {
        return this.order.products[item]
      })
      this.orderProductList = result
    }
  },
  async created() {
    await this.getSingleOrder(this.id)
    this.getOrderItem()
    this.getCart()
  }
}
</script>

<style scoped>
td {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
