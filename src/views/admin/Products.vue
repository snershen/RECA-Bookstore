<template>
  <Loading :active="isLoading">
    <img src="@/assets/img/icons8-book4.gif" alt="" />
  </Loading>

  <div class="d-flex justify-content-between align-items-center">
    <h1 class="fs-3 fw-bold">產品列表管理</h1>
    <button class="btn btn-primary" type="button" @click="openModal(true)">新增產品</button>
  </div>
  {{ productChecked }}
  <table class="table table-hover mt-4 align-middle">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.category }}</td>
        <td>{{ product.title }}</td>
        <td class="text-right">{{ product.origin_price }}</td>
        <td class="text-right">{{ product.price }}</td>
        <td>
          <!-- <span class="text-success" v-if="product.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span> -->
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
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false, product)">
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
  <Pagination
    :inner-pagination="pagination"
    @emit-page="getProducts"
    v-if="pagination.total_pages !== 1"
    class="py-5"
  ></Pagination>
  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @update-product="updateProduct"
  ></ProductModal>
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
      isNew: true
    }
  },
  components: {
    ProductModal,
    Pagination
  },
  mixins: [toastMixin, alertMixin, loadingMixin],
  methods: {
    getProducts(page = 1) {
      this.startLoading()
      admin_getProducts(page).then((res) => {
        this.stopLoading()
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

<style scoped>
input[type='checkbox'] {
  height: 0;
  width: 0;
  visibility: hidden;
}

label {
  cursor: pointer;
  text-indent: -9999px;
  width: 50px;
  height: 30px;
  background: rgb(189, 189, 189);
  display: block;
  border-radius: 100px;
  position: relative;
}

label:after {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 20px;
  transition: 0.3s;
}

input.active + label {
  background: #ff5a26;
}

input.active + label:after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}

label:active:after {
  width: 30px;
}
</style>
