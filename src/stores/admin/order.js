import { defineStore } from 'pinia'
import { adminGetOrder } from '@/utils/apis'
import { admin_getProducts } from '@/utils/apis.js'

import { timeFormat } from '@/utils/timeFormat'

export default defineStore('adminOrderStore', {
  state: () => {
    return {
      orderList: [],
      orderAll: [],
      productSoldNum: {},
      sortSoldNum: [],
      pagination: {},
      isLoading: false
    }
  },
  actions: {
    // getProducts(page = 1) {
    //   this.isLoading = true
    //   admin_getProducts(page).then((res) => {
    //     this.isLoading = false
    //     if (res.data.success) {
    //       this.products = res.data.products
    //       this.pagination = res.data.pagination
    //     }
    //   })
    // },
    getOrder(page = 1) {
      this.isLoading = true
      adminGetOrder(page).then((res) => {
        this.orderList = res.data.orders
        this.pagination = res.data.pagination
        timeFormat(this.orderList)
        this.isLoading = false
        this.orderList.forEach((item) => {
          item.total = Math.round(item.total)
          timeFormat(item, 'create_at')
        })
      })
    },
    async getOrderAll() {
      console.clear()
      let paginationCopy = { ...this.pagination }
      this.orderAll = []
      //取得所有訂單
      let currentPage = paginationCopy.current_page
      while (paginationCopy.has_next) {
        await adminGetOrder(currentPage)
          .then((res) => {
            paginationCopy = res.data.pagination
            currentPage++
            const currentOrderList = res.data.orders
            this.orderAll.push(...currentOrderList)
            console.log(this.orderAll)
          })
          .catch((err) => console.log(err))
      }
    },
    async calcOrderNum() {
      //獲取訂單裡的產品 id
      await this.getOrderAll()
      const orderId = this.orderAll.map((order) => {
        return Object.keys(order.products)
      })

      //紀錄訂單裡的產品內容
      let result = []
      orderId.forEach((id, index) => {
        id.forEach((item) => {
          //在每筆訂單裡取得 products 屬性裡的資料，即購買的產品內容
          result.push(this.orderAll[index].products[item])
        })
      })

      //計算每個商品售出的數量
      this.productSoldNum = []
      result.forEach((item) => {
        if (!this.productSoldNum[item.id]) {
          const { id, qty, product } = item
          const obj = { id, qty, product }
          this.productSoldNum[item.id] = obj
        } else {
          this.productSoldNum[item.id].qty += item.qty
        }
      })

      //以降序排列
      this.sortSoldNum = Object.values(this.productSoldNum).sort((a, b) => {
        return b.qty - a.qty
      })
      this.sortSoldNum = this.sortSoldNum.slice(0, 10)
      console.log(this.sortSoldNum)
    }
  }
})
