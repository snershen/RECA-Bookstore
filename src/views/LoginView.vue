<template>
  <div class="container-fluid px-0 bg-light vh-100">
    <div class="row mx-0 align-items-center h-100">
      <div class="col-6 px-0 d-none d-lg-block">
        <img
          src="@/assets/img/login.png"
          alt="login banner"
          class="object-fit-cover vh-100 w-100"
        />
      </div>
      <div class="col-lg-6 d-flex justify-content-center align-items-center d-md-block">
        <form class="row justify-content-center w-100" @submit.prevent="signin">
          <div class="col-md-8">
            <h1 class="fs-3 mb-4 fw-bold font-sans text-secondary">RECA 書店後台管理</h1>
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="name@example.com"
                v-model="user.username"
                required
              />
              <label for="email">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="name@example.com"
                v-model="user.password"
                required
              />
              <label for="password">Password</label>
            </div>

            <div class="text-end mt-4">
              <button
                type="submit"
                class="btn btn btn-secondary btn-block w-100 py-2"
                :disabled="user.password === '' || user.username === ''"
              >
                登入
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { apiSignIn } from '@/assets/js/apis.js'
import toastMixin from '@/mixins/toastMixin'

export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  mixins: [toastMixin],
  methods: {
    async signin() {
      try {
        const res = await apiSignIn(this.user)
        const message = res.data.message
        if (res.data.success) {
          const { token, expired } = res.data
          sessionStorage.setItem('username', this.user.username)
          // 取得的 token 存到 cookie
          document.cookie = `bookstoreAPI=${token}; expires=${new Date(expired)}`
          this.$router.push({ name: 'admin-products' })
          this.showToast({
            title: message,
            icon: 'success'
          })
        }
      } catch (err) {
        this.showToast({ title: `請輸入正確的帳號和密碼`, icon: 'warning' })
        console.error(err)
      }
    }
  }
}
</script>
