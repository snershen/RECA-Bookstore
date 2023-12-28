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
      isLoading: false,
      //收藏列表
      collectList: [],
      collectStorage: []
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
      console.log(this.isEmptyResult)
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
      this.isShowCollapse = !this.isShowCollapse
    },
    getStorage() {
      if (localStorage.getItem('collectList')) {
        this.collectStorage = JSON.parse(localStorage.getItem('collectList'))
      }
      return
    },

    addOrRemoveCollect(item, isSolid) {
      if (!localStorage.getItem('collectList')) {
        if (isSolid) {
          this.collectList.push({ ...item, isSolid })
          localStorage.setItem('collectList', JSON.stringify(this.collectList))
          this.collectStorage = JSON.parse(localStorage.getItem('collectList'))
          return
        }
      }
      this.collectStorage = JSON.parse(localStorage.getItem('collectList'))
      this.collectList = this.collectStorage
      if (isSolid) {
        const index = this.collectStorage.findIndex((storage) => {
          return item.id === storage.id
        })
        if (index !== -1) {
          return
        }
        this.collectList.push({ ...item, isSolid })
        localStorage.setItem('collectList', JSON.stringify(this.collectList))
        this.collectStorage = JSON.parse(localStorage.getItem('collectList'))
      } else {
        const index = this.collectStorage.findIndex((storage) => {
          return item.id === storage.id
        })
        this.collectList.splice(index, 1)
        localStorage.setItem('collectList', JSON.stringify(this.collectList))
        this.collectStorage = JSON.parse(localStorage.getItem('collectList'))
      }
    }
  }
})
