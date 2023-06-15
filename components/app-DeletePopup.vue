<template>
  <div class="popup_delete">
    <div class="popup_container">
    <div @click="closePopup" class="popup__close">
      <img src="../assets/images/close.svg"/>
    </div>
      <div class="popup_content">
        <h4>{{$t("product.popup")}}</h4>
          <hr>
        <div class="popup_product">
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
        </div>
      </div>
      <div class="popup_btn">
        <button class="btn-cancel" @click="closePopup">{{$t('btn.cancel')}}</button>
        <button class="btn-delete" @click="deleteProduct">
          <svg>
              <use xlink:href="../assets/images/sprite/delete-sprite.svg#delete"></use>
            </svg>
          {{$t('btn.delete')}}
          </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    product: {
      type: Object,
      required: true,
    },
    selectedOrder: {
      type: Object,
      default: null,
    },
  },
  methods: {
    imageExists(url: string) {
      var img = new Image();
      img.src = url;
      return img.complete || img.width > 0 || img.height > 0;
    },
    deleteProduct() {
      this.$emit("delete-product", this.product);
    },
    closePopup() {
      this.$emit("close-popup");
    },
    
  },
});
</script>
<style scoped>
.popup__close{
   position: absolute;
  cursor: pointer;
  max-width: 30px;
  height: 30px;
  width: 100%;
  right: -15px;
  top: -15px;
  background: #FFFFFF;
  box-shadow: 0px 4px 10px rgba(196, 196, 196, 0.25);
  border-radius: 50%;
}
.popup__close > img{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.popup_delete {
  position: fixed;
  right: 100%;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0%;
  background-color: rgba(32, 33, 38, 0.9);
  z-index: 5;
  transition: all 0.5s;
}
.popup_container {
  position: relative;
  top: 50%;
  max-width: 644px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  background: #ffffff;
  box-shadow: -11.1789px 0px 35.7725px rgba(153, 153, 153, 0.05),
    0px 16.7683px 35.7725px rgba(153, 153, 153, 0.05);
  border-radius: 10px;
}
.popup_content {
  padding: 20px 20px 0;
}
.popup_product {
  display: flex;
  align-items: center;
  gap: 30px;
  cursor: pointer;
  transition: all 0.2s;
  padding: 15px 0;
}
hr{
  background: #ced4da;
  margin: 15px -20px 0 -20px;
}
.popup_product::before {
  content: "";
  width: 10px;
  height: 10px;
  display: block;
  background: yellowgreen;
  border-radius: 50%;
  border: 1px solid yellowgreen;
}
.product_img {
  max-width: 40px;
  width: 100%;
  height: auto;
}
.product_info {
  padding-left: 20px;
}
.product_info__title{
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  border-bottom: 1px solid #ced4da;
  color: #000;
  margin-bottom: 5px;
}
.product_info__sn{
  font-size: 14px;
    line-height: 14px;
    color: #ccc;
    font-weight: 400;
}
.popup_btn {
  background: #329b07;
  display: flex;
  padding: 20px;
  justify-content: flex-end;
  gap: 20px;
  border-radius: 0 0 10px 10px;
}
.btn-cancel {
  border: none;
  background: transparent;
  color: #fff;
}
.btn-delete {
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  border-radius: 20px;
  padding: 9px 30px;
  font-weight: 600;
  color: red;
  background: #fff;
}
.btn-delete > svg{
  width: 15px;
  height: 15px;
}
</style>
