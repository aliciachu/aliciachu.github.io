import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js';

const url = "https://ec-course-api.hexschool.io/v2/";
const path = "amaaaa";

let productModal = null;
let delProductModal = null;
const data = createApp({
    data() {
        return {
            selectedProduct: {
                imagesUrl: []
            },
            isActionAdd: false,
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
        },
        openAddProductModal() {
            //清空資料
            this.selectedProduct = { imagesUrl: [] };
            //設定操作模式為新增
            this.isActionAdd = true;
            productModal.show();
        },
        openEditProductModal(item) {
            this.selectedProduct = { ...item };
            //設定操作模式為編輯
            this.isActionAdd = false;
            productModal.show();
        },
        openDeleteProductModal(item) {
            this.selectedProduct = { ...item };
            delProductModal.show();
        },
        addProduct() {
            axios.post(`${url}api/${path}/admin/product`, { data: this.selectedProduct })
                .then(res => {
                    alert(res.data.message);
                    productModal.hide();
                    this.getProduct();
                }).catch(err => {
                    alert(err.data.message);
                });
        },
        editProduct() {
            axios.put(`${url}api/${path}/admin/product/${this.selectedProduct.id}`, { data: this.selectedProduct })
                .then(res => {
                    alert(res.data.message);
                    productModal.hide();
                    this.getProduct();
                }).catch(err => {
                    alert(err.data.message);
                });
        },
        deleteProduct() {
            axios.delete(`${url}api/${path}/admin/product/${this.selectedProduct.id}`)
                .then(res => {
                    alert(res.data.message);
                    delProductModal.hide();
                    this.getProduct();
                }).catch(err => {
                    alert(err.data.message);
                });
        },
        addImage() {
            this.selectedProduct.imagesUrl.push('');
        },
        deleteImage(index) {
            this.selectedProduct.imagesUrl.splice(index, 1);
        },

    },
    mounted() {
        productModal = new bootstrap.Modal(document.getElementById('productModal'));
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
        // 取得cookie
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;

        this.checkLogin();
    }
});
data.mount('#app');
