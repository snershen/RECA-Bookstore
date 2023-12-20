<template>
  <div class="container">
    <div class="row pb-5">
      <div class="offset-lg-2 col-lg-8">
        <div>
          <div>
            <h1 class="mb-4 fw-bold">所有訂單</h1>
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
                  v-model="searchStr"
                />
              </div>
              <div class="col-auto">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click.prevent="findOrder(searchStr)"
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
            <tbody v-if="!orderResult.length">
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
                    @click.prevent="orderDetail(item.id)"
                    >檢視</a
                  >
                </td>
              </tr>
            </tbody>
            <tbody v-else>
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
                    @click.prevent="orderDetail(item.id)"
                    >檢視</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userGetOrder } from '../../utils/apis'
import { userSingleOrder } from '../../utils/apis'
import { timeFormat } from '../../utils/timeFormat'
export default {
  data() {
    return {
      orderList: [],
      orderResult: [],
      searchStr: ''
    }
  },
  methods: {
    getOrders() {
      userGetOrder().then((res) => {
        console.log(res)
        this.orderList = res.data.orders
        timeFormat(this.orderList, 'create_at')
        this.orderResult = {}
      })
    },
    orderDetail(id) {
      userSingleOrder(id).then((res) => {
        console.log(res)
        this.$router.push(`/user/order/${id}`)
      })
    },
    findOrder(str) {
      const newStr = str.trim()
      const result = this.orderList.filter((item) => {
        return item.id === newStr
      })
      this.orderResult = result
      console.log(this.orderResult)
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
