<template>
  <h3>Votre panier</h3>
  <div class="product-list">
    <div v-for="product in productStore.cart" :key="product">
      <ShopCartDetails :product="product" />
    </div>
  </div>
</template>

<script>
import { useProductStore } from "../stores/ProductStore";
import ShopCartDetails from "../components/ShopCartDetails.vue";

export default {
  components: { ShopCartDetails },

  setup() {
    const productStore = useProductStore();

    return { productStore };
  },
};
</script>

<style></style>
