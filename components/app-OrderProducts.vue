<template>
  <transition name="fade" mode="out-in">
    <div class="order_products">
      <div @click="closeProduct" class="order_product__close">
        <img src="../assets/images/close.svg" />
      </div>
      <div class="products_blocks">
        <div v-if="selectedOrder" class="product_content">
          <h4>{{ selectedOrder.title }}</h4>
          <div class="btn_add__product">
            <div class="btn_add__img">
              <svg>
                <use
                  xlink:href="../assets/images/sprite/add-sprite.svg#add"
                ></use>
              </svg>
            </div>
            <span class="btn_add__text text-success">{{
              $t("product.add")
            }}</span>
          </div>
          <div>
            <div
              v-for="product in getExpandedOrderProducts"
              :key="product.id"
              class="product_block"
            >
              <div class="product_img">
                <img
                  :src="product.photo"
                  :alt="product.type"
                  v-if="imageExists(product.photo)"
                />
                <img v-else src="../assets/images/no-image.svg" />
              </div>
              <div class="product_info">
                <p class="product_info__title">{{ product.title }}</p>
                <p class="product_info__sn">SN-{{ product.serialNumber }}</p>
              </div>
              <p class="product_free">{{ $t("product.free") }}</p>
              <div @click="showPopup(product)" class="delete_product">
                <svg>
                  <use
                    xlink:href="../assets/images/sprite/delete-sprite.svg#delete"
                  ></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    selectedOrder: {
      type: Object,
      default: null,
    },

    selectedProduct: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      selectedProductId: null,
    };
  },
  computed: {
    getExpandedOrderProducts() {
      return this.selectedOrder ? this.selectedOrder.products : [];
    },
  },

  methods: {
    imageExists(url: string) {
      var img = new Image();
      img.src = url;
      return img.complete || img.width > 0 || img.height > 0;
    },
    closeProduct() {
      this.$emit("close-product");
    },
    showPopup(product: string | number) {
      this.$emit("update:selectedProduct", product);
      this.$emit("update:showDeletePopup", true);
    },
  },
});
</script>
<style scoped>
.order_products {
  display: none;
  padding: 20px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background: #fff;
  position: relative;
  width: 100%;
}
.order_products.active {
  display: block;
}
.order_product__close {
  position: absolute;
  cursor: pointer;
  max-width: 30px;
  height: 30px;
  width: 100%;
  right: -15px;
  top: -15px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(196, 196, 196, 0.25);
  border-radius: 50%;
}
.product_img {
  max-width: 40px;
  width: 100%;
  height: auto;
}
.product_info {
  padding-right: 20px;
}
.product_info__title {
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  border-bottom: 1px solid #ced4da;
  color: #000;
  margin-bottom: 5px;
}
.product_info__sn {
  font-size: 14px;
  line-height: 14px;
  color: #ccc;
  font-weight: 400;
}
.order_product__close > img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.btn_add__product {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.product_content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.btn_add__img {
  width: 20px;
  height: 20px;
  background: #28a745;
  border-radius: 50%;
  position: relative;
}
.btn_add__img > svg {
  width: 15px;
  height: 15px;
  fill: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.btn_add__text {
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
}
.delete_product {
  width: 20px;
  height: 20px;
  margin-left: auto;
}
.delete_product > svg {
  width: 100%;
  height: 100%;
  vertical-align: baseline;
}
.products_blocks {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.product_block {
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  transition: all 0.2s;
  padding: 10px 0;
  border-top: 1px solid #ced4da;
}
.product_block::before {
  content: "";
  width: 10px;
  height: 10px;
  display: block;
  background: yellowgreen;
  border-radius: 50%;
  border: 1px solid yellowgreen;
}
.product_free {
  color: yellowgreen;
}
</style>
