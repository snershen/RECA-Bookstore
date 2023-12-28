<template>
  <div class="container-fluid px-0 bg-light">
    <div class="row mx-0 align-items-center">
      <div class="col-8 px-0">
        <img src="@/assets/img/login.png" alt="" class="object-fit-cover vh-100 w-100" />
      </div>
      <div class="col-4">
        <form class="row justify-content-center" @submit.prevent="signin">
          <div class="col-md-8">
            <h1 class="fs-4 mb-4 font-weight-normal fw-bold">RECA 書店後台管理</h1>
            <div class="mb-4">
              <label for="inputEmail" class="sr-only mb-2">Email address</label>
              <input
                type="email"
                id="inputEmail"
                class="form-control"
                placeholder="Email address"
                required
                autofocus
                v-model="user.username"
              />
            </div>
            <div class="mb-2">
              <label for="inputPassword" class="sr-only mb-2">Password</label>
              <input
                type="password"
                id="inputPassword"
                class="form-control"
                placeholder="Password"
                required
                v-model="user.password"
              />
            </div>

            <div class="text-end mt-4">
              <button class="btn btn btn-secondary btn-block w-100" type="submit">登入</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { apiSignIn } from '../../utils/apis.js'
import toastMixin from '../../mixins/toastMixin'

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
    signin() {
      apiSignIn(this.user).then((res) => {
        console.log(res.data)
        const message = res.data.message
        if (res.data.success) {
          const { token, expired } = res.data
          //取得的 token 存到 cookie
          document.cookie = `bookstoreAPI=${token}; expires=${new Date(expired)}`
          this.$router.push('/admin/products')
          this.showToast({
            title: message,
            icon: 'success'
          })
        } else {
          this.showToast({ title: `${message}，請輸入正確的帳號和密碼`, icon: 'warning' })
        }
      })
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
</style>
