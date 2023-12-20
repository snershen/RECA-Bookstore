<template>
  <LoadingComponent></LoadingComponent>

  <div class="container">
    <div class="row pb-5">
      <div class="offset-lg-2 col-lg-8">
        <div>
          <div>
            <h1 class="mb-4 fw-bold">所有訂單</h1>
            {{ orderId }}
            <div class="mb-5 row align-items-center gx-3">
              <div class="col-auto">
                <label for="orderInput" class="form-label mb-0 pb-0">搜尋訂單</label>
              </div>
              <div class="col-auto">
                <input
                  type="text"
                  placeholder="請輸入訂單編號"
                  class="form-control px-2 me-2 rounded-0 col-lg-4"
                  id="orderInput"
                  v-model="searchString"
                />
              </div>
              <div class="col-auto">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click.prevent="filterOrder(searchString)"
                >
                  搜尋
                </button>
              </div>
            </div>
          </div>
          <table class="table table-hover align-middle">
            <tr class="bg-light">
              <td width="5%"></td>
              <td width="20%">建立日期</td>
              <td width="35%" class="d-none d-lg-table-cell">訂單編號</td>
              <td width="15%">金額</td>
              <td width="10%">訂單狀態</td>
              <td width="12%"></td>
            </tr>
            <tbody v-if="orderResult.length === 0 && !isEmptyResult">
              <tr v-for="(item, index) in orderList" :key="item.id" class="border-bottom">
                <td>{{ index + 1 }}</td>
                <td>{{ item.create_at }}</td>
                <td class="d-none d-lg-table-cell">{{ item.id }}</td>
                <td>${{ item.total }}</td>
                <td>
                  <span v-if="item.is_paid" class="text-success">已付款</span>
                  <span v-if="!item.is_paid" class="text-danger">未付款</span>
                </td>
                <td>
                  <a
                    href="#"
                    class="btn btn-outline-secondary"
                    @click.prevent="directSingleOrder(item.id)"
                    >檢視</a
                  >
                </td>
              </tr>
            </tbody>
            <tbody v-else-if="orderResult.length !== 0">
              <tr v-for="(item, index) in orderResult" :key="item.id" class="border-bottom">
                <td>{{ index + 1 }}</td>
                <td>{{ item.create_at }}</td>
                <td class="d-none d-lg-table-cell">{{ item.id }}</td>
                <td>${{ item.total }}</td>
                <td>
                  <span v-if="item.is_paid" class="text-success">已付款</span>
                  <span v-if="!item.is_paid" class="text-danger">未付款</span>
                </td>
                <td>
                  <a
                    href="#"
                    class="btn btn-outline-secondary"
                    @click.prevent="directSingleOrder(item.id)"
                    >檢視</a
                  >
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr class="border-bottom text-center fw-bold">
                <td colspan="8">查無符合訂單，請再次確認訂單編號</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import orderStore from '@/stores/order.js'

import LoadingComponent from '@/components/Loading.vue'

export default {
  data() {
    return {
      searchString: ''
    }
  },

  computed: {
    ...mapState(orderStore, ['orderList', 'orderResult', 'orderId', 'searchStr', 'isEmptyResult'])
  },

  components: { LoadingComponent },

  methods: {
    ...mapActions(orderStore, ['getOrders', 'filterOrder', 'getOrderId']),
    directSingleOrder(id) {
      this.$router.push(`/user/order/${id}`)
    }
  },
  created() {
    this.getOrders()
  }
}
</script>

<style scoped>
td {
  padding-top: 8px;
  padding-bottom: 8px;
}
tbody td {
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 8px;
  padding-right: 8px;
}
</style>
