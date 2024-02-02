<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="fw-bold">購物車</h1>
      <a
        href="#"
        class="btn btn-outline-secondary"
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

      <!-- :class="{ 'd-none': item.qty === 0 }" -->
      <li class="row border-bottom py-3" v-for="item in cartList.carts">
        <div class="col-lg-1 col-3">
          <img :src="item.product.imageUrl" alt="" class="img-fluid" />
        </div>
        <ul class="row list-unstyled col-lg-11 col-9 align-items-center">
          <li class="col-lg-5 col-12 text-lg-start">{{ item.product.title }}</li>
          <li class="col-lg-2 col-6">
            ${{ item.product.price }}
            <span class="text-decoration-line-through text-gray">
              ${{ item.product.origin_price }}</span
            >
          </li>
          <li class="col-lg-2 col-6 ms-auto text-end text-lg-center">
            <div class="d-flex align-items-center justify-content-center">
              <button
                @click="editCart(item, false)"
                class="btn pe-3 py-3 border-0"
                :class="{ 'disabled opacity-25': item.qty <= 1 }"
              >
                <font-awesome-icon :icon="['fas', 'minus']" />
              </button>
              <input
                class="form-control text-center"
                type="number"
                min="1"
                v-model="item.qty"
                @blur.prevent="changeCartNum(item)"
                style="width: 70px"
              />
              <button @click="editCart(item, true)" class="btn ps-3 py-3 border-0">
                <font-awesome-icon :icon="['fas', 'plus']" />
              </button>
            </div>
          </li>
          <li class="col-lg-2 col-6">
            <span class="d-lg-none d-inline-block">小計</span> ${{ item.total }}
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
          <div class="col-lg-3 text-end col-6">${{ cartList.total }}</div>
        </div>
        <div class="row mb-4 px-4 fs-6 fw-bold align-items-center">
          <div class="offset-lg-8 col-lg-1 col-12 text-start mb-2 mb-lg-0">優惠券</div>
          <div class="col-lg-3 col-12 d-flex align-items-center justify-content-end mb-2">
            <input
              type="text"
              placeholder="填入優惠券"
              class="form-control px-2 me-2"
              v-model="couponCode"
            />
            <button
              type="button"
              class="btn btn-secondary text-nowrap"
              @click.prevent="checkCoupon"
            >
              套用
            </button>
          </div>
          <p v-if="this.hasCoupon" class="text-end">已套用優惠券：{{ this.couponCode }}</p>
        </div>
        <div class="row mb-4 pb-4 px-4 fs-6 fw-bold border-bottom">
          <div class="offset-lg-8 col-lg-1 col-6 text-start">折扣</div>
          <div class="col-lg-3 text-end col-6">- {{ saveMoney }}</div>
        </div>
        <div class="row mb-4 pb-4 px-4 fs-6 fw-bold">
          <div class="offset-lg-8 col-lg-1 col-6 text-start">總計</div>
          <div class="col-lg-3 text-end col-6 fs-5">${{ cartList.final_total }}</div>
        </div>
      </li>
    </ul>
    <div class="text-center fw-bold" v-else>
      <p class="mb-5 fs-lg-3 fs-4">購物車目前沒有商品<br />為自己創造閱讀時光吧</p>
      <div class="text-center px-5">
        <img src="@/assets/img/cart-empty.png" alt="" class="img-fluid" />
      </div>
    </div>
    <div class="row justify-content-between py-5" v-if="cartLength">
      <div class="col-lg-4 col-12">
        <router-link
          :to="{ name: 'products' }"
          class="btn btn-outline-secondary rounded-0 w-100 py-3 mb-3 mb-lg-0"
          ><span class="btn-arrow btn-arrow-left me-2"></span>繼續逛逛
        </router-link>
      </div>
      <div class="col-lg-4 col-12">
        <router-link :to="{ name: 'pay' }" class="btn btn-secondary rounded-0 w-100 py-3">
          前往結帳<span class="btn-arrow btn-arrow-right ms-2"></span
        ></router-link>
      </div>
    </div>
    <div class="row justify-content-between py-5" v-else>
      <div class="col-lg-4 mx-auto">
        <router-link
          :to="{ name: 'products' }"
          class="btn btn-secondary rounded-0 w-100 py-3 mb-3 mb-lg-0"
          ><span class="me-2"></span>繼續逛逛
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { userCheckCoupon } from '@/utils/apis'
import toastMixin from '@/mixins/toastMixin.js'

import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cart.js'

export default {
  data() {
    return {
      couponCode: '',
      hasCoupon: false
    }
  },

  mixins: [toastMixin],
  computed: {
    ...mapState(cartStore, ['cartList', 'saveMoney', 'cartLength'])
  },

  methods: {
    ...mapActions(cartStore, [
      'getCart',
      'deleteCart',
      'editCart',
      'changeCartNum',
      'deleteAllCart'
    ]),
    checkCoupon() {
      this.hasCoupon = false
      const data = {
        data: {
          code: this.couponCode
        }
      }
      userCheckCoupon(data).then((res) => {
        if (res.data.success) {
          this.hasCoupon = true
          this.getCart()
        }
        const message = res.data.message
        this.showToast({
          title: message,
          icon: 'info'
        })
      })
    }
  },
  created() {
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
