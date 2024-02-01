import { defineStore } from 'pinia'
import { userGetOrder } from '@/utils/apis'
import { userSingleOrder } from '@/utils/apis'
import { userPay } from '@/utils/apis'
import { timeFormat } from '@/utils/timeFormat'

export default defineStore('orderStore', {
  state: () => {
    return {
      orderList: [],
      orderResult: [],
      //   orderId: '',
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
      userGetOrder().then((res) => {
        this.isLoading = false
        this.orderList = res.data.orders
        timeFormat(this.orderList, 'create_at')
        this.orderResult = []
        this.orderList.forEach((item) => {
          item.total = Math.round(item.total)
        })
      })
    },

    getSingleOrder(id) {
      this.isLoading = true
      userSingleOrder(id).then((res) => {
        this.isLoading = false
        console.log(res)
        this.order = res.data.order
        console.log(this.order)
        timeFormat(this.order, 'create_at')
        this.order.total = Math.round(this.order.total)
        if (this.order.is_paid) {
          timeFormat(this.order, 'paid_date')
        }
      })
    },
    payMoney(id) {
      userPay(id).then((res) => {
        this.getSingleOrder()
        console.log(res)
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
