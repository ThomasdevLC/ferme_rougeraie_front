<template>
  <h3 v-if="thanksModal">Merci pour votre commande</h3>
  <h3 v-else>
    Votre panier <span v-if="!productStore.cartCount">est vide</span>
  </h3>
  <div class="product-list">
    <div v-for="product in productStore.cart" :key="product">
      <ShopCartDetails :product="product" />
    </div>
  </div>
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
