<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h1 class="fs-3 fw-bold font-sans">產品管理</h1>
    <button class="btn btn-dark" type="button" @click="openModal(true)">新增產品</button>
  </div>
  <div :class="{ isLoading: isLoading }" class="px-4 py-2 bg-white rounded-3">
    <div class="table-overflow">
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th width="5%"></th>
            <th width="10%">分類</th>
            <th width="40%">產品名稱</th>
            <th width="10%">原價</th>
            <th width="10%">售價</th>
            <th width="10%">是否啟用</th>
            <th width="12%">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td class="py-2">
              <img :src="product.imageUrl" :alt="product.title" height="100" />
            </td>
            <td>{{ product.category }}</td>
            <td>{{ product.title }}</td>
            <td class="text-right">{{ product.origin_price }}</td>
            <td class="text-right">{{ product.price }}</td>
            <td>
              <div class="d-flex">
                <input
                  type="checkbox"
                  :id="product.id"
                  :true-value="1"
                  :false-value="0"
                  :class="{ active: product.is_enabled }"
                  @click.prevent="updateIsAble(product)"
                />
                <label :for="product.id"> Toggle </label>
              </div>
            </td>
            <td>
              <div>
                <button
                  class="btn btn-dark btn-sm me-1 mb-xxl-0"
                  @click="openModal(false, product)"
                >
                  編輯
                </button>
                <button class="btn btn-outline-danger btn-sm" @click="deleteProduct(product)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :inner-pagination="pagination" @emit-page="getProducts" class="py-5"></Pagination>
    <ProductModal
      ref="productModal"
      :product="tempProduct"
      :isNew="isNew"
      @update-product="updateProduct"
    ></ProductModal>
  </div>
</template>

<script>
import { admin_getProducts } from '@/utils/apis.js'
import { admin_putProduct } from '@/utils/apis.js'
import { admin_postProduct } from '@/utils/apis.js'
import { admin_deleteProduct } from '@/utils/apis.js'

import ProductModal from '@/components/admin/ProductModal.vue'
import Pagination from '@/components/Pagination.vue'

import toastMixin from '@/mixins/toastMixin'
import alertMixin from '@/mixins/alertMixin'
import loadingMixin from '@/mixins/loadingMixin'

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: true,
      isLoading: false
    }
  },
  components: {
    ProductModal,
    Pagination
  },
  mixins: [toastMixin, alertMixin, loadingMixin],
  methods: {
    getProducts(page = 1) {
      this.isLoading = true
      admin_getProducts(page).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.products = res.data.products
          this.pagination = res.data.pagination
        }
      })
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      const productComponent = this.$refs.productModal
      productComponent.showModal()
    },
    updateProduct(item) {
      // let api = `${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_PATH}/admin/product`
      // let httpMethod = 'post'
      const productComponent = this.$refs.productModal
      this.tempProduct = item
      if (!this.isNew) {
        admin_putProduct({ data: this.tempProduct }, item.id).then((res) => {
          this.showToast({ title: res.data.message, icon: 'success' })
          if (res.data.success) {
            console.log(res)
            productComponent.hideModal()
            this.getProducts()
          }
        })
        // api = `${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_PATH}/admin/product/${
        //   item.id
        // }`
        // httpMethod = 'put'
      } else {
        admin_postProduct({ data: this.tempProduct }).then((res) => {
          this.showToast({ title: res.data.message, icon: 'success' })
          productComponent.hideModal()
          this.getProducts()
        })
      }
      // this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
      //   console.log(res)
      //   productComponent.hideModal()
      //   this.getProducts()
      // })
    },
    updateIsAble(item) {
      this.tempProduct = item
      this.tempProduct.is_enabled = !this.tempProduct.is_enabled
      admin_putProduct({ data: this.tempProduct }, item.id).then((res) => {
        if (res.data.success) {
          this.showToast({ title: res.data.message, icon: 'success' })
          this.getProducts()
        }
      })
    },
    deleteProduct(item) {
      this.showAlert({ title: '確定刪除嗎?', icon: 'warning', showCancelButton: true }).then(
        (result) => {
          if (result.isConfirmed) {
            admin_deleteProduct(item.id).then((res) => {
              this.getProducts()
              this.showToast({ title: res.data.message, icon: 'success' })
            })
          }
        }
      )
    },
    toggleCheckbox() {
      this.productChecked = !this.productChecked
    }
  },
  created() {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/mixin.scss';
input[type='checkbox'] {
  height: 0;
  width: 0;
  visibility: hidden;
}

label {
  cursor: pointer;
  text-indent: -9999px;
  width: 44px;
  height: 26px;
  background: rgb(189, 189, 189);
  display: block;
  border-radius: 100px;
  position: relative;
}

label:after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 20px;
  transition: 0.3s;
}

input.active + label {
  background: #198754;
}

input.active + label:after {
  left: calc(100% - 3px);
  transform: translateX(-100%);
}

label:active:after {
  width: 30px;
}
</style>
