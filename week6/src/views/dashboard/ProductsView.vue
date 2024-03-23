<template>
    <h2>產品列表</h2>
    <div class="container">
            <div class="text-end mt-4">
                <button class="btn btn-primary" type="button" @click="openAddProductModal">
                    建立新的產品
                </button>
            </div>
            <table class="table mt-4">
                <thead>
                    <tr>
                        <th width="120">
                            分類
                        </th>
                        <th>產品名稱</th>
                        <th width="120">
                            原價
                        </th>
                        <th width="120">
                            售價
                        </th>
                        <th width="100">
                            是否啟用
                        </th>
                        <th width="120">
                            編輯
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.id">
                        <td>{{product.category}}</td>
                        <td>{{product.title}}</td>
                        <td class="text-end">{{product.origin_price}}</td>
                        <td class="text-end">{{product.price}}</td>
                        <td>
                            <span v-show="product.is_enabled" class="text-success">啟用</span>
                            <span v-show="!product.is_enabled">未啟用</span>
                        </td>
                        <td>
                            <div class="btn-group">
                                <button type="button" class="btn btn-outline-primary btn-sm"
                                    @click="openEditProductModal(product)">
                                    編輯
                                </button>
                                <button type="button" class="btn btn-outline-danger btn-sm"
                                    @click="openDeleteProductModal(product)">
                                    刪除
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <pagination :pages="pages" :get-product="getProduct"></pagination>
        </div>
        <!-- Modal -->
        <product-modal
            :selected-product="selectedProduct"
            :add-product="addProduct"
            :edit-product="editProduct"
            :is-action-add="isActionAdd"
            :delete-image="deleteImage"
            :add-image="addImage"
            ref="productModal">
        </product-modal>
        <del-product-modal
            :selected-product="selectedProduct"
            :delete-product="deleteProduct"
            ref="delProductModal">
        </del-product-modal>
</template>

<script>
import axios from 'axios'
import pagination from '@/components/PaginationComponent.vue'
import productModal from '@/components/ProductModal.vue'
import delProductModal from '@/components/DelProductModal.vue'

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      selectedProduct: {
        imagesUrl: []
      },
      isActionAdd: false,
      products: [],
      pages: {}
    }
  },
  methods: {
    checkLogin () {
      axios.post(`${VITE_URL}/v2/api/user/check`)
        .then(res => {
          this.getProduct()
        })
        .catch(err => {
          console.log(err)
          this.$router.push('/login')
        })
    },
    getProduct (page = 1) {
      axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/admin/products?page=${page}`)
        .then(res => {
          // 轉成array
          this.products = Object.values(res.data.products)
          this.pages = res.data.pagination
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    openAddProductModal () {
      // 清空資料
      this.selectedProduct = { imagesUrl: [] }
      // 設定操作模式為新增
      this.isActionAdd = true
      this.$refs.productModal.openModal()
    },
    openEditProductModal (item) {
      this.selectedProduct = { ...item }
      // 設定操作模式為編輯
      this.isActionAdd = false
      this.$refs.productModal.openModal()
    },
    openDeleteProductModal (item) {
      this.selectedProduct = item
      this.$refs.delProductModal.openModal()
    },
    addProduct () {
      axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/admin/product`, { data: this.selectedProduct })
        .then(res => {
          alert(res.data.message)
          this.$refs.productModal.closeModal()
          this.getProduct()
        }).catch(err => {
          alert(err.data.message)
        })
    },
    editProduct () {
      axios.put(`${VITE_URL}/v2/api/${VITE_PATH}/admin/product/${this.selectedProduct.id}`, { data: this.selectedProduct })
        .then(res => {
          alert(res.data.message)
          this.$refs.productModal.closeModal()
          this.getProduct()
        }).catch(err => {
          alert(err.data.message)
        })
    },
    deleteProduct () {
      axios.delete(`${VITE_URL}/v2/api/${VITE_PATH}/admin/product/${this.selectedProduct.id}`)
        .then(res => {
          alert(res.data.message)
          this.$refs.delProductModal.closeModal()
          this.getProduct()
        }).catch(err => {
          alert(err.data.message)
        })
    },
    addImage () {
      if (this.selectedProduct.imagesUrl == null) { this.selectedProduct.imagesUrl = [] }

      this.selectedProduct.imagesUrl.push('')
    },
    deleteImage (index) {
      this.selectedProduct.imagesUrl.splice(index, 1)
    }

  },
  mounted () {
    // productModal = new bootstrap.Modal(document.getElementById('productModal'));
    // delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
    // 取得cookie
    // eslint-disable-next-line no-useless-escape
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    axios.defaults.headers.common.Authorization = token

    this.checkLogin()
  },
  components: {
    pagination,
    productModal,
    delProductModal
  }
}
</script>
