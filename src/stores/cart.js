import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

import { userGetCart } from '@/utils/apis'
import { userDeleteCart } from '@/utils/apis'
import { userPutCart } from '@/utils/apis'
import { userPostCart } from '@/utils/apis'
import { userDeleteCartAll } from '@/utils/apis'

export default defineStore('cartStore', {
  state: () => {
    return {
      cartList: [],
      cartLength: 0,
      saveMoney: 0,
      productCount: 0,
      toastContent: {},

      isLoading: false
    }
  },

  getters: {
    getCartSort: (cartList) => {
      cartList.sort((item) => a.price - b.price)
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
    showAlert(options) {
      return Swal.fire({
        // icon: 'warning',
        // showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        ...options
      })
    },
    getCart() {
      userGetCart().then((res) => {
        this.cartList = res.data.data
        this.cartList.final_total = Math.round(this.cartList.final_total)
        this.cartLength = res.data.data.carts.length
        this.saveMoney = Math.round(res.data.data.total - res.data.data.final_total)
        console.log(this.cartList)
      })
    },
    deleteCart(id) {
      userDeleteCart(id).then((res) => {
        this.getCart()
      })
    },
    editCart(item, isPlus) {
      this.productCount = item.qty
      if (isPlus) {
        this.productCount++
      } else {
        this.productCount--
      }
      const info = { data: { product_id: item.id, qty: this.productCount } }
      userPutCart(item.id, info).then((res) => {
        item.qty = this.productCount
        if (item.qty === 0) {
          this.deleteCart(item.id)
        }
        this.getCart()
      })
    },
    changeCartNum(item) {
      this.productCount = item.qty
      const info = { data: { product_id: item.id, qty: this.productCount } }
      userPutCart(item.id, info).then((res) => {
        item.qty = this.productCount
        if (item.qty === 0) {
          this.deleteCart(item.id)
        }
        this.getCart()
      })
    },

    deleteAllCart() {
      this.showAlert({
        title: '確定要移除購物車所有商品嗎？',
        showCancelButton: true,
        icon: 'info'
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true
          userDeleteCartAll().then((res) => {
            this.isLoading = false
            console.log(res)
            this.getCart()
          })
        }
      })
    },
    addCart(id) {
      const target = {
        data: {
          product_id: id,
          qty: 1
        }
      }
      userPostCart(target).then((res) => {
        this.showToast({
          title: '成功加入購物車',
          icon: 'success'
        })
        this.getCart()
      })
    }
  }
})
