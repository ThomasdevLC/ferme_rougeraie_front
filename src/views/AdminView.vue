<template>
  <!-- form -->
  <div class="new-product-form">
    <ProductForm />
  </div>

  <div class="loading" v-if="productStore.loading">Chargement...</div>

  <div v-else class="container">
    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">Tous les produits</button>
      <button @click="filter = 'displayed'">Produits affichés</button>
    </nav>
    <pre>

  {{ productStore.orders }}
</pre
    >
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
  components: { ProductDetails, ProductForm, NavBar },

  setup() {
    const productStore = useProductStore();
    const filter = ref("all");

    return { productStore, filter };
  },
};
</script>

<style scoped>
.new-product-form {
  background: #e7e7e7;
  padding: 60px 0;
}

.container {
  max-width: 640px;
  margin: 20px auto;
}

/* filter nav */
.filter {
  margin: 10px auto;
  text-align: right;
}
.filter button {
  font-size: 15px;
  background: #fff;
  border: 2px solid #555;
  border-radius: 4px;
  margin-left: 10px;
  padding: 4px 8px;
  cursor: pointer;
}

/* product list */
.product-list {
  max-width: 640px;
  margin: 20px auto;
}
</style>
