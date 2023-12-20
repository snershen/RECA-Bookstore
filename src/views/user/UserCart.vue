<template>
  <LoadingComponent></LoadingComponent>
  <div class="container mb-5">
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
      <li
        class="row border-bottom py-3"
        v-for="item in cartList.carts"
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
            <div class="d-flex align-items-center justify-content-center">
              <a href="#" @click.prevent="editCart(item, false)" class="pe-3 py-3"
                ><font-awesome-icon :icon="['fas', 'minus']"
              /></a>
              <input
                class="form-control text-center"
                type="number"
                v-model="item.qty"
                @change.prevent="changeCartNum(item)"
                style="width: 70px"
              />
              <a href="#" @click.prevent="editCart(item, true)" class="ps-3 py-3"
                ><font-awesome-icon :icon="['fas', 'plus']"
              /></a>
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
        <div class="row mb-4 px-4 fs-6 fw-bold">
          <div class="offset-lg-8 col-lg-1 col-6 text-start">優惠券</div>
          <div class="col-lg-3 col-6 d-flex align-items-center justify-content-end mb-2">
            <input type="text" placeholder="填入優惠券" class="px-2 me-2" v-model="couponCode" />
            <button type="button" class="btn btn-secondary" @click.prevent="checkCoupon">
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
    <div class="text-center fs-3 fw-bold" v-else>
      <p class="mb-5">購物車目前沒有商品<br />為自己創造閱讀時光吧</p>
      <div class="text-center"><img src="@/assets/img/cart-empty.png" alt="" /></div>
    </div>
    <div class="row justify-content-between py-5" v-if="cartLength">
      <div class="col-lg-4 col-6">
        <router-link
          to="/user/products"
          class="btn btn-outline-secondary rounded-0 w-100 py-3 mb-3 mb-lg-0"
          ><span class="btn-arrow btn-arrow-left me-2"></span>繼續逛逛
        </router-link>
      </div>
      <div class="col-lg-4 col-6">
        <router-link to="/user/pay" class="btn btn-secondary rounded-0 w-100 py-3">
          前往結帳<span class="btn-arrow btn-arrow-right ms-2"></span
        ></router-link>
      </div>
    </div>
    <div class="row justify-content-between py-5" v-else>
      <div class="col-lg-4 mx-auto">
        <router-link to="/user/products" class="btn btn-secondary rounded-0 w-100 py-3 mb-3 mb-lg-0"
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

import LoadingComponent from '@/components/Loading.vue'

export default {
  data() {
    return {
      couponCode: '',
      hasCoupon: false
    }
  },
  components: { LoadingComponent },
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
          console.log(res)
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
