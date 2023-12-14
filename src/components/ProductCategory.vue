<template>
  <div class="accordion" id="accordionExample" ref="accordion">
    <ul>
      <li>
        <a
          href="#"
          class="ps-3 py-3 d-block"
          :class="{ 'bg-selected': selectedItem === '全部' }"
          @click.prevent="filterProduct('全部')"
          >全部</a
        >
      </li>
      <li v-for="item in category">
        <a
          href="#"
          class="px-3 py-3 w-100"
          :class="{ 'bg-selected': selectedItem === item }"
          @click.prevent="filterProduct(item)"
        >
          {{ item }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import Accordion from 'bootstrap/js/dist/collapse'
export default {
  data() {
    return {
      accordion: {},
      productList: [],
      category: [],
      selectedItem: ''
    }
  },
  props: {
    innerProductList: {
      default: []
    }
  },
  methods: {
    getCategory() {
      this.productList = this.innerProductList
      const categoryObj = {}
      const newProductList = [...this.productList]

      newProductList.forEach((item) => {
        if (!categoryObj[item.category]) {
          categoryObj[item.category] = 1
        } else {
          categoryObj[item.category]++
        }
      })

      this.category = Object.keys(categoryObj)
    },
    filterProduct(category) {
      this.$emit('filterProduct', category)
      this.selectedItem = category
      console.log(this.selectedItem, category)
      if (category === '全部') {
        this.selectedItem = '全部'
      }
    }
  },
  watch: {
    innerProductList() {
      this.productList = this.innerProductList
      this.getCategory()
    }
  },
  mounted() {
    this.accordion = new Accordion(this.$refs.accordion)
    this.selectedItem = '全部'
  }
}
</script>

<style scoped>
.bg-selected {
  background: rgb(243, 243, 243);
  font-weight: bold;
}
</style>
