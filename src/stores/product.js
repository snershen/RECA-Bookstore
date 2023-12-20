import { defineStore } from 'pinia'

import { userGetProduct } from '@/utils/apis'
import { userGetSingleProduct } from '@/utils/apis'

export default defineStore('productStore', {
  state: () => {
    return {
      productList: [],
      singleProduct: {},
      singleProductId: '',
      //篩選：分類
      categoryList: [],
      filterResult: [],
      selectedCategory: '全部',
      //篩選：文字搜尋
      searchString: '',
      searchResult: [],
      isEmptyResult: false,
      isShowCollapse: false,
      //更多類似產品
      alikeProduct: [],
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
      this.singleProductId = id
      this.isLoading = true
      userGetSingleProduct(id).then((res) => {
        this.isLoading = false
        this.singleProduct = res.data.product
        this.showAlikeProduct(this.singleProduct)
      })
    },
    filterProduct(target) {
      this.isEmptyResult = false
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
      this.isEmptyResult = false
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
      if (this.searchResult.length === 0) {
        this.isEmptyResult = true
      }
    },
    updateSearchStr(target) {
      this.searchString = target
      this.searchProduct(this.searchString)
    },
    showAlikeProduct(target) {
      const result = this.productList.filter((item) => {
        if (item.id !== target.id) return item.category === target.category
      })
      this.alikeProduct = result
    },
    toggleCollapse() {
      console.log(this.isShowCollapse)
      this.isShowCollapse = !this.isShowCollapse
    }
  }
})
