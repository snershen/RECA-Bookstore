<template>
  <div class="d-flex bg-light min-height-100 pt-5 pt-lg-0">
    <NavbarComponent class="border-end" />
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
        <RouterView v-if="checkSuccess"/>
      </div>
    </div>
  </div>
</template>

<script>
import { apiCheck } from '@/assets/js/apis.js'
import NavbarComponent from '@/components/admin/NavbarComponent.vue'
import toastMixin from '@/mixins/toastMixin.js'

export default {
  data() {
    return {
      username: '',
      checkSuccess: false,
    }
  },
  components: {
    NavbarComponent
  },
  mixins: [ toastMixin ],
  methods:{
    checkLogin(){
    apiCheck()
      .then((res) => {
        if (!res.data.success) {
          this.$router.push({ name: 'admin-login' })
          this.showToast({
            title: '登入失敗',
            icon: 'error',
            position: 'top'
          })
          return 
        }
        this.username = sessionStorage.getItem('username')
        this.checkSuccess = true;
        this.showToast({
          title: '登入驗證成功',
          position: 'top',
          icon: 'success',
        })
      })
      .catch((err) => {
        this.$router.push({ name: 'admin-login' })
        console.error(err)
        this.showToast({
          title: '登入失敗',
          icon: 'error',
          position: 'top'
        })
      })
      }
  },
  created() {
    this.checkLogin()
  }
}
</script>

<style lang="scss" scoped>
.view-area {
  width: 100%;
  @media (min-width: 992px) {
    width: calc(100% - 240px);
  }
}
</style>
