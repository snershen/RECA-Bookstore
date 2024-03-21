import { defineStore } from 'pinia'
import { userGetOrder, userSingleOrder, userPay } from '@/assets/js/apis'
import { timeFormat } from '@/assets/js/timeFormat'

export default defineStore('orderStore', {
  state: () => {
    return {
      orderList: [],
      orderResult: [],
      order: {},
      searchStr: '',
      isLoading: false,
      isEmptyResult: false
    }
  },
  actions: {
    getOrders() {
      this.isEmptyResult = false
      this.isLoading = true
      userGetOrder()
        .then((res) => {
          this.isLoading = false
          this.orderList = res.data.orders
          timeFormat(this.orderList, 'create_at')
          this.orderResult = []
          this.orderList.forEach((item) => {
            item.total = Math.round(item.total)
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },

    async getSingleOrder(id) {
      this.isLoading = true
      try {
        const res = await userSingleOrder(id)
        this.order = res.data.order
        timeFormat(this.order, 'create_at')
        this.order.total = Math.round(this.order.total)
        if (this.order.is_paid) {
          timeFormat(this.order, 'paid_date')
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },
    payMoney(id) {
      userPay(id)
        .then(() => {
          this.getSingleOrder(id)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    filterOrder(str) {
      this.searchStr = str.trim()
      if (this.searchStr === '') {
        this.orderResult = this.orderList
        return
      }
      const result = this.orderList.filter((item) => {
        return item.id === this.searchStr
      })
      this.orderResult = result
      if (this.orderResult.length === 0) {
        this.isEmptyResult = true
      }
    }
  }
})
