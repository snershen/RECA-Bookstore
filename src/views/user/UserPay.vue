<template>
  <div class="container mb-5">
    <div class="row">
      <div class="offset-1 col-10">
        <h1 class="fw-bold mb-4">訂單明細</h1>
        <table class="list-unstyled w-100 text-center mb-5">
          <tr class="py-3">
            <td width="60%" class="text-start">品名</td>
            <td width="20%">數量</td>
            <td width="20%" class="text-end">小計</td>
          </tr>
          <tr class="border-bottom" v-for="item in cartItem.carts">
            <td class="text-start">
              {{ item.product.title }}
            </td>
            <td>
              {{ item.qty }}
            </td>
            <td class="text-end">
              {{ item.final_total }}
            </td>
          </tr>
          <tr class="fw-bold">
            <td colspan="1" class="text-start">總計</td>
            <td colspan="2" class="text-end">${{ cartItem.final_total }}</td>
          </tr>
        </table>
        <section>
          <h2 class="fw-bold mb-3">訂購資訊</h2>
          <ul class="row list-unstyled">
            <li class="col-lg-3 mb-4">
              <label for="orderName" class="form-label">姓名</label>
              <input
                type="text"
                class="form-control rounded-0 border-dark"
                id="orderName"
                placeholder="請輸入 姓名"
                v-model="orderData.data.user.name"
              />
            </li>
            <li class="col-lg-3 mb-3">
              <label for="orderPhone" class="form-label">聯絡電話</label>
              <input
                type="tel"
                class="form-control rounded-0 border-dark"
                id="orderPhone"
                placeholder="請輸入 電話"
                v-model="orderData.data.user.tel"
              />
            </li>
            <li><div class="w-100 d-none d-md-block"></div></li>
            <li class="col-lg-6 mb-4">
              <label for="orderMail" class="form-label">Email</label>
              <input
                type="tel"
                class="form-control rounded-0 border-dark"
                id="orderMail"
                placeholder="請輸入 Email"
                v-model="orderData.data.user.email"
              />
            </li>
            <li><div class="w-100 d-none d-md-block"></div></li>

            <li><div class="w-100 d-none d-md-block"></div></li>
            <!-- <li class="col-lg-3">
              <label for="orderPay" class="form-label">取貨方式</label>
              <ul class="list-unstyled">
                <li class="mb-1">
                  <input type="radio" id="home" class="me-2" name="take" /><label for="home"
                    >宅配</label
                  >
                </li>
                <li class="mb-1">
                  <input type="radio" id="store" class="me-2" name="take" /><label for="store"
                    >超商</label
                  >
                </li>
                <li class="mb-1">
                  <input type="radio" id="postoffice" class="me-2" name="take" /><label
                    for="postoffice"
                    >郵局</label
                  >
                </li>
              </ul>
            </li> -->

            <li class="col-lg-6 mb-4">
              <label for="orderAddress" class="form-label">寄送地址</label>
              <input
                type="text"
                class="form-control rounded-0 border-dark"
                id="orderAddress"
                placeholder="請寫入寄送地址"
                v-model="orderData.data.user.address"
              />
            </li>
            <li><div class="w-100 d-none d-md-block"></div></li>
            <li class="col-lg-6">
              <label for="orderMessage" class="form-label">備註</label>
              <textarea
                class="form-control rounded-0 border-dark"
                type="text"
                id="orderMessage"
                placeholder="訂單更多說明"
                rows="5"
                v-model="orderData.data.message"
              />
            </li>
          </ul>
        </section>
        <div class="row justify-content-between py-5">
          <div class="col-lg-4 col-6">
            <a
              href="#"
              class="btn btn-outline-dark rounded-0 w-100 py-3 mb-3 mb-lg-0"
              @click.prevent="goCartPage"
              ><span class="btn-arrow btn-arrow-left me-2"></span>上一步
            </a>
          </div>
          <div class="col-lg-4 col-6">
            <a href="#" class="btn btn-dark rounded-0 w-100 py-3" @click.prevent="sendOrder"
              >送出訂單<span class="btn-arrow btn-arrow-right ms-2"></span
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userGetCart } from '../../utils/apis'
import { userPostOrder } from '../../utils/apis'

// import { userGetCart } from '../assets/apis'
export default {
  data() {
    return {
      cartItem: {},
      couponCode: '',
      orderData: { data: { user: {} } }
    }
  },
  methods: {
    getCart() {
      userGetCart().then((res) => {
        console.log(res)
        this.cartItem = res.data.data
        this.cartItem.carts.forEach((item) => {
          item.final_total = Math.round(item.final_total)
        })
        this.cartItem.final_total = Math.round(this.cartItem.final_total)
      })
    },

    goCartPage() {
      this.$router.push('/user/cart')
    },
    sendOrder() {
      userPostOrder(this.orderData).then((res) => {
        console.log(res)
        const orderId = res.data.orderId
        this.$router.push(`/user/order/${orderId}`)
      })
    }
  },
  created() {
    this.getCart()
  }
}
</script>

<style scoped>
td {
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
