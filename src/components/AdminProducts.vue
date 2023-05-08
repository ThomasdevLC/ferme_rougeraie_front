<template>
  <!-- form -->
  <div class="product__form">
    <ProductForm />
  </div>

  <div class="loading" v-if="productStore.loading">Chargement...</div>

  <div v-else class="product__container">
    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'" :class="{ selected: filter === 'all' }">
        Tous les produits
      </button>
      <button
        @click="filter = 'displayed'"
        :class="{ selected: filter === 'displayed' }"
      >
        Produits affichés
      </button>
    </nav>

    <!-- LIST -->
    <div class="product-list" v-if="filter === 'all'">
      <p>{{ productStore.totalCount }} produits enregistrés</p>
      <div v-for="product in productStore.products" :key="product">
        <ProductDetails :product="product" />
      </div>
    </div>
    <div class="product-list" v-if="filter === 'displayed'">
      <p>{{ productStore.displayedCount }} produits affichés</p>
      <div v-for="product in productStore.displayed" :key="product">
        <ProductDetails :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useProductStore } from "../stores/ProductStore";
import ProductDetails from "../components/ProductDetails.vue";
import ProductForm from "../components/ProductForm.vue";
import NavBar from "../components/NavBar.vue";

export default {
  components: {
    ProductDetails,
    ProductForm,
    NavBar,
  },

  setup() {
    const productStore = useProductStore();
    const filter = ref("all");
    return { productStore, filter };
  },
};
</script>

<style scoped>
.product__form {
  background: var(--gray-2);
  padding: 40px 0;
}

.product__container {
  max-width: 640px;
  margin: 20px auto;
  padding: 25px;
}
</style>
