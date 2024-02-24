import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import { addThousandsSeparator } from '@/assets/js/thousandNumber.js'

import { userGetCart } from '@/assets/js/apis'
import { userDeleteCart } from '@/assets/js/apis'
import { userPutCart } from '@/assets/js/apis'
import { userPostCart } from '@/assets/js/apis'
import { userDeleteCartAll } from '@/assets/js/apis'

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
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        ...options
      })
    },
    getCart() {
      userGetCart().then((res) => {
        this.cartList = res.data.data

        this.cartList.carts.forEach((item) => {
          item.final_total = addThousandsSeparator(item.final_total)
          item.total = addThousandsSeparator(item.total)
        })

        this.cartList.final_total = Math.round(this.cartList.final_total)
        this.cartLength = res.data.data.carts.length
        this.saveMoney = Math.round(res.data.data.total - res.data.data.final_total)
        this.saveMoney = addThousandsSeparator(this.saveMoney)
        this.cartList.final_total = addThousandsSeparator(this.cartList.final_total)
        this.cartList.total = addThousandsSeparator(this.cartList.total)
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
        if (this.productCount > 0) {
          this.productCount--
        }
      }
      const info = { data: { product_id: item.product_id, qty: this.productCount } }
      userPutCart(item.id, info).then((res) => {
        item.qty = this.productCount

        if (item.qty === 0) {
          this.showAlert({
            title: '確定要移除該商品嗎？',
            showCancelButton: true,
            icon: 'info'
          }).then((result) => {
            if (result.isConfirmed) {
              this.deleteCart(item.id)
              this.getCart()
            }
          })
        }
        this.getCart()
      })
    },
    changeCartNum(item) {
      this.productCount = item.qty
      if (!Number(item.qty) && item.qty !== 0) {
        this.showToast({
          title: '數量必須為數字',
          icon: 'error'
        })
        item.qty = 1
        return
      }
      if (item.qty < 0) {
        item.qty = 1
        this.productCount = item.qty
        let info = { data: { product_id: item.product_id, qty: this.productCount } }
        userPutCart(item.id, info).then((res) => {
          this.getCart()
        })
        return
      } else if (item.qty === 0) {
        this.showAlert({
          title: '確定要移除該商品嗎？',
          showDenyButton: true,
          icon: 'info',
          denyButtonText: `保留`
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteCart(item.id)
            this.getCart()
            return
          } else if (result.isDenied) {
            item.qty = 1
          }
        })

        return
      }

      let info = { data: { product_id: item.product_id, qty: this.productCount } }
      userPutCart(item.id, info).then((res) => {
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
          userDeleteCartAll().then((res) => {
            this.isLoading = false
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
