<template>
  <Loading :active="isLoading">
    <div class="loading-box">
      <img src="@/assets/img/icons8-book4.gif" alt="" />
    </div>
  </Loading>
  <div class="container mb-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="fw-bold">購物車</h1>
      <a
        href="#"
        class="btn btn-outline-dark"
        v-if="cartLength !== 0"
        @click.prevent="deleteAllCart"
        >清空購物車</a
      >
    </div>

    <ul class="text-lg-center px-0 list-unstyled" v-if="cartLength !== 0">
      <li class="row d-flex d-lg-none justify-content-center">
        <div class="bg-light text-center py-2 ps-2 fs-7">品項</div>
      </li>
      <li class="row bg-light py-2 d-none d-lg-flex">
        <div class="col-1"></div>
        <ul class="row list-unstyled col-11">
          <li class="col-5">商品名稱</li>
          <li class="col-2">價格</li>
          <li class="col-2">數量</li>
          <li class="col-2">小計</li>
          <li class="col-1"></li>
        </ul>
      </li>
      <li
        class="row border-bottom py-3"
        v-for="item in cartInfo.carts"
        :class="{ 'd-none': item.qty === 0 }"
      >
        <div class="col-lg-1 col-3">
          <img :src="item.product.imageUrl" alt="" class="img-fluid" />
        </div>
        <ul class="row list-unstyled col-lg-11 col-9 align-items-center">
          <li class="col-lg-5 col-12">{{ item.product.title }}</li>
          <li class="col-lg-2 col-6">
            ${{ item.product.price }}
            <span class="text-decoration-line-through text-gray">
              ${{ item.product.origin_price }}</span
            >
          </li>
          <li class="col-lg-2 col-6 ms-auto text-end text-lg-center">
            <a href="#" @click.prevent="editCart(item, false)" class="pe-3 py-3"
              ><font-awesome-icon :icon="['fas', 'minus']" /></a
            >{{ item.qty
            }}<a href="#" @click.prevent="editCart(item, true)" class="ps-3 py-3"
              ><font-awesome-icon :icon="['fas', 'plus']"
            /></a>
          </li>
          <li class="col-lg-2 col-6">
            <span class="d-lg-none d-inline-block">小計</span> ${{ item.final_total }}
          </li>
          <li class="col-lg-1 col-6 ms-auto text-end">
            <a
              href="#"
              class="btn btn-outline-gray text-nowrap"
              @click.prevent="deleteCart(item.id)"
              ><font-awesome-icon :icon="['fas', 'xmark']" class="me-2" />移除</a
            >
          </li>
        </ul>
      </li>
      <li>
        <div class="row bg-light py-4 mb-4 px-4 fs-6 fw-bold">
          <div class="offset-lg-8 col-lg-1 col-6 text-start">總計</div>
          <div class="col-lg-3 text-end col-6">${{ cartInfo.total }}</div>
        </div>
        <div class="row mb-4 px-4 fs-6 fw-bold">
          <div class="offset-lg-8 col-lg-1 col-6 text-start">優惠券</div>
          <div class="col-lg-3 col-6 d-flex align-items-center justify-content-end">
            <input type="text" placeholder="填入優惠券" class="px-2 me-2" v-model="couponCode" />
            <div class="btn btn-dark" @click.prevent="checkCoupon">套用</div>
          </div>
        </div>
        <div class="row mb-4 pb-4 px-4 fs-6 fw-bold border-bottom">
          <div class="offset-lg-8 col-lg-1 col-6 text-start">折扣</div>
          <div class="col-lg-3 text-end col-6">- {{ saveMoney }}</div>
        </div>
        <div class="row mb-4 pb-4 px-4 fs-6 fw-bold">
          <div class="offset-lg-8 col-lg-1 col-6 text-start">總計</div>
          <div class="col-lg-3 text-end col-6 fs-5">${{ cartInfo.final_total }}</div>
        </div>
      </li>
    </ul>
    <div class="text-center fs-3 fw-bold" v-else>
      <p class="mb-5">購物車目前沒有商品<br />為自己創造閱讀時光吧</p>
      <div class="text-center"><img src="@/assets/img/cart-empty.png" alt="" /></div>
    </div>
    <div class="row justify-content-between py-5" v-if="cartLength">
      <div class="col-lg-4 col-6">
        <router-link
          to="/user/products"
          class="btn btn-outline-dark rounded-0 w-100 py-3 mb-3 mb-lg-0"
          ><span class="btn-arrow btn-arrow-left me-2"></span>繼續逛逛
        </router-link>
      </div>
      <div class="col-lg-4 col-6">
        <router-link to="/user/pay" class="btn btn-dark rounded-0 w-100 py-3">
          前往結帳<span class="btn-arrow btn-arrow-right ms-2"></span
        ></router-link>
      </div>
    </div>
    <div class="row justify-content-between py-5" v-else>
      <div class="col-lg-4 mx-auto">
        <router-link to="/user/products" class="btn btn-dark rounded-0 w-100 py-3 mb-3 mb-lg-0"
          ><span class="me-2"></span>繼續逛逛
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { userGetCart } from '../../utils/apis'
import { userDeleteCart } from '../../utils/apis'
import { userPutCart } from '../../utils/apis'
import { userDeleteCartAll } from '../../utils/apis'
import { userCheckCoupon } from '../../utils/apis'

import alertMixin from '../../mixins/alertMixin'
import loadingMixin from '../../mixins/loadingMixin'
import toastMixin from '../../mixins/toastMixin'

export default {
  data() {
    return {
      cartInfo: {},
      isPlus: false,
      cartLength: 0,
      couponCode: '',
      discountTotal: 0,
      saveMoney: 0,
      count: 0
    }
  },
  mixins: [alertMixin, toastMixin, loadingMixin],
  methods: {
    getCart() {
      userGetCart().then((res) => {
        this.cartInfo = res.data.data
        this.cartLength = res.data.data.carts.length
        this.saveMoney = Math.round(res.data.data.total - res.data.data.final_total)
        this.cartInfo.final_total = Math.round(this.cartInfo.final_total)
      })
    },

    deleteCart(id) {
      userDeleteCart(id).then((res) => {
        this.getCart()
      })
    },

    editCart(item, isPlus) {
      this.count = item.qty
      if (isPlus) {
        this.count++
      } else {
        this.count--
      }
      this.isPlus = isPlus
      const info = { data: { product_id: item.id, qty: this.count } }
      userPutCart(item.id, info).then((res) => {
        item.qty = this.count
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
          userDeleteCartAll().then((res) => {
            console.log(res)
            this.getCart()
          })
        }
      })
    },
    checkCoupon() {
      const data = {
        data: {
          code: this.couponCode
        }
      }
      userCheckCoupon(data).then((res) => {
        const message = res.data.message
        console.log(res)
        this.showToast({
          title: message,
          icon: 'info'
        })
        this.getCart()
      })
    }
  },
  mounted() {
    this.getCart()
  }
}
</script>

<style scoped>
.product-name {
  width: 55%;
  @media (min-width: 768px) {
    width: 35%;
  }
}

.btn-outline-gray:hover {
  background: #000;
  color: white;
}
</style>
