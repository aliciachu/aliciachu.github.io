import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js';

const url = "https://ec-course-api.hexschool.io/v2/";
const path = "amaaaa";

const data = createApp({
  data() {
    return {
      selectedProduct: {},
      products: []
    }
  }, methods: {
    checkLogin() {
      axios.post(`${url}api/user/check`)
        .then(res => {
          if (res.data.success) {
            this.getProduct();
          } else {
            alert(res.data.message);
            window.location = 'week2-login.html';
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    getProduct() {
      axios.get(`${url}api/${path}/admin/products/all`)
        .then(res => {
          if (res.data.success) {
            //轉成array
            this.products = Object.values(res.data.products);
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  mounted() {
    // 取得cookie
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;

    this.checkLogin();
  }
});
data.mount('#app');
