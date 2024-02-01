<template>
  <div class="position-relative px-3 py-4 d-flex flex-column w-100 bg-white h-100 product-card">
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
      height="160"
    />
    <div class="text-center flex-grow-1 d-flex flex-column">
      <p class="category fs-7 text-gray mb-1">{{ item.category }}</p>

      <h4 class="fs-6 fw-bold text-overflow-2 flex-grow-1">{{ item.title }}</h4>
      <RouterLink :to="`/products/${item.id}`" class="stretched-link"></RouterLink>
      <div class="d-flex justify-content-center align-items-center">
        <p class="fw-bold me-2">${{ item.price }}</p>
        <p class="fs-7 text-gray text-decoration-line-through">${{ item.origin_price }}</p>
      </div>
      <!-- <div class="d-flex justify-content-between align-items-center">
      <a href="#" class="btn btn-outline-dark w-100 text-nowrap">放入購物車</a>
    </div> -->
    </div>
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
      this.$router.push(`/products/${id}`)
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
  },
  beforeCreate() {
    if (this.$route.name === 'index') {
      document.body.classList.add('index-card-style')
    } else {
      document.body.classList.remove('index-card-style')
    }
  }
}
</script>

<style lang="scss" scoped>
.product-card {
  transition: 0.5s;
  border-radius: 8px;
}

.product-card:hover {
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.12);
}

.like-btn {
  z-index: 10;
}

.category {
  display: none;
}

.like-btn span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
}

.index-card-style {
  .product-card {
    border: solid 1px #eee;
    border-radius: 16px;
    max-width: 250px;
    &:hover {
      transform: scale(1.1);
    }
  }
  .category {
    display: block;
  }
  .like-btn {
    display: none;
  }
}
</style>
