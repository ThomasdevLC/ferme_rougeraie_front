<template>
  <div v-if="$route.path !== '/'"><NavBar /></div>
  <router-view />
</template>

<script>
import { useProductStore } from "./stores/ProductStore";
import NavBar from "./components/NavBar.vue";

export default {
  components: { NavBar },

  // created  boolean  closed shop  alors redirection vers page "déso"

  setup() {
    const productStore = useProductStore();

    productStore.getProducts();

    return { productStore };
  },
};
</script>
