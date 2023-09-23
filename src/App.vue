<template>
  <div><NavBar /></div>
  <router-view />
</template>

<script>
import { useProductStore } from "./stores/ProductStore";
import NavBar from "./components/nav/NavBar.vue";

export default {
  components: { NavBar },

  setup() {
    const productStore = useProductStore();

    productStore.getProducts();
    productStore.getClosedShop();
    productStore.checkCart();
    productStore.getShopMessage();
    return { productStore };
  },
};
</script>
