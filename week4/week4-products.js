import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js';
import pagination from '../../week4/components/pagination.js';
import productModal from '../../week4/components/productModal.js';
import delProductModal from '../../week4/components/delProductModal.js';

const url = "https://ec-course-api.hexschool.io/v2/";
const path = "amaaaa";

const data = createApp({
    data() {
        return {
            selectedProduct: {
                imagesUrl: []
            },
            isActionAdd: false,
            products: [],
            pages: {},
        }
    },
    methods: {
        checkLogin() {
            axios.post(`${url}api/user/check`)
                .then(res => {
                    this.getProduct();
                })
                .catch(err => {
                    console.log(err);
                    window.location = 'week4-login.html';
                })
        },
        getProduct(page = 1) {
            axios.get(`${url}api/${path}/admin/products?page=${page}`)
                .then(res => {
                    //轉成array
                    this.products = Object.values(res.data.products);
                    this.pages = res.data.pagination;
                    console.log(res);
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
            this.$refs.productModal.openModal();
        },
        openEditProductModal(item) {
            this.selectedProduct = { ...item };
            //設定操作模式為編輯
            this.isActionAdd = false;
            this.$refs.productModal.openModal();
        },
        openDeleteProductModal(item) {
            this.selectedProduct = item;
            this.$refs.delProductModal.openModal();
        },
        addProduct() {
            axios.post(`${url}api/${path}/admin/product`, { data: this.selectedProduct })
                .then(res => {
                    alert(res.data.message);
                    this.$refs.productModal.closeModal();
                    this.getProduct();
                }).catch(err => {
                    alert(err.data.message);
                });
        },
        editProduct() {
            axios.put(`${url}api/${path}/admin/product/${this.selectedProduct.id}`, { data: this.selectedProduct })
                .then(res => {
                    alert(res.data.message);
                    this.$refs.productModal.closeModal();
                    this.getProduct();
                }).catch(err => {
                    alert(err.data.message);
                });
        },
        deleteProduct() {
            axios.delete(`${url}api/${path}/admin/product/${this.selectedProduct.id}`)
                .then(res => {
                    alert(res.data.message);
                    this.$refs.delProductModal.closeModal();
                    this.getProduct();
                }).catch(err => {
                    alert(err.data.message);
                });
        },
        addImage() {
            if (this.selectedProduct.imagesUrl == null)
                this.selectedProduct.imagesUrl = [];

            this.selectedProduct.imagesUrl.push('');
        },
        deleteImage(index) {
            this.selectedProduct.imagesUrl.splice(index, 1);
        },

    },
    mounted() {
        //productModal = new bootstrap.Modal(document.getElementById('productModal'));
        //delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
        // 取得cookie
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;

        this.checkLogin();
    },
    components: {
        pagination,
        productModal,
        delProductModal
    }
});
data.mount('#app');
