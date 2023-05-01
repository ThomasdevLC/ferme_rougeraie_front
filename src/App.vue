<template>
  <NavBar />
  <router-view />
</template>

<script>
import { useProductStore } from "./stores/ProductStore";
import NavBar from "./components/NavBar.vue";

export default {
  components: { NavBar },

  setup() {
    const productStore = useProductStore();

    productStore.getProducts();
    productStore.getOrders();

    return { productStore };
  },
};
</script>
