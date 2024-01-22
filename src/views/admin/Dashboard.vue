<template>
  <div class="d-flex">
    <Navbar />
    <div class="view-area ms-auto">
      <div class="container p-4">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/admin/Navbar.vue'

import axios from 'axios'

export default {
  components: {
    Navbar
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)bookstoreAPI\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    axios.defaults.headers.common.Authorization = token
    axios.post(`${import.meta.env.VITE_API_URL}/api/user/check`).then((res) => {
      console.log(res)
      this.$router.push({ name: 'admin-product' })
      if (!res.data.success) {
        this.$router.push({ name: 'admin-login' })
      }
    })
  }
}
</script>

<style scoped>
.view-area {
  width: calc(100% - 250px);
}
</style>
