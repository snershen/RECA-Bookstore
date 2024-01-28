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
    async getProductAll() {
      try {
        this.isLoading = true
        const res = await userGetProductAll()
        this.productAll = res.data.products
        this.renderCategory()
        this.isLoading = false
        console.log(res)
        return res.data.products
      } catch (error) {
        console.error('Error fetching data:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async getProducts(page = 1) {
      try {
        this.isLoading = true
        const res = await userGetProduct(page)
        const { products, pagination } = res.data
        if (this.selectedCategory === '全部') {
          this.filterResult = products
          this.pagination = pagination
        }
        this.productList = products
      } catch (error) {
        console.error('Error fetching data:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async getSingleProduct(id) {
      try {
        this.isLoading = true
        this.singleProductId = id
        const res = await userGetSingleProduct(id)
        this.singleProduct = res.data.product
        this.singleProduct.description = textBreak(this.singleProduct.description)
        this.singleProduct.content = textBreak(this.singleProduct.content)
        this.showAlikeProduct(this.singleProduct)
      } catch (error) {
        console.error('Error fetching data:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async filterProduct(target) {
      try {
        this.isEmptyResult = false
        this.searchResult = []
        this.selectedCategory = target === '全部' ? '全部' : target
        const res = await userGetProduct(1, target === '全部' ? '' : target)
        const { products, pagination } = res.data
        this.filterResult = products
        this.pagination = pagination
        this.singleProduct = ''
      } catch (error) {
        console.error('Error fetching data:', error)
        throw error
      }
    },
    async renderCategory() {
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
    async searchProduct(searchStr) {
      try {
        this.searchResult = []
        this.searchString = searchStr
        const result = await this.productAll.filter((item) => {
          return item.title.includes(searchStr)
        })
        this.searchResult = result
        this.selectedCategory = '全部'
        if (this.searchResult.length === 0) {
          this.isEmptyResult = true
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        throw error
      }
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
