Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
});

// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('./zh-TW.json');

// Activate the locale
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh-TW'),
    validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

const url = "https://ec-course-api.hexschool.io/v2/";
const path = "amaaaa";

const userModal = {
    props: ['tempProduct', 'addToCart'],
    data() {
        return {
            productModal: null,
             qty: 1
        }
    },
    methods: {
        open() {
            this.productModal.show();
        },
        close() {
            this.productModal.hide();
        }
    },
    template: '#userProductModal',
    mounted() {
        this.productModal = new bootstrap.Modal(this.$refs.modal);
    }

}

const app = Vue.createApp({
    data() {
        return {
            products: [],
            tempProduct: {},
            status: {
                addCartLoading: '',
                cartQtyLoading: '',
                delCartLoading: ''
            },
            carts: {}
            
        }
    },
    methods: {
        getProducts() {
            axios.get(`${url}api/${path}/products/all`)
                .then(res => {
                    this.products = res.data.products;
                })
        },
        openModal(product) {
            this.tempProduct = product;
            this.$refs.userModal.open();
        },
        addToCart(product_id, qty = 1){
            const order = {
                product_id,
                qty
            };
            this.status.addCartLoading = product_id;
            axios.post(`${url}api/${path}/cart`, {data: order})
                .then(res => {
                    this.status.addCartLoading = '';
                    this.getCart();
                    this.$refs.userModal.close();
                });
        },
        getCart(){
            axios.get(`${url}api/${path}/cart`)
                .then(res => {
                    console.log(res);
                    this.carts=res.data.data;
                });
        },
        changeCartQty(item, qty = 1){
            const order = {
                product_id: item.product_id,
                qty
            };
            this.status.cartQtyLoading = item.id;
            axios.put(`${url}api/${path}/cart/${item.id}`, {data: order})
                .then(res => {
                    this.status.cartQtyLoading = '';
                    this.getCart();                    
                });
        },
        removeCartItem(id){
            this.status.delCartLoading = id;
            axios.delete(`${url}api/${path}/cart/${id}`)
                .then(res => {
                    this.status.delCartLoading = '';
                    this.getCart();
                });
        },
    },
    components: {
        userModal
    },
    mounted() {
        this.getProducts();
        this.getCart();
    }
});
app.component('v-form', VeeValidate.Form);
app.component('v-field', VeeValidate.Field);
app.component('error-message', VeeValidate.ErrorMessage);
app.mount('#app');