<template>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="signin">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
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
          <label for="inputPassword" class="sr-only">Password</label>
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
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
        </div>
      </div>
    </form>
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
