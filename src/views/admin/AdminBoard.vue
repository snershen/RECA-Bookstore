<template>
  <div class="d-flex">
    <AdminNav></AdminNav>
    <div class="view-area ms-auto">
      <div class="container p-4">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from '@/components/AdminNav.vue'
// import { apiCheck } from '@/utils/apis.js'
import axios from 'axios'

export default {
  components: {
    AdminNav
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)bookstoreAPI\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    axios.defaults.headers.common.Authorization = token
    axios.post(`${import.meta.env.VITE_API_URL}/api/user/check`).then((res) => {
      console.log(res)
      if (!res.data.success) {
        this.$router.push('/login')
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
