<template>
  <!-- heading -->
  <header>
    <img :src="image" alt=" logo" />
  </header>

  <!-- form -->
  <div class="new-task-form">
    <ProductForm />
  </div>

  <!-- filter -->
  <nav class="filter">
    <button @click="filter = 'all'">Tous les produits</button>
    <button @click="filter = 'displayed'">Produits affichés</button>
  </nav>
  <div class="loading" v-if="productStore.loading">Chargement...</div>

  <!-- LIST -->
  <div class="task-list" v-if="filter === 'all'">
    <p>{{ productStore.totalCount }} produits</p>
    <div v-for="product in productStore.products" :key="product">
      <ProductDetails :product="product" />
    </div>
  </div>
  <div class="task-list" v-if="filter === 'displayed'">
    <p>{{ productStore.displayedCount }} Produits affichés</p>
    <div v-for="product in productStore.displayed" :key="product">
      <ProductDetails :product="product" />
    </div>
  </div>
</template>

<script>
import logo from "./assets/logo.png";
import { ref } from "vue";
import { useProductStore } from "./stores/ProductStore";
import ProductDetails from "./components/ProductDetails.vue";
import ProductForm from "./components/ProductForm.vue";
export default {
  components: { ProductDetails, ProductForm },
  data() {
    return { image: logo };
  },

  setup() {
    const productStore = useProductStore();

    // fetch  products
    productStore.getProducts();
    const filter = ref("all");

    return { productStore, filter };
  },
};
</script>
