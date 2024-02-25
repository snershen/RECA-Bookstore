import { defineStore } from 'pinia'
import { adminGetOrder } from '@/assets/js/apis'
import { adminPutArticle } from '@/assets/js/apis.js'
import { adminGetSingleArticle } from '@/assets/js/apis.js'

import { timeFormat } from '@/assets/js/timeFormat'
import Swal from 'sweetalert2'

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
    showToast(options) {
      Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        ...options
      }).fire()
    },
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
      let paginationCopy = { ...this.pagination }

      this.orderAll = []
      //取得所有訂單
      let currentPage = paginationCopy.current_page
      if (!paginationCopy.has_next) {
        await adminGetOrder(currentPage)
          .then((res) => {
            const currentOrderList = res.data.orders
            this.orderAll.push(...currentOrderList)
          })
          .catch((err) => console.error(err))
      }
      while (paginationCopy.has_next) {
        await adminGetOrder(currentPage)
          .then((res) => {
            paginationCopy = res.data.pagination
            currentPage++
            const currentOrderList = res.data.orders

            this.orderAll.push(...currentOrderList)
          })
          .catch((err) => console.error(err))
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
      if (this.sortSoldNum.length > 10) {
        this.sortSoldNum = this.sortSoldNum.slice(0, 10)
      }
    },
    async sendRankInfo() {
      const rankId = '-NrQ8wc--1weD4FTHjHH'
      adminGetSingleArticle(rankId)
        .then((res) => {
          this.calcOrderNum()

          const rankArticle = res.data.article
          rankArticle.content = JSON.stringify(this.sortSoldNum)
          return rankArticle
        })
        .then((res) => {
          adminPutArticle(rankId, { data: res })
            .then((res) => {
              this.showToast({ title: '已更新排行榜', icon: 'success' })
            })
            .catch((err) => {
              console.error(err)
            })
        })
    }
  }
})
