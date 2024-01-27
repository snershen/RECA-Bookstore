<template>
  <div class="d-flex bg-light min-height-100">
    <Navbar class="border-end" />
    <div class="view-area ms-auto">
      <div class="border-bottom py-3 bg-white">
        <div class="container d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <font-awesome-icon :icon="['fas', 'user']" class="me-2" />
            <p>Hi, {{ username }}</p>
          </div>
          <RouterLink :to="{ name: 'index' }" target="_blank">回到前台</RouterLink>
        </div>
      </div>
      <div class="container py-4">
        <RouterView :isLoading="isLoading" />
      </div>
    </div>
  </div>
</template>

<script>
import { apiCheck } from '@/utils/apis.js'
import Navbar from '@/components/admin/Navbar.vue'

export default {
  data() {
    return {
      username: ''
    }
  },
  components: {
    Navbar
  },
  created() {
    apiCheck()
      .then((res) => {
        this.$router.push({ name: 'admin-products' })
        this.username = sessionStorage.getItem('username')
        if (!res.data.success) {
          this.$router.push({ name: 'admin-login' })
        }
      })
      .catch((err) => {
        this.$router.push({ name: 'admin-login' })
        console.error(err)
      })
  }
}
</script>

<style lang="scss" scoped>
.view-area {
  width: calc(100% - 240px);
}
</style>
