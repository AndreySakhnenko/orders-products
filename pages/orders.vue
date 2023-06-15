<template>
  <div id="orders">
    <div class="order_top">
      <h4 class="order_top__title">
        {{ $t("order.title") }} / {{ orders.length }}
      </h4>
    </div>
    <div class="orders_content">
      <div class="order_blocks">
        <div
          class="order_block"
          v-for="order in orders"
          :key="order.id"
          @click="openProduct(order.id)"
        >
          <div class="order_block_img-list">
            <svg>
              <use
                xlink:href="../assets/images/sprite/list-sprite.svg#list"
              ></use>
            </svg>
          </div>
          <div class="order_block__quantity">
            <span class="order_block__quantity-number">{{
              order.products.length
            }}</span>
            <span class="order_block__quantity-product">{{
              $t("product.quantity")
            }}</span>
          </div>
          <p>{{ formatDate(order.date) }}</p>
          <div
            class="order_block__arrow"
            :class="{ active: isExpanded(order.id) }"
          >
            <img src="../assets/images/right.svg" />
          </div>
        </div>
      </div>

      <OrderProduct
        :selectedOrder="selectedOrder"
        :class="{ active: isActive }"
        @close-product="closeProduct"
        @update:selectedProduct="selectedProduct = $event"
        @update:showDeletePopup="showDeletePopup = $event"
      />
    </div>
    <transition name="popup">
      <DeletePopup
        ref="deletePopup"
        v-if="showDeletePopup"
        :product="selectedProduct"
        :selectedOrder="selectedOrder"
        @delete-product="deleteProduct"
        @close-popup="closePopup"
      />
    </transition>
  </div>
</template>
<script>
import { fetchOrders } from "../plugins/data.js";
import OrderProduct from "@/components/app-OrderProducts.vue";
import DeletePopup from "@/components/app-DeletePopup";
import Vue from "vue";
export default Vue.extend({
  components: {
    OrderProduct,
    DeletePopup,
  },
  data() {
    return {
      isActive: false,
      orders: [],
      expandedOrder: null,
      selectedOrder: null,
      showDeletePopup: false,
      selectedProduct: null,
    };
  },
  async mounted() {
    const oldUserData = localStorage.getItem("oldUser")
      ? JSON.parse(localStorage.getItem("oldUser"))
      : null;
    if (!oldUserData) {
      await this.$router.push({ name: "index" });
    }
    this.orders = await fetchOrders();
  },
  computed: {
    getExpandedOrderProducts() {
      const expandedOrder = this.orders.find(
        (order) => order.id === this.expandedOrder
      );
      return expandedOrder ? expandedOrder.products : [];
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: "numeric", month: "long", year: "numeric" };
      const formattedDate = date.toLocaleDateString(undefined, options);
      const parts = formattedDate.split(" ");
      return `${parts[0]} / ${parts[1]} / ${parts[2]}`;
    },
    updateShowDeletePopup(value) {
      this.showDeletePopup = value;
    },
    openProduct(orderId) {
      this.expandedOrder = orderId;
      this.selectedOrder = this.orders.find((order) => order.id === orderId);
      this.isActive = true;
    },
    isExpanded(orderId) {
      return this.expandedOrder === orderId;
    },
    closeProduct() {
      this.isActive = false;
      this.expandedOrder = false;
      this.selectedOrder = null;
    },
    showPopup(product) {
      this.selectedProduct = product;
      this.showDeletePopup = true;
    },
    closePopup() {
      this.showDeletePopup = false;
      this.selectedProduct = null;
    },
    deleteProduct() {
      const productId = this.selectedProduct.id;
      const updatedProducts = this.selectedOrder.products.filter(
        (product) => product.id !== productId
      );
      this.selectedOrder = {
        ...this.selectedOrder,
        products: updatedProducts,
      };
      console.log(this.selectedOrder.products);
      console.log(updatedProducts);
      this.closePopup();
    },
  },
});
</script>

<style scoped>
#orders {
  display: flex;
  gap: 50px;
  padding: 60px;
  flex-direction: column;
}
.order_top__title {
  font-weight: 600;
}
.orders_content {
  display: flex;
  gap: 20px;
}
.order_blocks {
  display: flex;
  gap: 20px;
  flex-direction: column;
  width: 100%;
}
.order_block {
  display: flex;
  gap: 10px;
  align-items: center;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
  position: relative;
  padding: 5px 38px;
}
.order_block_img-list {
  max-width: 40px;
  width: 100%;
  border: 1px solid #ced4da;
  height: 40px;
  border-radius: 50%;
  padding: 5px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(196, 196, 196, 0.25);
}
.order_block_img-list > svg {
  width: 100%;
  height: 100%;
  fill: black;
  stroke: black;
  stroke-width: 20px;
}
.order_block__quantity {
  display: flex;
  flex-direction: column;
}
.order_block__quantity-number {
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  color: #000;
}
.order_block__quantity-product {
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: #333;
}
.order_block__arrow {
  background: #e3e3e3;
  padding: 15px 16px;
  height: 100%;
  position: absolute;
  right: 0;
  display: none;
}
.order_block__arrow.active {
  display: block;
}
.order_block__arrow > img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
