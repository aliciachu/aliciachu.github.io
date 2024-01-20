import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const url = "https://ec-course-api.hexschool.io/v2/";

const app = createApp({
    data() {
        return {
            user:{
                username: '',
                password: '',
            }
        }
    },
    methods: {
        login() {
            const { username, password } = this.user;
            axios.post(`${url}admin/signin`, { username, password })
                .then(res => {
                    if (res.data.success) {
                        //取得token跟expired，並設定cookie
                        const { token, expired } = res.data;
                        document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`;
                        window.location = 'week2-products.html';
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
});
app.mount('#app');

