<template>
  <div
    class="position-relative p-3 d-flex flex-column w-100 bg-white border-light-300 h-100 product-card"
  >
    <a href="#" class="position-absolute top-0 end-0 pt-2 pe-2">
      <span class="rounded-circle bg-white p-2 shadow-sm">
        <font-awesome-icon :icon="['fas', 'heart']" class="fa-lg text-success" />
      </span>
    </a>
    <img
      :src="item.imageUrl"
      :alt="item.title"
      class="mb-3 w-100 object-fit-contain"
      height="180"
    />
    <h3 class="flex-grow-1 fs-6">{{ item.title }}</h3>
    <a href="#" class="stretched-link" @click.prevent="directSingleProduct(item.id)"></a>
    <p class="price">${{ item.price }}</p>
    <!-- <div class="d-flex justify-content-between align-items-center">
      <a href="#" class="btn btn-outline-dark w-100 text-nowrap">放入購物車</a>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {
    directSingleProduct(id) {
      this.$router.push(`/user/products/${id}`)
    }
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
</style>
