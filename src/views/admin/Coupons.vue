<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h1 class="fs-3 fw-bold font-sans">優惠券管理</h1>
    <button class="btn btn-dark" type="button" @click.prevent="openModal(true)">新增優惠券</button>
  </div>
  <div :class="{ isLoading: isLoading }" class="px-4 py-2 bg-white rounded-3">
    <div class="table-overflow">
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th width="15%">折扣碼</th>
            <th width="10%">優惠券類型</th>
            <th width="10%">優惠券折扣</th>
            <th width="10%">到期日</th>
            <th width="10%">是否啟用</th>
            <th width="10%">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coupon in coupons">
            <td>{{ coupon.code }}</td>
            <td>{{ coupon.title }}</td>
            <td class="text-right">{{ coupon.percent }}</td>
            <td class="text-right">{{ coupon.due_date }}</td>
            <td>
              <span class="text-success" v-if="coupon.is_enabled">啟用</span>
              <span class="text-muted" v-else>未啟用</span>
            </td>
            <td>
              <div>
                <button class="btn btn-success btn-sm me-1" @click="openModal(false, coupon)">
                  <font-awesome-icon :icon="['fas', 'pen']" />
                </button>
                <button class="btn btn-danger btn-sm" @click.prevent="delCoupon(coupon)">
                  <font-awesome-icon :icon="['fas', 'trash-can']" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :inner-pagination="pagination" @emit-page="getCoupons" class="py-5"></Pagination>
    <CouponModal
      ref="CouponModal"
      :inner-coupon="tempCoupon"
      :inner-new="isNew"
      @update-product="updateCoupon"
    ></CouponModal>
  </div>
</template>

<script>
import { adminGetCoupon } from '@/utils/apis'
import { adminDeleteCoupon } from '@/utils/apis'
import { adminPostCoupon } from '@/utils/apis'
import { adminPutCoupon } from '@/utils/apis'

import CouponModal from '@/components/admin/CouponModal.vue'
import Pagination from '@/components/Pagination.vue'

import toastMixin from '@/mixins/toastMixin'
import alertMixin from '@/mixins/alertMixin'

import { timeFormat } from '@/utils/timeFormat'

export default {
  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: { is_enabled: 0 },
      isLoading: false,
      isNew: true
    }
  },
  components: { CouponModal, Pagination },
  mixins: [toastMixin, alertMixin],
  methods: {
    getCoupons(page = 1) {
      this.isLoading = true
      adminGetCoupon(page).then((res) => {
        console.log(res)
        this.isLoading = false
        this.coupons = res.data.coupons
        this.pagination = res.data.pagination
        timeFormat(this.coupons, 'due_date')
        this.coupons.forEach((coupon) => {
          if (coupon.percent % 10 === 0) {
            coupon.percent = `${coupon.percent / 10} 折`
          } else {
            coupon.percent = `${coupon.percent} 折`
          }
        })
      })
    },
    delCoupon(coupon) {
      this.showAlert({ title: '確定刪除嗎?', icon: 'warning', showCancelButton: true }).then(
        (result) => {
          if (result.isConfirmed) {
            adminDeleteCoupon(coupon.id).then((res) => {
              console.log(res)
              this.getCoupons()
              this.showAlert({ icon: 'success', title: res.data.message })
            })
          }
        }
      )
    },
    updateCoupon(coupon) {
      const couponComponent = this.$refs.CouponModal
      this.tempCoupon = coupon
      //將日期轉換為時間戳記
      this.tempCoupon.due_date = Number(new Date(this.tempCoupon.due_date).getTime())

      if (this.isNew) {
        adminPostCoupon({ data: this.tempCoupon }).then((res) => {
          this.getCoupons()
          this.showToast({ title: res.data.message, icon: 'success' })
          console.log(res)
        })
      } else {
        adminPutCoupon({ data: this.tempCoupon }, this.tempCoupon.id).then((res) => {
          this.getCoupons()
          this.showToast({ title: res.data.message, icon: 'success' })
          console.log(res)
        })
      }
      this.tempCoupon.percent = parseInt(this.tempCoupon.percent)
      couponComponent.hideModal()
    },
    openModal(isNew, coupon) {
      if (isNew) {
        this.tempCoupon = { is_enabled: 0 }
      } else {
        this.tempCoupon = { ...coupon }
        let percent = parseInt(this.tempCoupon.percent)
        if (percent / 10 < 1) {
          this.tempCoupon.percent = percent * 10
        } else {
          this.tempCoupon.percent = percent
        }
      }
      this.isNew = isNew
      const couponComponent = this.$refs.CouponModal
      couponComponent.showModal()
    }
  },
  created() {
    this.getCoupons()
  }
}
</script>
