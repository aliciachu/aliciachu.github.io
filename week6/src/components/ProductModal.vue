<template>
<div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
                <h5 id="productModalLabel" class="modal-title">
                    <!-- 因為 add/edit 共用 modal, 判斷類型顯示正確的 title -->
                    <span v-if="isActionAdd">新增產品</span>
                    <span v-else>編輯產品</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="mb-2">
                            <div class="mb-3">
                                <label for="imageUrl" class="form-label">主要圖片</label>
                                <input v-model="editSelectedProduct.imageUrl" type="text" class="form-control"
                                    placeholder="請輸入圖片連結">
                            </div>
                            <img class="img-fluid" :src="selectedProduct.imageUrl" :alt="selectedProduct.title">
                        </div>
                        <h3 class="mb-3">更多圖片</h3>
                        <div class="mb-2" v-for="(image, index) in selectedProduct.imagesUrl" :key="image">
                            <div class="mb-3">
                                <label for="imageUrl" class="form-label">圖片 {{index+1}}</label>
                                <div style="display: flex">
                                    <input v-model="editSelectedProduct.imagesUrl[index]" type="text"
                                        class="form-control" placeholder="請輸入圖片連結">
                                    <button @click="deleteImage(index)" class="btn btn-danger btn-sm">X</button>
                                </div>

                            </div>
                            <img v-if="image" class="img-fluid" :src="image" :alt="selectedProduct.title">
                        </div>

                        <div>
                            <button class="btn btn-outline-primary btn-sm d-block w-100" type="button"
                                @click="addImage">
                                新增圖片
                            </button>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="mb-3">
                            <label for="title" class="form-label">標題</label>
                            <input v-model="editSelectedProduct.title" id="title" type="text" class="form-control"
                                placeholder="請輸入標題">
                        </div>

                        <div class="row">
                            <div class="mb-3 col-md-6">
                                <label for="category" class="form-label">分類</label>
                                <input v-model="editSelectedProduct.category" id="category" type="text"
                                    class="form-control" placeholder="請輸入分類">
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="price" class="form-label">單位</label>
                                <input v-model="editSelectedProduct.unit" id="unit" type="text" class="form-control"
                                    placeholder="請輸入單位">
                            </div>
                        </div>

                        <div class="row">
                            <div class="mb-3 col-md-6">
                                <label for="origin_price" class="form-label">原價</label>
                                <!-- 使用 .number 以符合 api 要的資料類型-->
                                <input v-model.number="editSelectedProduct.origin_price" id="origin_price"
                                    type="number" min="0" class="form-control" placeholder="請輸入原價">
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="price" class="form-label">售價</label>
                                <!-- 使用 .number 以符合 api 要的資料類型-->
                                <input v-model.number="editSelectedProduct.price" id="price" type="number" min="0"
                                    class="form-control" placeholder="請輸入售價">
                            </div>
                        </div>
                        <hr>

                        <div class="mb-3">
                            <label for="description" class="form-label">產品描述</label>
                            <textarea v-model="editSelectedProduct.description" id="description" type="text"
                                class="form-control" placeholder="請輸入產品描述">
            </textarea>
                        </div>
                        <div class="mb-3">
                            <label for="content" class="form-label">說明內容</label>
                            <textarea v-model="editSelectedProduct.content" id="description" type="text"
                                class="form-control" placeholder="請輸入說明內容">
            </textarea>
                        </div>
                        <div class="mb-3">
                            <div class="form-check">
                                <input v-model="editSelectedProduct.is_enabled" id="is_enabled"
                                    class="form-check-input" type="checkbox" :true-value="1" :false-value="0">
                                <label class="form-check-label" for="is_enabled">是否啟用</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                    取消
                </button>
                <button v-if="isActionAdd" type="button" class="btn btn-primary" @click="addProduct">
                    確認
                </button>
                <button v-else type="button" class="btn btn-primary" @click="editProduct">
                    確認
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: ['selectedProduct', 'isActionAdd', 'addProduct', 'editProduct', 'deleteImage', 'addImage'],
  data () {
    return {
      productModal: null,
      editSelectedProduct: {}
    }
  },
  mounted () {
    this.productModal = new Modal(document.getElementById('productModal'))
    this.editSelectedProduct = this.selectedProduct
  },
  watch: {
    tempProduct () {
      this.editSelectedProduct = this.selectedProduct
    }
  },
  methods: {
    openModal () {
      this.productModal.show()
    },
    closeModal () {
      this.productModal.hide()
    }
  }
}
</script>
