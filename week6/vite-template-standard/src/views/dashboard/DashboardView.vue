<template>
    <h2>這是後台</h2>
    <nav>
        <RouterLink to="/admin/products">產品列表</RouterLink> |
        <RouterLink to="/admin/order">訂單列表</RouterLink> |
        <RouterLink to="/">回到前台</RouterLink>
    </nav>
    <RouterView></RouterView>
</template>

<script>
import axios from 'axios'
const { VITE_URL } = import.meta.env
export default {
  methods: {
    checkLogin () {
      axios.post(`${VITE_URL}/v2/api/user/check`)
        .then(res => {
          if (res.data.success) {
            console.log('已登入')
            // this.getProduct()
          } else {
            alert(res.data.message)
            // window.location = 'week2-login.html'
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    // 取得cookie
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    axios.defaults.headers.common.Authorization = token

    this.checkLogin()
  }
}
</script>
