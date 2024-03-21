import { defineStore } from 'pinia'
import { showToast } from '@/mixins/toastMixin'
import { showAlert } from '@/mixins/alertMixin'
import { addThousandsSeparator } from '@/assets/js/thousandNumber.js'

import {
  userGetCart,
  userPostCart,
  userPutCart,
  userDeleteCart,
  userDeleteCartAll
} from '@/assets/js/apis'

export default defineStore('cartStore', {
  state: () => {
    return {
      cartList: [],
      cartLength: 0,
      saveMoney: 0,
      productCount: 0,
      toastContent: {},
      isLoading: false,
      isClicked: false
    }
  },

  getters: {
    getCartSort: (cartList) => {
      cartList.sort((a, b) => a.price - b.price)
    }
  },

  actions: {
    getCart() {
      userGetCart()
        .then((res) => {
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
        .catch((err) => {
          console.error(err)
        })
    },
    deleteCart(id) {
      userDeleteCart(id)
        .then(() => {
          this.getCart()
        })
        .catch((err) => {
          console.error(err)
        })
    },
    editCart(item, isPlus) {
      this.productCount = item.qty
      this.isClicked = true
      if (isPlus) {
        this.productCount++
      } else {
        if (this.productCount > 0) {
          this.productCount--
        }
      }
      const info = { data: { product_id: item.product_id, qty: this.productCount } }
      userPutCart(item.id, info)
        .then(() => {
          item.qty = this.productCount
          if (item.qty === 0) {
            showAlert({
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
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          this.isClicked = false
        })
    },
    changeCartNum(item) {
      this.productCount = item.qty
      if (!Number(item.qty) && item.qty !== 0) {
        showToast({
          title: '數量必須為數字',
          icon: 'error'
        })
        item.qty = 1
        return
      }
      if (item.qty < 0) {
        item.qty = 1
        this.productCount = item.qty
        const info = { data: { product_id: item.product_id, qty: this.productCount } }
        userPutCart(item.id, info).then((res) => {
          this.getCart()
        })
        return
      } else if (item.qty === 0) {
        showAlert({
          title: '確定要移除該商品嗎？',
          showDenyButton: true,
          icon: 'info',
          denyButtonText: `保留`
        })
          .then((result) => {
            if (result.isConfirmed) {
              this.deleteCart(item.id)
              this.getCart()
            } else if (result.isDenied) {
              item.qty = 1
            }
          })
          .catch((err) => {
            console.error(err)
          })

        return
      }

      const info = { data: { product_id: item.product_id, qty: this.productCount } }
      userPutCart(item.id, info)
        .then((res) => {
          this.getCart()
        })
        .catch((err) => {
          console.error(err)
        })
    },

    deleteAllCart() {
      showAlert({
        title: '確定要移除購物車所有商品嗎？',
        showCancelButton: true,
        icon: 'info'
      })
        .then((result) => {
          if (result.isConfirmed) {
            userDeleteCartAll().then((res) => {
              this.isLoading = false
              this.getCart()
            })
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    addCart(id) {
      const target = {
        data: {
          product_id: id,
          qty: 1
        }
      }
      userPostCart(target)
        .then((res) => {
          showToast({
            title: '成功加入購物車',
            icon: 'success'
          })
          this.getCart()
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
})
