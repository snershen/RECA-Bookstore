import { defineStore } from 'pinia'
import { textBreak } from '@/utils/textBreak'

import { userGetProduct } from '@/utils/apis'
import { userGetProductAll } from '@/utils/apis'
import { userGetSingleProduct } from '@/utils/apis'

export default defineStore('productStore', {
  state: () => {
    return {
      productList: [],
      productAll: [],
      pagination: {},
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
    async getProductsAll() {
      try {
        this.isLoading = true
        const res = await userGetProductAll()
        this.productAll = res.data.products
        this.renderCategory()
        this.isLoading = false

        // 返回數據，如果需要的話
        return res.data.products
      } catch (error) {
        this.isLoading = false
        console.error('Error fetching data:', error)
        throw error
      }
    },
    getProducts(page = 1) {
      this.isLoading = true
      userGetProduct(page).then((res) => {
        this.isLoading = false
        this.productList = res.data.products
        this.pagination = res.data.pagination
      })
    },
    getSingleProduct(id) {
      this.singleProductId = id
      this.isLoading = true
      userGetSingleProduct(id).then((res) => {
        this.isLoading = false
        this.singleProduct = res.data.product
        this.singleProduct.description = textBreak(this.singleProduct.description)
        this.singleProduct.content = textBreak(this.singleProduct.content)
        this.showAlikeProduct(this.singleProduct)
      })
    },
    filterProduct(target) {
      this.isEmptyResult = false
      this.searchResult = []
      console.log(target)
      if (target === '全部') {
        this.selectedCategory = '全部'
        this.filterResult = this.productList
        this.getProducts((page = 1))
        return
      }
      this.selectedCategory = target
      const result = [...this.productAll].filter((item) => {
        return item.category === target
      })

      this.filterResult = result
      return result
    },
    renderCategory() {
      this.isEmptyResult = false
      const categoryObj = {}
      const newProductList = [...this.productAll]
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
      const result = this.productAll.filter((item) => {
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
