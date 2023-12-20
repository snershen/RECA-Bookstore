import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

import { userGetProduct } from '@/utils/apis'
import { userGetSingleProduct } from '@/utils/apis'

export default defineStore('productStore', {
  state: () => {
    return {
      productList: [],
      singleProduct: {},
      filterResult: [],
      categoryList: [],
      selectedCategory: '全部',
      searchResult: [],
      searchString: '',
      isLoading: false
    }
  },
  actions: {
    getProducts() {
      this.isLoading = true
      userGetProduct().then((res) => {
        this.isLoading = false
        this.productList = res.data.products
        this.renderCategory()
      })
    },
    getSingleProduct(id) {
      this.isLoading = true
      userGetSingleProduct(id).then((res) => {
        this.isLoading = false
        this.singleProduct = res.data.product
      })
    },
    filterProduct(target) {
      this.searchResult = []
      if (target === '全部') {
        this.selectedCategory = '全部'
        this.filterResult = this.productList
        return
      }
      this.selectedCategory = target
      const result = [...this.productList].filter((item) => {
        return item.category === target
      })
      this.filterResult = result
    },
    renderCategory() {
      const categoryObj = {}
      const newProductList = [...this.productList]
      newProductList.forEach((item) => {
        if (!categoryObj[item.category]) {
          categoryObj[item.category] = 1
        } else {
          categoryObj[item.category]++
        }
      })
      this.categoryList = Object.keys(categoryObj)
    },
    searchProduct(searchStr) {
      this.searchResult = []
      this.searchString = searchStr
      const newSearchStr = searchStr.trim()
      const result = this.productList.filter((item) => {
        return item.title.includes(newSearchStr)
      })
      this.searchResult = result
      this.selectedCategory = '全部'
    },
    updateSearchStr(target) {
      this.searchString = target
      this.searchProduct(this.searchString)
    }
  }
})
