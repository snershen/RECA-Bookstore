import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

import { userGetProduct } from '@/assets/js/apis'
import { userGetSingleProduct } from '@/assets/js/apis'
import { userGetProductAll } from '@/assets/js/apis'

export const useProductStore = defineStore('productStore', {
  state: () => {
    return {
      productList: [],
      productAll: [],
      pagination: {},
      singleProduct: {},
      //篩選：分類
      categoryList: [],
      filterResult: [],
      selectedCategory: '全部',
      sortStatus: false,
      sortTarget: '',
      //篩選：文字搜尋
      searchString: '',
      searchResult: [],
      isEmptyResult: false,
      //更多類似產品
      alikeProduct: [],
      isLoading: false,
      //收藏列表
      collectList: [],
      collectStorage: []
    }
  },
  getters: {
    filterToday: (state) =>
      state.productAll.sort((a, b) => {
        if (a.time && b.time) {
          return b.time.localeCompare(a.time)
        }
      })
  },
  actions: {
    showToast(options) {
      Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        ...options
      }).fire()
    },
    async getProductAll() {
      this.isLoading = true
      try {
        const res = await userGetProductAll()
        this.productAll = res.data.products
        this.renderCategory()
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
        if (this.selectedCategory === '全部') {
          const res = await userGetProduct(page)
          const { products, pagination } = res.data
          this.filterResult = products
          this.pagination = pagination
          this.productList = products
        } else {
          const res = await userGetProduct(page, this.selectedCategory)
          const { products, pagination } = res.data
          this.filterResult = products
          this.pagination = pagination
          this.productList = products
        }
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
        const res = await userGetSingleProduct(id)
        this.singleProduct = res.data.product
        this.showAlikeProduct(this.singleProduct)
      } catch (error) {
        console.error('Error fetching data:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // 篩選
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
    async filterProduct(target, tool) {
      try {
        this.isEmptyResult = false
        this.searchResult = []
        this.selectedCategory = target === '全部' ? '全部' : target
        const res = await userGetProduct(1, target === '全部' ? '' : target)
        const { products, pagination } = res.data
        this.filterResult = products
        this.pagination = pagination

        if (!tool) {
          this.singleProduct = ''
        }
        return products
      } catch (error) {
        console.error('Error fetching data:', error)
        throw error
      }
    },
    //搜尋
    async searchProduct(searchStr) {
      try {
        this.isEmptyResult = false
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

    //相關產品
    showAlikeProduct(target) {
      const result = this.productAll.filter((item) => {
        if (item.id !== target.id) return item.category === target.category
      })
      this.alikeProduct = result
    },

    //收藏
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
          this.showToast({
            title: '收藏成功',
            icon: 'success'
          })
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
        this.showToast({
          title: '收藏成功',
          icon: 'success'
        })
        localStorage.setItem('collectList', JSON.stringify(this.collectList))
        this.collectStorage = JSON.parse(localStorage.getItem('collectList'))
      } else {
        const index = this.collectStorage.findIndex((storage) => {
          return item.id === storage.id
        })
        this.collectList.splice(index, 1)
        localStorage.setItem('collectList', JSON.stringify(this.collectList))
        this.showToast({
          title: `已取消收藏`,
          icon: 'info'
        })
        this.collectStorage = JSON.parse(localStorage.getItem('collectList'))
      }
    },
    //排序
    sortProduct(sort) {
      if (sort === 'price') {
        this.sortTarget = 'price'
      } else if (sort === 'time') {
        this.sortTarget = 'time'
      } else if (sort === 'soldNum') {
        this.sortTarget = 'soldNum'
      }

      if (sort === 'time') {
        if (!this.sortStatus) {
          this.filterResult = [...this.filterResult].sort((a, b) => {
            if (a.time && b.time) {
              return a.time.localeCompare(b.time)
            }
          })
          this.sortStatus = !this.sortStatus
        } else {
          this.filterResult = [...this.filterResult].sort((a, b) => {
            if (a.time && b.time) {
              return b.time.localeCompare(a.time)
            }
          })
          this.sortStatus = !this.sortStatus
        }
        return
      }

      if (!this.sortStatus) {
        this.filterResult = [...this.filterResult].sort((a, b) => {
          return a[this.sortTarget] - b[this.sortTarget]
        })
        this.sortStatus = !this.sortStatus
      } else {
        this.filterResult = [...this.filterResult].sort((a, b) => {
          return b[this.sortTarget] - a[this.sortTarget]
        })
        this.sortStatus = !this.sortStatus
      }
    },
    sortTimeLower() {
      this.filterResult = [...this.filterResult].sort((a, b) => {
        if (a.time && b.time) {
          return b.time.localeCompare(a.time)
        }
      })
    },
    setLoading(value) {
      this.isLoading = value
    }
  }
})
