<template>
  <div id="products">
    <div class="products_top">
      <h4 class="products_top__title">
        {{ $t("order.title") }} / {{ sortedProducts.length }}
      </h4>
      <div class="product_select">
        <span>{{ $t("product.specification") }}</span>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="sortOption"
          @change="sortProducts"
        >
          <option value="All">All</option>
          <option value="specification">
            {{ $t("product.specification") }}
          </option>
        </select>
      </div>
    </div>
    <div class="products_content">
      <div class="products_blocks">
        <div
          class="product_block"
          v-for="product in sortedProducts"
          :key="product.id"
        >
          <div class="product_img">
            <img
              :src="product.photo"
              :alt="product.type"
              v-if="imageExists(product.photo)"
            />
            <img v-else src="../assets/images/no-image.svg" />
          </div>
          <p>{{ product.title }}</p>
          <p>{{ product.type }}</p>
          <div class="product_data">
            <p>
              <span class="product_data__span">{{ $t("product.from") }}</span>
              {{ formatDate(product.guarantee.start) }}
            </p>
            <p>
              <span class="product_data__span">{{ $t("product.to") }}</span>
              {{ formatDate(product.guarantee.end) }}
            </p>
          </div>
          <div class="product_price">
            <div
              class="product_price__number"
              v-for="(price, index) in product.price"
              :key="index"
            >
              <span class="">{{ price.value }}</span>
              <span class="">{{ price.symbol }}</span>
            </div>
          </div>
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
    <transition name="popup">
      <DeletePopup
        v-if="showDeletePopup"
        :product="selectedProduct"
        @delete-product="deleteProduct"
        @close-popup="closePopup"
      />
    </transition>
  </div>
</template>
<script lang="ts">
import { fetchProducts } from "../plugins/data";
import { Product, DataProducts } from "../types/orders-products";
import DeletePopup from "@/components/app-DeletePopup.vue";
import Vue from "vue";

export default Vue.extend({
  components: {
    DeletePopup,
  },
  data(): DataProducts {
    return {
      products: [],
      showDeletePopup: false,
      selectedProduct: null,
      sortOption: "All",
    };
  },
  async mounted() {
    const oldUserData = localStorage.getItem("oldUser")
      ? JSON.parse(localStorage.getItem("oldUser") as string)
      : null;
    if (!oldUserData) {
      await this.$router.push({ name: "index" });
    }
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    } else {
      this.products = await fetchProducts();
    }
    // this.products = await fetchProducts();
  },
  computed: {
    sortedProducts(): Product[] {
      if (this.sortOption === "specification") {
        return this.products.sort((a: Product, b: Product) =>
          a.specification.localeCompare(b.specification)
        );
      } else if (this.sortOption === "All") {
        return this.products.sort((a: Product, b: Product) => a.id - b.id);
      }
      return this.products;
    },
  },
  methods: {
    formatDate(dateString: string): string {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const formattedDate = date.toLocaleDateString(undefined, options);
      const parts = formattedDate.split(" ");
      return `${parts[0]} / ${parts[1]} / ${parts[2]}`;
    },
    imageExists(url: string): boolean {
      var img = new Image();
      img.src = url;
      return img.complete || img.width > 0 || img.height > 0;
    },
    showPopup(product: Product) {
      this.selectedProduct = product;
      this.showDeletePopup = true;
    },
    closePopup() {
      this.showDeletePopup = false;
      this.selectedProduct = null;
    },
    deleteProduct() {
      const productId = this.selectedProduct?.id;
      if (productId) {
        const updatedProducts = this.products.filter(
          (product) => product.id !== productId
        );
        this.products = updatedProducts;
        localStorage.setItem("products", JSON.stringify(updatedProducts));

        if (updatedProducts.length < 1) {
          localStorage.removeItem("products");
        }
      }
      this.closePopup();
    },
    sortProducts() {
      this.products = this.sortedProducts;
    },
  },
});
</script>


<style scoped>
.form-select {
  cursor: pointer;
}
#products {
  display: flex;
  gap: 50px;
  padding: 60px;
  flex-direction: column;
}
.products_top {
  display: flex;
  align-items: center;
  gap: 20px;
}
.products_top__title {
  font-weight: 600;
}
.product_select > span {
  color: #a9a9a9;
  font-size: 14px;
}
.product_select > select {
  width: 200px;
  margin-left: 10px;
}
.products_content {
  display: flex;
  gap: 20px;
}
.products_blocks {
  display: flex;
  gap: 20px;
  flex-direction: column;
  width: 100%;
}
.product_block {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  border: 1px solid #ced4da;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
  position: relative;
  padding: 5px 38px;
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
.product_block:nth-child(even)::before {
  background: darkblue;
}

.product_block:nth-child(odd)::before {
  background: yellowgreen;
}
.delete_product {
  width: 15px;
  height: 15px;
  display: inherit;
}
.delete_product > svg {
  width: 100%;
  height: 100%;
}
.product_img {
  max-width: 40px;
  width: 100%;
  height: auto;
}
.product_data__span,
.product_price__number:first-child {
  color: #ccc;
  font-size: 14px;
}
</style>
