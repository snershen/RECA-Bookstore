<template>
  <div class="bg-primary vh-100">
    <div
      class="container text-white d-flex flex-column justify-content-center align-items-center h-100 text-center"
    >
      <h1 class="title fw-bold">404</h1>
      <h2 class="subtitle fw-bold mb-4">not found</h2>
      <p class="fs-lg-2 fs-3">即將回到首頁</p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$router.push('/')
    }, 2000)
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 10em;
  font-weight: bold;
  letter-spacing: 12px;
  line-height: 1.2;
  @media (min-width: 992px) {
    font-size: 12em;
  }
}

.subtitle {
  font-size: 4em;
  font-weight: bold;
  line-height: 1.2;
  @media (min-width: 992px) {
    font-size: 6em;
  }
}
</style>