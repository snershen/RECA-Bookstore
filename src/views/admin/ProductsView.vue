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
            <th width="5%">精選</th>
            <th width="10%">編輯</th>
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
              <button
                type="button"
                class="btn border-0 ps-0"
                @click.prevent="updateIsFeature(product)"
              >
                <font-awesome-icon
                  :icon="['far', 'star']"
                  class="text-gray fa-lg"
                  v-show="product.is_feature === false || !product.is_feature"
                />
                <font-awesome-icon
                  :icon="['fas', 'star']"
                  class="text-dark fa-lg"
                  v-show="product.is_feature === true"
                />
              </button>
            </td>
            <td>
              <div>
                <button class="btn btn-dark btn-sm me-1 mb-1" @click="openModal(false, product)">
                  編輯
                </button>
                <button class="btn btn-outline-danger btn-sm mb-1" @click="deleteProduct(product)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <PaginationComponent :inner-pagination="pagination" @emit-page="getProducts" class="py-5" />
    <ProductModal
      ref="productModal"
      :product="tempProduct"
      :isNew="isNew"
      @update-product="updateProduct"
    />
  </div>
</template>

<script>
import { adminGetProducts, adminPostProduct, adminPutProduct, adminDeleteProduct } from '@/assets/js/apis.js'

import ProductModal from '@/components/admin/ProductModal.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'

import toastMixin from '@/mixins/toastMixin'
import alertMixin from '@/mixins/alertMixin'
import loadingMixin from '@/mixins/loadingMixin'

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: { category: ''},
      isNew: true,
      isLoading: false
    }
  },
  components: {
    ProductModal,
    PaginationComponent
  },
  mixins: [toastMixin, alertMixin, loadingMixin],
  methods: {
    getProducts(page = 1) {
      this.isLoading = true
      adminGetProducts(page)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            this.products = res.data.products
            this.pagination = res.data.pagination
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = { category: '' }
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      const productComponent = this.$refs.productModal
      productComponent.showModal()
    },
    updateProduct(item) {
      const productComponent = this.$refs.productModal
      this.tempProduct = item
      if (!this.isNew) {
        adminPutProduct({ data: this.tempProduct }, item.id)
          .then((res) => {
            this.showToast({ title: res.data.message, icon: 'success' })
            if (res.data.success) {
              productComponent.hideModal()
              this.getProducts(this.pagination.current_page)
            }
          })
          .catch((err) => {
            console.error(err)
          })
      } else {
        adminPostProduct({ data: this.tempProduct })
          .then((res) => {
            this.showToast({ title: res.data.message, icon: 'success' })
            productComponent.hideModal()
            this.getProducts(this.pagination.current_page)
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
    updateIsAble(item) {
      this.tempProduct = item
      this.tempProduct.is_enabled = !this.tempProduct.is_enabled
      adminPutProduct({ data: this.tempProduct }, item.id)
        .then((res) => {
          if (res.data.success) {
            this.showToast({ title: res.data.message, icon: 'success' })
            this.getProducts(this.pagination.current_page)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    updateIsFeature(item) {
      this.tempProduct = item
      this.tempProduct.is_feature = !this.tempProduct.is_feature
      adminPutProduct({ data: this.tempProduct }, item.id)
        .then((res) => {
          if (res.data.success) {
            this.showToast({ title: res.data.message, icon: 'success' })
            this.getProducts(this.pagination.current_page)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    deleteProduct(item) {
      this.showAlert({ title: `確定刪除「${item.title}」嗎?`, icon: 'warning', showCancelButton: true })
        .then((result) => {
          if (result.isConfirmed) {
            adminDeleteProduct(item.id)
              .then((res) => {
                this.getProducts(this.pagination.current_page)
                this.showToast({ title: res.data.message, icon: 'success' })
              })
              .catch((err) => {
                console.error(err)
              })
          }
        })
        .catch((err) => {
          console.error(err)
        })
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
@import '@/assets/scss/mixin.scss';
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
