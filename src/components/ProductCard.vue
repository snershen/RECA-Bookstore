<template>
  <div
    class="position-relative p-3 d-flex flex-column w-100 bg-white border-light-300 h-100 product-card"
  >
    <button
      type="button"
      class="like-btn btn btn-white position-absolute top-0 end-0 pt-2 pe-2 border-0"
      @click.prevent="handleCollectBtn(item, isSolid)"
    >
      <span class="rounded-circle bg-white shadow-sm">
        <font-awesome-icon :icon="icon" class="text-primary" />
      </span>
    </button>
    <img
      :src="item.imageUrl"
      :alt="item.title"
      class="mb-3 w-100 object-fit-contain"
      height="180"
    />
    <h3 class="flex-grow-1 fs-6 text-overflow">{{ item.title }}</h3>
    <a href="#" class="stretched-link" @click.prevent="directSingleProduct(item.id)"></a>
    <p class="price">${{ item.price }}</p>
    <!-- <div class="d-flex justify-content-between align-items-center">
      <a href="#" class="btn btn-outline-dark w-100 text-nowrap">放入購物車</a>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import productStore from '@/stores/product.js'

export default {
  data() {
    return {
      isSolid: false,
      storageObj: {}
    }
  },
  props: {
    item: Object
  },
  computed: {
    icon() {
      return this.isSolid ? ['fas', 'heart'] : ['far', 'heart']
    },
    ...mapState(productStore, ['collectList', 'collectStorage'])
  },
  methods: {
    ...mapActions(productStore, ['addOrRemoveCollect', 'getStorage']),
    directSingleProduct(id) {
      this.$router.push(`/user/products/${id}`)
    },
    changeCollectIcon() {
      this.isSolid = !this.isSolid
    },
    handleCollectBtn(item) {
      this.changeCollectIcon()
      this.addOrRemoveCollect(item, this.isSolid)
    },
    initializeIsSolid() {
      const copyCollectList = Array.from(this.collectStorage)
      const storedItem = copyCollectList.filter((storedItem) => storedItem.id === this.item.id)
      if (storedItem.length > 0) {
        this.isSolid = storedItem[0].isSolid ? true : false
      }
    }
  },
  created() {
    // localStorage.clear()
    this.getStorage()
    this.initializeIsSolid()
  }
}
</script>

<style scoped>
.border-light-300 {
  border: solid 1px #edebeb;
}

.product-card {
  transition: box-shadow 0.2s;
}

.product-card:hover {
  /* scale: 1.05; */
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
}

.like-btn {
  z-index: 10;
}

.like-btn span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
}
</style>
