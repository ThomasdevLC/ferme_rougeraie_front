<template>
  <h3 v-if="thanksModal">Merci pour votre commande</h3>
  <p v-else>
    Votre panier <span v-if="!productStore.cartCount">est vide</span>
  </p>
  <div class="product-list">
    <div v-for="product in productStore.cart" :key="product">
      <ShopCartDetails :product="product" />
    </div>
  </div>
  <p v-if="productStore.cartCount" class="cart-total">
    Total : {{ productStore.totalCart }} €
  </p>

  <div v-if="productStore.cartCount" class="form">
    <ShopCartForm @submit-form="thanksModal = true" />
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
  data() {
    return {
      thanksModal: false,
    };
  },
};
</script>
<style scoped>
.cart-total {
  text-align: right;
}
</style>
