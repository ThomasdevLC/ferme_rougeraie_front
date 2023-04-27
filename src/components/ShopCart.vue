<template>
  <h3>Votre panier</h3>
  <div class="product-list">
    <div v-for="product in productStore.cart" :key="product">
      <ShopCartDetails :product="product" />
    </div>
  </div>
  <div class="form">
    <ShopCartForm />
  </div>
</template>

<script>
import { useProductStore } from "../stores/ProductStore";
import ShopCartDetails from "../components/ShopCartDetails.vue";
import ShopCartForm from "../components/ShopCartForm.vue";

export default {
  components: { ShopCartDetails, ShopCartForm },

  setup() {
    const productStore = useProductStore();

    return { productStore };
  },
};
</script>

<style></style>
