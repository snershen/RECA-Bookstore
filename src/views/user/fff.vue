<template>
  <div
    class="container text-center pb-5 order-height-full d-flex justify-content-center align-items-center"
  >
    <div>
      <font-awesome-icon :icon="['fas', 'circle-check']" class="success-icon" />
      <h1 class="fw-bold mb-3">訂單已建立</h1>
      <p>3 秒後導向付款頁面</p>
    </div>

    <!-- <div class="row justify-content-between py-5 justify-content-center">
      <div class="offset-lg-4 col-lg-4 col-12 mb-4">
        <a
          href="#"
          class="btn btn-outline-dark rounded-0 w-100 py-3 mb-3 mb-lg-0"
          @click.prevent="goCartPage"
          ><span class="me-2"></span>查看訂單
        </a>
      </div>
      <div class="offset-lg-4 col-lg-4 col-12">
        <a href="#" class="btn btn-dark rounded-0 w-100 py-3" @click.prevent="sendOrder"
          >繼續逛逛<span class="ms-2"></span
        ></a>
      </div>
    </div> -->
  </div>
</template>

<script>
import { userSingleOrder } from '../../assets/js/apis'
import { userGetOrder } from '../../assets/js/apis'
export default {
  data() {
    return {
      orderData: {}
    }
  },
  methods: {
    getOrder() {
      userGetOrder().then((res) => {
        console.log(res)
        this.orderData = res.data.orders
        // const sortData = this.orderData.sort((item) => {
        //   return item.create_at - item.create_at
        // })
        const id = this.orderData[1].id
        // const id = sortData[0].id
        this.$router.push(`/user/order/${id}`)
      })
    }
  },
  mounted() {
    this.getOrder()
  }
}
</script>

<style scoped>
.success-icon {
  font-size: 8rem;
  margin-bottom: 30px;
}

.order-height-full {
  height: calc(100vh - 77px - 240px);
}
</style>
