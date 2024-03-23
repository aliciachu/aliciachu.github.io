<template>
    <h2>登入頁面</h2>
    <div id="app">
        <div class="container">
            <div class="row justify-content-center">
                <h1 class="h3 mb-3 font-weight-normal">
                    請先登入
                </h1>
                <div class="col-8">
                    <form id="form" class="form-signin">
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="username" placeholder="name@example.com"
                                required autofocus v-model="user.username">
                            <label for="username">Email address</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" class="form-control" id="password" placeholder="Password" required
                                v-model="user.password">
                            <label for="password">Password</label>
                        </div>
                        <button class="btn btn-lg btn-primary w-100 mt-3" type="button" @click="login">
                            登入
                        </button>
                    </form>
                </div>
            </div>
            <p class="mt-5 mb-3 text-muted">
                &copy; 2021~∞ - 六角學院
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
const { VITE_URL } = import.meta.env

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const { username, password } = this.user
      axios.post(`${VITE_URL}/v2/admin/signin`, { username, password })
        .then(res => {
          // 取得token跟expired，並設定cookie
          const { token, expired } = res.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`
          this.$router.push('/admin/products')
        })
        .catch(err => {
          console.log(err.data.message)
        })
    }
  }
}

</script>
