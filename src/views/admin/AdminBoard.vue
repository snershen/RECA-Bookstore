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
import AdminNav from '../../components/AdminNav.vue'
import { apiCheck } from '../../utils/apis.js'

export default {
  components: {
    AdminNav
  },
  created() {
    apiCheck().then((res) => {
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
